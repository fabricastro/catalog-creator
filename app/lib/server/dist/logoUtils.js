"use strict";
exports.__esModule = true;
exports.generateLogoFilename = exports.ensureLogoDirectory = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
// Función para asegurar que exista el directorio de logos
function ensureLogoDirectory() {
    var uploadDir = path_1["default"].join(process.cwd(), "public", "uploads", "logos");
    if (!fs_1["default"].existsSync(uploadDir)) {
        fs_1["default"].mkdirSync(uploadDir, { recursive: true });
    }
    return uploadDir;
}
exports.ensureLogoDirectory = ensureLogoDirectory;
// Función para generar un nombre de archivo único para logos
function generateLogoFilename(businessId, originalFilename) {
    var extension = path_1["default"].extname(originalFilename);
    var timestamp = Date.now();
    return "logo_" + businessId + "_" + timestamp + extension;
}
exports.generateLogoFilename = generateLogoFilename;
