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
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, file, id_1, type_1, arrayBuffer, buffer_1, folder_1, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _a.sent();
                    file = formData.get("file");
                    id_1 = formData.get("id");
                    type_1 = formData.get("type");
                    if (!file) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "No se ha proporcionado ningún archivo." }, { status: 400 })];
                    }
                    if (!id_1) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "No se ha proporcionado el ID del producto o negocio." }, { status: 400 })];
                    }
                    if (!type_1 || (type_1 !== "product" && type_1 !== "business")) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Tipo de imagen no válido." }, { status: 400 })];
                    }
                    return [4 /*yield*/, file.arrayBuffer()];
                case 2:
                    arrayBuffer = _a.sent();
                    buffer_1 = Buffer.from(arrayBuffer);
                    folder_1 = type_1 === "product" ? "products" : "businesses";
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            cloudinary_1.v2.uploader.upload_stream({
                                folder: folder_1,
                                public_id: type_1 + "_" + id_1 + "_" + Date.now(),
                                resource_type: "image",
                                transformation: [{ width: 800, height: 600, crop: "fit" }]
                            }, function (error, result) {
                                if (error)
                                    reject(error);
                                else
                                    resolve(result);
                            }).end(buffer_1);
                        })];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, imageUrl: result.secure_url }, { status: 200 })];
                case 4:
                    error_1 = _a.sent();
                    console.error("❌ Error al subir imagen:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Error en el servidor." }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
