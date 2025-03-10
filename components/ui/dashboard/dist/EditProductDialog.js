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
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
function EditProductDialog(_a) {
    var _this = this;
    var product = _a.product, businessName = _a.businessName, setBusiness = _a.setBusiness;
    var _b = react_1.useState(__assign(__assign({}, product), { categoryId: product.categoryId || "" })), editingProduct = _b[0], setEditingProduct = _b[1];
    var _c = react_1.useState([]), categories = _c[0], setCategories = _c[1];
    var _d = react_1.useState(false), isOpen = _d[0], setIsOpen = _d[1];
    // Cargar categorías cuando se abre el modal
    react_1.useEffect(function () {
        var fetchCategories = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/business/" + businessName + "/categories")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error("Error al obtener categorías");
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setCategories(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("❌ Error al obtener categorías:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);
    var handleEditProduct = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var updatedProduct, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    updatedProduct = __assign(__assign({}, editingProduct), { price: parseFloat(editingProduct.price) });
                    return [4 /*yield*/, fetch("/api/business/" + businessName + "/update-product/" + editingProduct.id, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedProduct)
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (res.ok) {
                        setBusiness(function (prev) {
                            return prev ? __assign(__assign({}, prev), { products: prev.products.map(function (prod) { return (prod.id === data.id ? data : prod); }) }) : prev;
                        });
                        setIsOpen(false);
                    }
                    else {
                        alert("Error al actualizar el producto: " + data.error);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: isOpen, onOpenChange: setIsOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setIsOpen(true); } },
                React.createElement(lucide_react_1.Edit, { className: "h-4 w-4 mr-1" }),
                " Editar")),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[500px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Editar producto"),
                React.createElement(dialog_1.DialogDescription, null, "Actualiza los detalles del producto.")),
            React.createElement("form", { onSubmit: handleEditProduct },
                React.createElement("div", { className: "grid gap-4 py-4" },
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "edit-name" }, "Nombre"),
                        React.createElement(input_1.Input, { id: "edit-name", value: editingProduct.name, onChange: function (e) { return setEditingProduct(__assign(__assign({}, editingProduct), { name: e.target.value })); }, required: true })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "edit-description" }, "Descripci\u00F3n"),
                        React.createElement(textarea_1.Textarea, { id: "edit-description", value: editingProduct.description, onChange: function (e) { return setEditingProduct(__assign(__assign({}, editingProduct), { description: e.target.value })); }, rows: 3 })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "edit-category" }, "Categor\u00EDa"),
                        React.createElement("select", { id: "edit-category", value: editingProduct.categoryId, onChange: function (e) { return setEditingProduct(__assign(__assign({}, editingProduct), { categoryId: e.target.value })); }, className: "border rounded p-2", required: true },
                            React.createElement("option", { value: "", disabled: true }, "Selecciona una categor\u00EDa"),
                            categories.map(function (category) { return (React.createElement("option", { key: category.id, value: category.id }, category.name)); }))),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "edit-price" }, "Precio"),
                        React.createElement(input_1.Input, { id: "edit-price", type: "number", value: editingProduct.price, onChange: function (e) { return setEditingProduct(__assign(__assign({}, editingProduct), { price: e.target.value })); }, required: true })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "edit-imageUrl" }, "URL de la imagen"),
                        React.createElement(input_1.Input, { id: "edit-imageUrl", value: editingProduct.imageUrl, onChange: function (e) { return setEditingProduct(__assign(__assign({}, editingProduct), { imageUrl: e.target.value })); }, placeholder: "https://ejemplo.com/imagen.jpg" }))),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setIsOpen(false); } }, "Cancelar"),
                    React.createElement(button_1.Button, { type: "submit" }, "Actualizar producto"))))));
}
exports["default"] = EditProductDialog;
