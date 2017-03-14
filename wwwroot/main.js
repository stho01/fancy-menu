var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Zed;

(function(Zed) {
    "use strict";
    var _defaultOptions = {
        overlayLeftHook: "fancymenu:overlayleft",
        overlayRightHook: "fancymenu:overlayright",
        activeHook: "fancymenu:active"
    };
    var test = function() {
        function test() {}
        return test;
    }();
    var Fancymenu = function() {
        function Fancymenu(container, options) {
            this._options = _defaultOptions;
            this._container = container;
        }
        Fancymenu.prototype.init = function() {
            this._navContainer = this._container.querySelector("nav");
            this._overlayLeft = this._container.querySelector("[data-js-hook='" + this._options.overlayLeftHook + "']");
            this._overlayRight = this._container.querySelector("[data-js-hook='" + this._options.overlayRightHook + "']");
            this._currentActive = this._navContainer.querySelector("[data-js-hook='" + this._options.activeHook + "']");
            this._calculateOverlayWidths(this._currentActive);
            this._navContainer.addEventListener("click", this._onNavClickEventHandler.bind(this));
        };
        Fancymenu.prototype.dispose = function() {
            this._navContainer.removeEventListener("click", this._onNavClickEventHandler.bind(this));
        };
        Fancymenu.prototype._calculateOverlayWidths = function(currentActive) {
            var _this = this;
            var containerBBox = this._navContainer.getBoundingClientRect();
            var activeBBox = currentActive.getBoundingClientRect();
            var leftWidth = Math.abs(containerBBox.left - activeBBox.left);
            var rightWidht = Math.abs(containerBBox.right - activeBBox.right);
            var direction = this._overlayRight.getBoundingClientRect().width > rightWidht ? "left" : "right";
            if (direction == "left") {
                this._overlayRight.style.setProperty("transition", "width 600ms cubic-bezier(0.3, 0.65, 0.24, 0.96)");
                this._overlayLeft.style.setProperty("transition", "width 500ms cubic-bezier(1, 0.18, 0.13, 0.35)");
            } else if (direction == "right") {
                this._overlayRight.style.setProperty("transition", "width 500ms cubic-bezier(1, 0.18, 0.13, 0.35)");
                this._overlayLeft.style.setProperty("transition", "width 600ms cubic-bezier(0.3, 0.65, 0.24, 0.96)");
            }
            requestAnimationFrame(function() {
                _this._overlayLeft.style.setProperty("width", leftWidth + "px");
                _this._overlayRight.style.setProperty("width", rightWidht + "px");
            });
        };
        Fancymenu.prototype._onNavClickEventHandler = function(event) {
            event.preventDefault();
            console.log(event.target);
            var target = event.target;
            if (target.tagName == "SPAN") {
                this._currentActive = target.parentElement;
                this._calculateOverlayWidths(target.parentElement);
            } else if (target.tagName == "A") {
                this._currentActive = target;
                this._calculateOverlayWidths(target);
            }
        };
        __decorate([ f() ], Fancymenu.prototype, "init", null);
        return Fancymenu;
    }();
    Zed.Fancymenu = Fancymenu;
})(Zed || (Zed = {}));

function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function f() {
    console.log("f(): evaluated");
    return function(target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}