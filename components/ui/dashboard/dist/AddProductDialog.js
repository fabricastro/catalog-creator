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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var ImageUploader_1 = require("./ImageUploader");
var sonner_1 = require("sonner");
function AddProductDialog(_a) {
    var _this = this;
    var businessName = _a.businessName, setBusiness = _a.setBusiness;
    var _b = react_1.useState({ name: "", description: "", price: "", imageUrl: "" }), newProduct = _b[0], setNewProduct = _b[1];
    var _c = react_1.useState([]), categories = _c[0], setCategories = _c[1];
    var _d = react_1.useState(""), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = react_1.useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = react_1.useState(false), isSubmitting = _f[0], setIsSubmitting = _f[1];
    var params = navigation_1.useParams();
    var businessSlug = params.businessSlug;
    react_1.useEffect(function () {
        var fetchCategories = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/business/" + encodeURIComponent(businessSlug) + "/categories")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error("Error al obtener categorías");
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setCategories(data); // Guardar las categorías como { id, name }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("❌ Error al obtener categorías:", error_1);
                        sonner_1.toast.error("Error al cargar categorías", {
                            description: "No se pudieron cargar las categorías. Intenta nuevamente.",
                            position: "top-center",
                            duration: 3000
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (isOpen) {
            fetchCategories();
        }
    }, [businessSlug, isOpen]);
    var handleImageUploaded = function (imageUrl) {
        setNewProduct(function (prev) { return (__assign(__assign({}, prev), { imageUrl: imageUrl })); });
    };
    var handleAddProduct = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newProductData, res, data_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    newProductData = __assign(__assign({}, newProduct), { price: Number.parseFloat(newProduct.price), categoryId: selectedCategory || undefined });
                    return [4 /*yield*/, fetch("/api/business/" + businessName + "/add-product", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newProductData)
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _a.sent();
                    if (res.ok) {
                        setBusiness(function (prev) { return (prev ? __assign(__assign({}, prev), { products: __spreadArrays(prev.products, [data_1]) }) : prev); });
                        setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
                        setSelectedCategory("");
                        setIsOpen(false);
                        // Mostrar toast de éxito
                        sonner_1.toast.success("Producto agregado", {
                            description: newProduct.name + " ha sido agregado al cat\u00E1logo.",
                            position: "top-center",
                            duration: 3000
                        });
                    }
                    else {
                        sonner_1.toast.error("Error al agregar producto", {
                            description: data_1.error || "Ocurrió un error al agregar el producto.",
                            position: "top-center",
                            duration: 4000
                        });
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error al agregar producto:", error_2);
                    sonner_1.toast.error("Error al agregar producto", {
                        description: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
                        position: "top-center",
                        duration: 4000
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (react_2["default"].createElement(dialog_1.Dialog, { open: isOpen, onOpenChange: setIsOpen },
        react_2["default"].createElement(dialog_1.DialogTrigger, { asChild: true },
            react_2["default"].createElement(button_1.Button, null,
                react_2["default"].createElement(lucide_react_1.Plus, { className: "mr-2 h-4 w-4" }),
                " Agregar producto")),
        react_2["default"].createElement(dialog_1.DialogContent, { className: "sm:max-w-[500px]" },
            react_2["default"].createElement(dialog_1.DialogHeader, null,
                react_2["default"].createElement(dialog_1.DialogTitle, null, "Agregar nuevo producto"),
                react_2["default"].createElement(dialog_1.DialogDescription, null, "Completa los detalles del producto para agregarlo a tu cat\u00E1logo.")),
            react_2["default"].createElement("form", { onSubmit: handleAddProduct },
                react_2["default"].createElement("div", { className: "grid gap-4 py-4" },
                    react_2["default"].createElement("div", { className: "grid gap-2" },
                        react_2["default"].createElement(label_1.Label, { htmlFor: "name" }, "Nombre"),
                        react_2["default"].createElement(input_1.Input, { id: "name", value: newProduct.name, onChange: function (e) { return setNewProduct(__assign(__assign({}, newProduct), { name: e.target.value })); }, required: true })),
                    react_2["default"].createElement("div", { className: "grid gap-2" },
                        react_2["default"].createElement(label_1.Label, { htmlFor: "description" }, "Descripci\u00F3n"),
                        react_2["default"].createElement(textarea_1.Textarea, { id: "description", value: newProduct.description, onChange: function (e) { return setNewProduct(__assign(__assign({}, newProduct), { description: e.target.value })); }, rows: 3 })),
                    react_2["default"].createElement("div", { className: "grid gap-2" },
                        react_2["default"].createElement(label_1.Label, { htmlFor: "category" }, "Categor\u00EDa"),
                        react_2["default"].createElement("select", { id: "category", value: selectedCategory, onChange: function (e) { return setSelectedCategory(e.target.value); }, className: "border rounded p-2" },
                            react_2["default"].createElement("option", { value: "" }, "Selecciona una categor\u00EDa"),
                            categories.map(function (category) { return (react_2["default"].createElement("option", { key: category.id, value: category.id }, category.name)); }))),
                    react_2["default"].createElement("div", { className: "grid gap-2" },
                        react_2["default"].createElement(label_1.Label, { htmlFor: "price" }, "Precio"),
                        react_2["default"].createElement(input_1.Input, { id: "price", type: "number", value: newProduct.price, onChange: function (e) { return setNewProduct(__assign(__assign({}, newProduct), { price: e.target.value })); }, required: true })),
                    react_2["default"].createElement("div", { className: "grid gap-2" },
                        react_2["default"].createElement(label_1.Label, null, "Imagen del producto"),
                        react_2["default"].createElement(ImageUploader_1["default"], { onImageUploaded: handleImageUploaded }))),
                react_2["default"].createElement(dialog_1.DialogFooter, null,
                    react_2["default"].createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setIsOpen(false); }, disabled: isSubmitting }, "Cancelar"),
                    react_2["default"].createElement(button_1.Button, { type: "submit", disabled: isSubmitting }, isSubmitting ? (react_2["default"].createElement(react_2["default"].Fragment, null,
                        react_2["default"].createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                        "Guardando...")) : ("Guardar producto")))))));
}
exports["default"] = AddProductDialog;
