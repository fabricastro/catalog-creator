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
var CloudinaryImage_1 = require("@/components/ui/CloudinaryImage");
function ImageUploader(_a) {
    var _this = this;
    var productId = _a.productId, currentImageUrl = _a.currentImageUrl, onImageUploaded = _a.onImageUploaded;
    var _b = react_1.useState(false), isUploading = _b[0], setIsUploading = _b[1];
    var _c = react_1.useState(currentImageUrl || null), previewUrl = _c[0], setPreviewUrl = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var fileInputRef = react_1.useRef(null);
    var handleFileChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, validTypes, objectUrl;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
                    if (!validTypes.includes(file.type)) {
                        setError("Formato no válido (JPEG, PNG, WEBP o GIF).");
                        return [2 /*return*/];
                    }
                    if (file.size > 5 * 1024 * 1024) {
                        setError("La imagen no debe superar los 5MB.");
                        return [2 /*return*/];
                    }
                    objectUrl = URL.createObjectURL(file);
                    setPreviewUrl(objectUrl);
                    setError(null);
                    // Subir imagen
                    return [4 /*yield*/, uploadImage(file)];
                case 1:
                    // Subir imagen
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var uploadImage = function (file) { return __awaiter(_this, void 0, void 0, function () {
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
                    formData.append("id", productId);
                    formData.append("type", "product"); // ✅ Especificar que es un producto
                    return [4 /*yield*/, fetch("/api/upload", { method: "POST", body: formData })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok)
                        throw new Error(data.error || "Error al subir la imagen");
                    onImageUploaded(data.imageUrl);
                    setPreviewUrl(data.imageUrl); // ✅ Guardamos la URL de Cloudinary
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error al subir imagen:", error_1);
                    setError("Error al subir la imagen");
                    setPreviewUrl(currentImageUrl || null);
                    return [3 /*break*/, 6];
                case 5:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleRemoveImage = function () {
        setPreviewUrl(null);
        fileInputRef.current && (fileInputRef.current.value = "");
        onImageUploaded("");
    };
    return (React.createElement("div", { className: "w-full space-y-2" },
        React.createElement("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/*", className: "hidden" }),
        React.createElement("div", { className: "relative w-full h-48 border rounded-md overflow-hidden flex items-center justify-center" }, isUploading ? (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-200" },
            React.createElement("div", { className: "h-10 w-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" }))) : previewUrl ? (React.createElement(CloudinaryImage_1["default"], { src: previewUrl, alt: "Vista previa", width: 800, height: 600, className: "h-full w-full object-cover" })) : (React.createElement("div", { className: "flex h-full w-full items-center justify-center bg-gray-100" },
            React.createElement(lucide_react_1.ImageIcon, { className: "h-10 w-10 text-gray-400" })))),
        React.createElement(button_1.Button, { type: "button", variant: "outline", size: "sm", className: "w-full", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isUploading }, isUploading ? "Subiendo..." : "Subir imagen"),
        error && React.createElement("p", { className: "text-sm text-destructive" }, error)));
}
exports["default"] = ImageUploader;
