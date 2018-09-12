import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BlockData} from "../block-data.class";
import {BlocksService} from "../blocks.service";

declare var require: any;
const Draggable = require("gsap/Draggable");
const TweenLite = require("gsap/TweenLite");

@Component({
    selector: 'block-item',
    templateUrl: './block-item.component.html',
    styleUrls: ['./block-item.component.scss']
})
export class BlockItemComponent implements OnInit {

    @Input() data: BlockData;
    @ViewChild("content") content: ElementRef;
    @Input("bankName") bankName: string;

    hit: boolean = false;

    constructor(
        private blocksService: BlocksService
    ) { }

    ngOnInit() {
        const draggable = Draggable.create(this.content.nativeElement, {
            onDrag: () => {
                for (let elem of this.blocksService.droppedComponent[this.bankName]) {
                    elem.hit = false;
                }

                let maxHitArea: number = 0;
                let hitObject: BlockItemComponent;

                for (let elem of this.blocksService.droppedComponent[this.bankName]) {
                    const hit: boolean = draggable.hitTest(elem.content.nativeElement);

                    if (hit) {
                        const toDrop: Object = this.content.nativeElement.getBoundingClientRect();
                        const target: Object = elem.content.nativeElement.getBoundingClientRect();

                        const hitArea: number = this.getBoundingRectIntersectionArea(toDrop, target);

                        if (Math.abs(hitArea) > maxHitArea) {
                            hitObject = elem;
                            maxHitArea = Math.abs(hitArea);
                        }
                    }
                }

                if (hitObject) {
                    hitObject.hit = true;
                }
            },
            onDragEnd: (evt: PointerEvent) => {
                for (let elem of this.blocksService.droppedComponent[this.bankName]) {
                    elem.hit = false;

                    // le hitTest ne sera peut-être plus nécessaire après coup
                    if (draggable.hitTest(elem.content.nativeElement)) {
                        const toDrop: Object = this.content.nativeElement.getBoundingClientRect();
                        const target: Object = elem.content.nativeElement.getBoundingClientRect();

                        if (toDrop["left"] > target["left"] + (target["width"] / 2)) {
                            console.log("drop on right");
                        }

                        if (toDrop["right"] <= target["left"] + (target["width"] / 2)) {
                            console.log("drop on left");
                        }


                        break;
                    }
                }

                TweenLite.set(this.content.nativeElement, {
                    css: {
                        x: 0,
                        y: 0
                    },
                    clearProps: "all"
                });
            }
        })[0];
    }

    getBoundingRectIntersectionArea(rect1: any, rect2: any): number {
        const xa: number = rect1.right - rect2.right;
        const xb: number = rect1.left - rect2.left;

        const f: number = Math.min(xa, xb);

        const fact: number = (f > 0) ? 1 : -1;

        const x_overlap: number = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const y_overlap: number = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

        return x_overlap * y_overlap * fact;
    }
}
