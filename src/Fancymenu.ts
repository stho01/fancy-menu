namespace Zed {
    "use strict";


    export interface FancymenuOptions {
        overlayLeftHook     ?: string;
        overlayRightHook    ?: string;
        activeHook          ?: string;
    }

    let _defaultOptions     : FancymenuOptions          = {
        overlayLeftHook     : "fancymenu:overlayleft",
        overlayRightHook    : "fancymenu:overlayright",
        activeHook          : "fancymenu:active"
    };


    export class Fancymenu {

        //************************************************************
        //* Fields
        //************************************************************

        private _options        : FancymenuOptions;
        private _container      : HTMLElement;
        private _navContainer   : HTMLElement;
        private _overlayLeft    : HTMLElement;
        private _overlayRight   : HTMLElement;
        private _currentActive  : HTMLElement;

        //************************************************************
        //* Ctor
        //************************************************************

        public constructor(container: HTMLElement, options?: Object) {
            this._options   = _defaultOptions; //< todo: extend option objects.
            this._container = container;
        }

        //************************************************************
        //* Public member functions
        //************************************************************

        /**
         *
         */
        @f()
        init(): void {
            this._navContainer  = this._container.querySelector("nav");
            this._overlayLeft   = this._container.querySelector(`[data-js-hook='${this._options.overlayLeftHook}']`)    as HTMLElement;
            this._overlayRight  = this._container.querySelector(`[data-js-hook='${this._options.overlayRightHook}']`)   as HTMLElement;
            this._currentActive = this._navContainer.querySelector(`[data-js-hook='${this._options.activeHook}']`)      as HTMLElement;
            this._calculateOverlayWidths(this._currentActive);
            this._navContainer.addEventListener("click", this._onNavClickEventHandler.bind(this));
        }

        /**
         *
         */
        dispose(): void {
            this._navContainer.removeEventListener("click", this._onNavClickEventHandler.bind(this));
        }

        //************************************************************
        //* Private member functions
        //************************************************************

        /**
         *
         * @private
         */
        private _calculateOverlayWidths(currentActive: HTMLElement): void {
            let containerBBox = this._navContainer.getBoundingClientRect();
            let activeBBox    = currentActive.getBoundingClientRect();
            let leftWidth     = Math.abs(containerBBox.left - activeBBox.left);
            let rightWidht    = Math.abs(containerBBox.right - activeBBox.right);
            let direction     = this._overlayRight.getBoundingClientRect().width > rightWidht ? "left" : "right";


            if (direction == "left") {

                this._overlayRight.style.setProperty("transition", "width 600ms cubic-bezier(0.3, 0.65, 0.24, 0.96)");      // fast
                this._overlayLeft.style.setProperty("transition", "width 500ms cubic-bezier(1, 0.18, 0.13, 0.35)");         // slow
            } else if (direction == "right"){
                this._overlayRight.style.setProperty("transition", "width 500ms cubic-bezier(1, 0.18, 0.13, 0.35)");  // slow
                this._overlayLeft.style.setProperty("transition", "width 600ms cubic-bezier(0.3, 0.65, 0.24, 0.96)");     // fast
            }

            requestAnimationFrame(() => {
                this._overlayLeft.style.setProperty("width", leftWidth + "px");
                this._overlayRight.style.setProperty("width", rightWidht + "px");
            });
        }

        //************************************************************
        //* Event handlers
        //************************************************************

        private _onNavClickEventHandler(event: Event): void {
            event.preventDefault();

            console.log(event.target);
            let target = event.target as HTMLElement;
            if (target.tagName == "SPAN" ) {
                this._currentActive = target.parentElement;
                this._calculateOverlayWidths(target.parentElement);
            } else if(target.tagName == "A") {
                this._currentActive = target;
                this._calculateOverlayWidths(target);
            }
        }
    }
}