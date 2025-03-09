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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useToast = void 0;
// This is a simplified version of the toast hook from shadcn/ui
var react_1 = require("react");
var TOAST_LIMIT = 5;
var TOAST_REMOVE_DELAY = 1000;
var toasts = [];
// Simple unique ID generator
var generateId = function () {
    return Math.random().toString(36).substring(2, 9);
};
var listeners = [];
var addToast = function (toast) {
    var id = toast.id || generateId();
    var newToast = __assign(__assign({}, toast), { id: id, visible: true });
    var existingToastIndex = toasts.findIndex(function (t) { return t.id === id; });
    if (existingToastIndex >= 0) {
        toasts[existingToastIndex] = newToast;
    }
    else {
        if (toasts.length >= TOAST_LIMIT) {
            dismissToast(toasts[0].id);
        }
        toasts.push(newToast);
    }
    listeners.forEach(function (listener) {
        listener(__spreadArrays(toasts));
    });
    return id;
};
var dismissToast = function (id) {
    var index = toasts.findIndex(function (toast) { return toast.id === id; });
    if (index >= 0) {
        toasts[index].visible = false;
        listeners.forEach(function (listener) {
            listener(__spreadArrays(toasts));
        });
    }
    setTimeout(function () {
        removeToast(id);
    }, TOAST_REMOVE_DELAY);
};
var removeToast = function (id) {
    var index = toasts.findIndex(function (toast) { return toast.id === id; });
    if (index >= 0) {
        toasts.splice(index, 1);
        listeners.forEach(function (listener) {
            listener(__spreadArrays(toasts));
        });
    }
};
var updateToast = function (id, toast) {
    var index = toasts.findIndex(function (t) { return t.id === id; });
    if (index >= 0) {
        toasts[index] = __assign(__assign({}, toasts[index]), toast);
        listeners.forEach(function (listener) {
            listener(__spreadArrays(toasts));
        });
    }
};
function useToast() {
    var _a = react_1.useState(toasts), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        listeners.push(setState);
        return function () {
            var index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);
    var toast = react_1.useCallback(function (props) {
        var id = addToast(props);
        // Auto-dismiss after duration
        if (props.duration !== Number.POSITIVE_INFINITY) {
            setTimeout(function () {
                dismissToast(id);
            }, props.duration || 5000);
        }
        return {
            id: id,
            dismiss: function () { return dismissToast(id); },
            update: function (props) { return updateToast(id, props); }
        };
    }, []);
    return {
        toast: toast,
        toasts: state,
        dismiss: dismissToast
    };
}
exports.useToast = useToast;
