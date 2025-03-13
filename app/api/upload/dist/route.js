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
exports.POST = void 0;
var server_1 = require("next/server");
var fileUtils_1 = require("@/app/lib/server/fileUtils");
var fs_1 = require("fs");
var path_1 = require("path");
var jsonwebtoken_1 = require("jsonwebtoken");
var headers_1 = require("next/headers");
var SECRET_KEY = process.env.JWT_SECRET || "supersecreto";
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var cookieStore, tokenCookie, formData, file, productId, validTypes, maxSize, uploadDir, filename, filePath, arrayBuffer, buffer, imageUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, headers_1.cookies()];
                case 1:
                    cookieStore = _a.sent();
                    tokenCookie = cookieStore.get("token");
                    if (!tokenCookie) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "No autorizado." }, { status: 401 })];
                    }
                    // Verificar que el token sea válido
                    try {
                        jsonwebtoken_1.verify(tokenCookie.value, SECRET_KEY);
                    }
                    catch (error) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Token inválido o expirado." }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _a.sent();
                    file = formData.get("file");
                    productId = formData.get("productId");
                    if (!file) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "No se ha proporcionado ningún archivo." }, { status: 400 })];
                    }
                    if (!productId) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "No se ha proporcionado el ID del producto." }, { status: 400 })];
                    }
                    validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
                    if (!validTypes.includes(file.type)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "El archivo debe ser una imagen (JPEG, PNG, WEBP o GIF)." }, { status: 400 })];
                    }
                    maxSize = 5 * 1024 * 1024 // 5MB
                    ;
                    if (file.size > maxSize) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "La imagen no debe superar los 5MB." }, { status: 400 })];
                    }
                    uploadDir = fileUtils_1.ensureImageDirectory();
                    filename = fileUtils_1.generateImageFilename(productId, file.name);
                    filePath = path_1["default"].join(uploadDir, filename);
                    return [4 /*yield*/, file.arrayBuffer()];
                case 3:
                    arrayBuffer = _a.sent();
                    buffer = Buffer.from(arrayBuffer);
                    // Guardar el archivo
                    fs_1["default"].writeFileSync(filePath, buffer);
                    imageUrl = "/uploads/" + filename;
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: true,
                            imageUrl: imageUrl,
                            message: "Imagen subida correctamente."
                        }, { status: 200 })];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error al subir imagen:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Error en el servidor." }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
