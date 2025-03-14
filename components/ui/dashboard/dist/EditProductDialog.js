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
var navigation_1 = require("next/navigation");
var ImageUploader_1 = require("./ImageUploader");
var sonner_1 = require("sonner");
function EditProductDialog(_a) {
    var _this = this;
    var product = _a.product, businessName = _a.businessName, setBusiness = _a.setBusiness;
    var _b = react_1.useState(__assign({}, product)), editedProduct = _b[0], setEditedProduct = _b[1];
    var _c = react_1.useState([]), categories = _c[0], setCategories = _c[1];
    var _d = react_1.useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = react_1.useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
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
                        setCategories(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error al obtener categorías:", error_1);
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
            // Asegurarse de que el producto tenga los datos actualizados
            setEditedProduct(__assign({}, product));
        }
    }, [businessSlug, isOpen, product]);
    var handleImageUploaded = function (imageUrl) {
        setEditedProduct(function (prev) { return (__assign(__assign({}, prev), { imageUrl: imageUrl })); });
    };
    var handleUpdateProduct = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/business/" + businessSlug + "/update-product/" + product.id, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(editedProduct)
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _a.sent();
                    if (res.ok) {
                        // Actualizar el estado del negocio con el producto actualizado
                        setBusiness(function (prev) {
                            if (!prev)
                                return prev;
                            return __assign(__assign({}, prev), { products: prev.products.map(function (p) { return (p.id === product.id ? data_1 : p); }) });
                        });
                        setIsOpen(false);
                        // Mostrar toast de éxito
                        sonner_1.toast.success("Producto actualizado", {
                            description: editedProduct.name + " ha sido actualizado correctamente.",
                            position: "top-center",
                            duration: 3000
                        });
                    }
                    else {
                        sonner_1.toast.error("Error al actualizar producto", {
                            description: data_1.error || "Ocurrió un error al actualizar el producto.",
                            position: "top-center",
                            duration: 4000
                        });
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error al actualizar producto:", error_2);
                    sonner_1.toast.error("Error al actualizar producto", {
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
    return (React.createElement(dialog_1.Dialog, { open: isOpen, onOpenChange: setIsOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", size: "sm" },
                React.createElement(lucide_react_1.Edit, { className: "h-4 w-4 mr-1" }),
                " Editar")),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[500px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Editar producto"),
                React.createElement(dialog_1.DialogDescription, null, "Modifica los detalles del producto.")),
            React.createElement("form", { onSubmit: handleUpdateProduct },
                React.createElement("div", { className: "grid gap-4 py-4" },
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "name" }, "Nombre"),
                        React.createElement(input_1.Input, { id: "name", value: editedProduct.name, onChange: function (e) { return setEditedProduct(__assign(__assign({}, editedProduct), { name: e.target.value })); }, required: true })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "description" }, "Descripci\u00F3n"),
                        React.createElement(textarea_1.Textarea, { id: "description", value: editedProduct.description, onChange: function (e) { return setEditedProduct(__assign(__assign({}, editedProduct), { description: e.target.value })); }, rows: 3 })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "category" }, "Categor\u00EDa"),
                        React.createElement("select", { id: "category", value: editedProduct.categoryId || "", onChange: function (e) { return setEditedProduct(__assign(__assign({}, editedProduct), { categoryId: e.target.value || undefined })); }, className: "border rounded p-2" },
                            React.createElement("option", { value: "" }, "Selecciona una categor\u00EDa"),
                            categories.map(function (category) { return (React.createElement("option", { key: category.id, value: category.id }, category.name)); }))),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, { htmlFor: "price" }, "Precio"),
                        React.createElement(input_1.Input, { id: "price", type: "number", value: editedProduct.price, onChange: function (e) { return setEditedProduct(__assign(__assign({}, editedProduct), { price: e.target.value })); }, required: true })),
                    React.createElement("div", { className: "grid gap-2" },
                        React.createElement(label_1.Label, null, "Imagen del producto"),
                        React.createElement("div", { className: "flex items-center gap-4" },
                            editedProduct.imageUrl && (React.createElement("div", { className: "w-16 h-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0" },
                                React.createElement("img", { src: editedProduct.imageUrl || "/placeholder.svg", alt: editedProduct.name, className: "h-full w-full object-cover" }))),
                            React.createElement(ImageUploader_1["default"], { onImageUploaded: handleImageUploaded })))),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setIsOpen(false); }, disabled: isSubmitting }, "Cancelar"),
                    React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                        "Actualizando...")) : ("Actualizar producto")))))));
}
exports["default"] = EditProductDialog;
