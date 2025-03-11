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
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var use_toast_1 = require("@/hooks/use-toast");
function Login() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(""), error = _c[0], setError = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var router = navigation_1.useRouter();
    var toast = use_toast_1.useToast().toast;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, businessRes, businessData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError("");
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, fetch("/api/auth/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok) return [3 /*break*/, 6];
                    if (!data.id) {
                        setError("Error al obtener el usuario.");
                        return [2 /*return*/];
                    }
                    toast({
                        title: "Inicio de sesión exitoso",
                        description: "Redirigiendo al dashboard..."
                    });
                    return [4 /*yield*/, fetch("/api/user/" + data.id + "/business")];
                case 4:
                    businessRes = _a.sent();
                    return [4 /*yield*/, businessRes.json()];
                case 5:
                    businessData = _a.sent();
                    if (businessRes.ok && businessData.name) {
                        router.push("/" + businessData.name + "/dashboard"); // Redirigir por nombre de negocio
                    }
                    else {
                        router.push("/");
                    }
                    return [3 /*break*/, 7];
                case 6:
                    setError(data.error);
                    _a.label = 7;
                case 7: return [3 /*break*/, 10];
                case 8:
                    err_1 = _a.sent();
                    setError("Ocurrió un error al iniciar sesión. Por favor intente nuevamente.");
                    return [3 /*break*/, 10];
                case 9:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement("header", { className: "border-b py-4" },
            React.createElement("div", { className: "container px-4 md:px-6" },
                React.createElement(link_1["default"], { href: "/", className: "flex items-center gap-2 font-bold" },
                    React.createElement(lucide_react_1.BookOpen, { className: "h-6 w-6" }),
                    React.createElement("span", null, "PediloApp")))),
        React.createElement("main", { className: "flex-1 flex items-center justify-center p-4 md:p-8" },
            React.createElement("div", { className: "w-full max-w-md" },
                React.createElement(card_1.Card, { className: "border-none shadow-lg" },
                    React.createElement(card_1.CardHeader, { className: "space-y-1" },
                        React.createElement("div", { className: "flex items-center justify-between" },
                            React.createElement(card_1.CardTitle, { className: "text-2xl font-bold" }, "Iniciar sesi\u00F3n"),
                            React.createElement(link_1["default"], { href: "/", className: "text-sm text-muted-foreground hover:text-primary flex items-center gap-1" },
                                React.createElement(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }),
                                "Volver")),
                        React.createElement(card_1.CardDescription, null, "Ingresa tus credenciales para acceder a tu cuenta")),
                    React.createElement(card_1.CardContent, null,
                        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                            error && (React.createElement(alert_1.Alert, { variant: "destructive", className: "text-sm" },
                                React.createElement(alert_1.AlertDescription, null, error))),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement(label_1.Label, { htmlFor: "email" }, "Correo electr\u00F3nico"),
                                React.createElement("div", { className: "relative" },
                                    React.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }),
                                    React.createElement(input_1.Input, { id: "email", type: "email", placeholder: "tu@email.com", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "pl-10", required: true }))),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement("div", { className: "flex items-center justify-between" },
                                    React.createElement(label_1.Label, { htmlFor: "password" }, "Contrase\u00F1a"),
                                    React.createElement(link_1["default"], { href: "/forgot-password", className: "text-xs text-primary hover:underline" }, "\u00BFOlvidaste tu contrase\u00F1a?")),
                                React.createElement("div", { className: "relative" },
                                    React.createElement(lucide_react_1.Lock, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }),
                                    React.createElement(input_1.Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "pl-10", required: true }))),
                            React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                                "Iniciando sesi\u00F3n...")) : (React.createElement(React.Fragment, null,
                                React.createElement(lucide_react_1.LogIn, { className: "mr-2 h-4 w-4" }),
                                "Iniciar sesi\u00F3n"))))),
                    React.createElement(card_1.CardFooter, { className: "flex flex-col space-y-4 border-t pt-4" },
                        React.createElement("div", { className: "text-center text-sm" },
                            "Al iniciar sesi\u00F3n, aceptas nuestros",
                            " ",
                            React.createElement(link_1["default"], { href: "/terms", className: "text-primary hover:underline" }, "T\u00E9rminos de servicio"),
                            " ",
                            "y",
                            " ",
                            React.createElement(link_1["default"], { href: "/privacy", className: "text-primary hover:underline" }, "Pol\u00EDtica de privacidad")),
                        React.createElement("div", { className: "text-center text-sm" },
                            "\u00BFNo tienes una cuenta?",
                            " ",
                            React.createElement(link_1["default"], { href: "/register", className: "text-primary font-medium hover:underline" }, "Registrarse")))))),
        React.createElement("footer", { className: "border-t py-4 bg-muted/40" },
            React.createElement("div", { className: "container px-4 text-center text-sm text-muted-foreground" },
                "\u00A9 ",
                new Date().getFullYear(),
                " PediloApp. Todos los derechos reservados."))));
}
exports["default"] = Login;
