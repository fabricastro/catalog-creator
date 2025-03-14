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
var button_1 = require("@/components/ui/button");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var sonner_1 = require("sonner");
function DeleteProductDialog(_a) {
    var _this = this;
    var product = _a.product, onProductDeleted = _a.onProductDeleted;
    var _b = react_1.useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var params = navigation_1.useParams();
    var businessSlug = params.businessSlug;
    var handleDeleteProduct = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch("/api/business/" + businessSlug + "/delete-product/" + product.id, {
                            method: "DELETE"
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 3];
                    onProductDeleted(product.id);
                    // Mostrar toast de éxito
                    sonner_1.toast.success("Producto eliminado", {
                        description: product.name + " ha sido eliminado del cat\u00E1logo.",
                        position: "top-center",
                        duration: 3000
                    });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    sonner_1.toast.error("Error al eliminar producto", {
                        description: data.error || "Ocurrió un error al eliminar el producto.",
                        position: "top-center",
                        duration: 4000
                    });
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error al eliminar producto:", error_1);
                    sonner_1.toast.error("Error al eliminar producto", {
                        description: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
                        position: "top-center",
                        duration: 4000
                    });
                    return [3 /*break*/, 8];
                case 7:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(alert_dialog_1.AlertDialog, null,
        React.createElement(alert_dialog_1.AlertDialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", size: "icon", className: "text-destructive hover:bg-destructive/10" },
                React.createElement(lucide_react_1.Trash2, { className: "h-4 w-4" }))),
        React.createElement(alert_dialog_1.AlertDialogContent, null,
            React.createElement(alert_dialog_1.AlertDialogHeader, null,
                React.createElement(alert_dialog_1.AlertDialogTitle, null, "\u00BFEst\u00E1s seguro?"),
                React.createElement(alert_dialog_1.AlertDialogDescription, null,
                    "Esta acci\u00F3n eliminar\u00E1 permanentemente el producto \"",
                    product.name,
                    "\" de tu cat\u00E1logo. Esta acci\u00F3n no se puede deshacer.")),
            React.createElement(alert_dialog_1.AlertDialogFooter, null,
                React.createElement(alert_dialog_1.AlertDialogCancel, { disabled: isSubmitting }, "Cancelar"),
                React.createElement(alert_dialog_1.AlertDialogAction, { onClick: handleDeleteProduct, disabled: isSubmitting, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" }, isSubmitting ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                    "Eliminando...")) : ("Eliminar producto"))))));
}
exports["default"] = DeleteProductDialog;
