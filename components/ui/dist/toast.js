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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Toast = exports.ToastViewport = exports.ToastProvider = exports.Toaster = void 0;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var class_variance_authority_1 = require("class-variance-authority");
var utils_1 = require("@/app/lib/utils");
var use_toast_1 = require("@/hooks/use-toast");
var ToastProvider = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
exports.ToastProvider = ToastProvider;
var ToastViewport = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ ref: ref, className: utils_1.cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className) }, props)));
});
exports.ToastViewport = ToastViewport;
ToastViewport.displayName = "ToastViewport";
var toastVariants = class_variance_authority_1.cva("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            "default": "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
var ToastImpl = React.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, toast = _a.toast, onDismiss = _a.onDismiss, props = __rest(_a, ["className", "variant", "toast", "onDismiss"]);
    return (React.createElement("div", __assign({ ref: ref, className: utils_1.cn(toastVariants({ variant: variant }), className) }, props),
        React.createElement("div", { className: "grid gap-1" },
            toast.title && React.createElement("div", { className: "text-sm font-semibold" }, toast.title),
            toast.description && React.createElement("div", { className: "text-sm opacity-90" }, toast.description)),
        toast.action,
        React.createElement("button", { className: "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100", onClick: function () { return onDismiss(toast.id); } },
            React.createElement(lucide_react_1.X, { className: "h-4 w-4" }),
            React.createElement("span", { className: "sr-only" }, "Close"))));
});
exports.Toast = ToastImpl;
ToastImpl.displayName = "Toast";
var Toaster = function () {
    var _a = use_toast_1.useToast(), toasts = _a.toasts, dismiss = _a.dismiss;
    return (React.createElement(ToastProvider, null,
        React.createElement(ToastViewport, null, toasts.map(function (toast) { return (React.createElement(ToastImpl, { key: toast.id, toast: toast, onDismiss: dismiss, variant: toast.variant })); }))));
};
exports.Toaster = Toaster;
