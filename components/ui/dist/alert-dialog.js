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
exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialogDescription = exports.AlertDialogTitle = exports.AlertDialogFooter = exports.AlertDialogHeader = exports.AlertDialogContent = exports.AlertDialogTrigger = exports.AlertDialogOverlay = exports.AlertDialogPortal = exports.AlertDialog = void 0;
var React = require("react");
var AlertDialogPrimitive = require("@radix-ui/react-alert-dialog");
var utils_1 = require("@/app/lib/utils");
var button_1 = require("@/components/ui/button");
function AlertDialog(_a) {
    var props = __rest(_a, []);
    return React.createElement(AlertDialogPrimitive.Root, __assign({ "data-slot": "alert-dialog" }, props));
}
exports.AlertDialog = AlertDialog;
function AlertDialogTrigger(_a) {
    var props = __rest(_a, []);
    return (React.createElement(AlertDialogPrimitive.Trigger, __assign({ "data-slot": "alert-dialog-trigger" }, props)));
}
exports.AlertDialogTrigger = AlertDialogTrigger;
function AlertDialogPortal(_a) {
    var props = __rest(_a, []);
    return (React.createElement(AlertDialogPrimitive.Portal, __assign({ "data-slot": "alert-dialog-portal" }, props)));
}
exports.AlertDialogPortal = AlertDialogPortal;
function AlertDialogOverlay(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPrimitive.Overlay, __assign({ "data-slot": "alert-dialog-overlay", className: utils_1.cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className) }, props)));
}
exports.AlertDialogOverlay = AlertDialogOverlay;
function AlertDialogContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPortal, null,
        React.createElement(AlertDialogOverlay, null),
        React.createElement(AlertDialogPrimitive.Content, __assign({ "data-slot": "alert-dialog-content", className: utils_1.cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className) }, props))));
}
exports.AlertDialogContent = AlertDialogContent;
function AlertDialogHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "alert-dialog-header", className: utils_1.cn("flex flex-col gap-2 text-center sm:text-left", className) }, props)));
}
exports.AlertDialogHeader = AlertDialogHeader;
function AlertDialogFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "alert-dialog-footer", className: utils_1.cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className) }, props)));
}
exports.AlertDialogFooter = AlertDialogFooter;
function AlertDialogTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPrimitive.Title, __assign({ "data-slot": "alert-dialog-title", className: utils_1.cn("text-lg font-semibold", className) }, props)));
}
exports.AlertDialogTitle = AlertDialogTitle;
function AlertDialogDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPrimitive.Description, __assign({ "data-slot": "alert-dialog-description", className: utils_1.cn("text-muted-foreground text-sm", className) }, props)));
}
exports.AlertDialogDescription = AlertDialogDescription;
function AlertDialogAction(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPrimitive.Action, __assign({ className: utils_1.cn(button_1.buttonVariants(), className) }, props)));
}
exports.AlertDialogAction = AlertDialogAction;
function AlertDialogCancel(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(AlertDialogPrimitive.Cancel, __assign({ className: utils_1.cn(button_1.buttonVariants({ variant: "outline" }), className) }, props)));
}
exports.AlertDialogCancel = AlertDialogCancel;
