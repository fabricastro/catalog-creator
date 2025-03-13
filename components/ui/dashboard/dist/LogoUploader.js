"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var avatar_1 = require("@/components/ui/avatar");
function LogoUploader(_a) {
    var _this = this;
    var businessId = _a.businessId, businessName = _a.businessName, currentLogoUrl = _a.currentLogoUrl, onLogoUploaded = _a.onLogoUploaded;
    var _b = react_1.useState(false), isUploading = _b[0], setIsUploading = _b[1];
    var _c = react_1.useState(currentLogoUrl || null), previewUrl = _c[0], setPreviewUrl = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var fileInputRef = react_1.useRef(null);
    var handleFileChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, validTypes, maxSize, objectUrl;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
                    if (!validTypes.includes(file.type)) {
                        setError("Por favor selecciona una imagen (JPEG, PNG, WEBP o GIF).");
                        return [2 /*return*/];
                    }
                    maxSize = 2 * 1024 * 1024;
                    if (file.size > maxSize) {
                        setError("El logo no debe superar los 2MB.");
                        return [2 /*return*/];
                    }
                    objectUrl = URL.createObjectURL(file);
                    setPreviewUrl(objectUrl);
                    setError(null);
                    // Subir el logo al servidor
                    return [4 /*yield*/, uploadLogo(file)];
                case 1:
                    // Subir el logo al servidor
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var uploadLogo = function (file) { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUploading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    formData = new FormData();
                    formData.append("file", file);
                    formData.append("businessId", businessId);
                    return [4 /*yield*/, fetch("/api/upload-logo", {
                            method: "POST",
                            body: formData
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || "Error al subir el logo");
                    }
                    // Llamar al callback con la URL del logo
                    onLogoUploaded(data.logoUrl);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error al subir logo:", error_1);
                    setError(error_1 instanceof Error ? error_1.message : "Error al subir el logo");
                    // Si hay error, mantenemos el logo anterior si existe
                    setPreviewUrl(currentLogoUrl || null);
                    return [3 /*break*/, 6];
                case 5:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleRemoveLogo = function () {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        onLogoUploaded("");
    };
    var triggerFileInput = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/jpeg,image/png,image/webp,image/gif", className: "hidden" }),
        React.createElement("div", { className: "flex items-center gap-4" },
            previewUrl ? (React.createElement("div", { className: "relative" },
                React.createElement(avatar_1.Avatar, { className: "h-24 w-24 border" },
                    React.createElement(avatar_1.AvatarImage, { src: previewUrl, alt: businessName }),
                    React.createElement(avatar_1.AvatarFallback, { className: "text-2xl" }, businessName.charAt(0))),
                React.createElement(button_1.Button, { variant: "destructive", size: "icon", className: "absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-90", onClick: handleRemoveLogo },
                    React.createElement(lucide_react_1.X, { className: "h-3 w-3" })))) : (React.createElement("div", { onClick: triggerFileInput, className: "flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border border-dashed border-border bg-muted/50 hover:bg-muted" },
                React.createElement(lucide_react_1.ImageIcon, { className: "h-8 w-8 text-muted-foreground" }))),
            React.createElement("div", { className: "flex-1" },
                React.createElement("h3", { className: "text-sm font-medium" }, "Logo del negocio"),
                React.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Sube una imagen para tu negocio. Se recomienda una imagen cuadrada de al menos 200x200 p\u00EDxeles."),
                error && React.createElement("p", { className: "text-xs text-destructive mt-1" }, error))),
        React.createElement(button_1.Button, { type: "button", variant: "outline", size: "sm", className: "w-full", onClick: triggerFileInput, disabled: isUploading }, isUploading ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
            "Subiendo...")) : (React.createElement(React.Fragment, null,
            React.createElement(lucide_react_1.Upload, { className: "mr-2 h-4 w-4" }),
            previewUrl ? "Cambiar logo" : "Subir logo")))));
}
exports["default"] = LogoUploader;
