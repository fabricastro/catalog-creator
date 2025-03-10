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
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
function AddCategoryDialog(_a) {
    var _this = this;
    var setCategories = _a.setCategories;
    var _b = react_1.useState(""), categoryName = _b[0], setCategoryName = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), open = _d[0], setOpen = _d[1];
    var params = navigation_1.useParams();
    var businessSlug = params.businessSlug;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, newCategory_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!categoryName.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/business/" + encodeURIComponent(businessSlug) + "/categories", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: categoryName.trim() })
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Error al agregar la categoría");
                    return [4 /*yield*/, res.json()];
                case 3:
                    newCategory_1 = _a.sent();
                    setCategories(function (prev) { return __spreadArrays(prev, [newCategory_1.name]); });
                    setCategoryName("");
                    setOpen(false);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("❌ Error al agregar categoría:", error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline" },
                React.createElement(lucide_react_1.Plus, { className: "mr-2 h-4 w-4" }),
                "Agregar Categor\u00EDa")),
        React.createElement(dialog_1.DialogContent, null,
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Agregar nueva categor\u00EDa")),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement(input_1.Input, { placeholder: "Nombre de la categor\u00EDa", value: categoryName, onChange: function (e) { return setCategoryName(e.target.value); }, required: true }),
                React.createElement(dialog_1.DialogFooter, { className: "mt-4" },
                    React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setOpen(false); } }, "Cancelar"),
                    React.createElement(button_1.Button, { type: "submit", disabled: loading }, loading ? "Guardando..." : "Guardar"))))));
}
exports["default"] = AddCategoryDialog;
