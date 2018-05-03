import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
    selector: '[parentAutoresize]'
})
export class ParentAutoresizeDirective implements OnInit, OnDestroy {

    @Input() parentAutoresize: boolean = true;

    constructor(
        private element: ElementRef
    ) { }

    ngOnInit() {
        let observer: MutationObserver = new MutationObserver(() => {
            this.resizeElement();
        });

        observer.observe(this.element.nativeElement,
            {
                subtree: true,
                childList: true,
                attributes: true
            });

        window.addEventListener("resize", () => {
            this.resizeElement();
        });
    }

    ngOnDestroy() {

    }

    resizeElement() {
        let parentHeight: number = this.element.nativeElement.parentElement.parentElement.clientHeight;
        let parentWidth: number = this.element.nativeElement.parentElement.parentElement.clientWidth;

        let elementHeight: number = this.element.nativeElement.clientHeight;
        let elementWidth: number = this.element.nativeElement.clientWidth;

        // calculating scale
        let parentRatio: number =  parentHeight / parentWidth;
        let elementRatio: number = elementHeight / elementWidth;

        let scale: number = Math.min(1, parentRatio > elementRatio ? parentWidth / elementWidth : parentHeight / elementHeight);

        let xPos: number = Math.max(0, (parentWidth - elementWidth * scale) / 2);
        let yPos: number = Math.max(0, (parentHeight - elementHeight * scale) / 2);

        this.element.nativeElement.parentElement.style.transform = "scale(" + scale + ")";
        this.element.nativeElement.parentElement.style.left = xPos + "px";
        this.element.nativeElement.parentElement.style.top = yPos + "px";
    }
}
