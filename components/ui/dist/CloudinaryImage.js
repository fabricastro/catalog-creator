"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var next_cloudinary_1 = require("next-cloudinary");
function CloudinaryImage(_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, sizes = _a.sizes, className = _a.className, _b = _a.crop, crop = _b === void 0 ? "fill" : _b, aspectRatio = _a.aspectRatio, _c = _a.gravity, gravity = _c === void 0 ? "auto" : _c, placeholder = _a.placeholder, _d = _a.priority, priority = _d === void 0 ? false : _d;
    // Si la imagen no es de Cloudinary, usamos una imagen de respaldo
    if (!src || !src.includes("cloudinary.com")) {
        return (React.createElement("div", { className: "bg-muted flex items-center justify-center " + className, style: { width: width, height: height } },
            React.createElement("span", { className: "text-muted-foreground text-sm" }, alt || "Imagen no disponible")));
    }
    // Extraer el public_id de la URL de Cloudinary
    var getPublicIdFromUrl = function (url) {
        try {
            // Ejemplo de URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
            var regex = /\/v\d+\/(.+?)(?:\.[^.]+)?$/;
            var match = url.match(regex);
            return match ? match[1] : url;
        }
        catch (error) {
            console.error("Error al extraer public_id de URL:", error);
            return url;
        }
    };
    var publicId = getPublicIdFromUrl(src);
    return (React.createElement(next_cloudinary_1.CldImage, __assign({ src: publicId, alt: alt, width: width, height: height, sizes: sizes, className: "h-full w-full object-contain", crop: crop, gravity: gravity, placeholder: placeholder, priority: priority }, (aspectRatio ? { aspectRatio: aspectRatio } : {}))));
}
exports["default"] = CloudinaryImage;
