import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BlockData} from "../block-data.class";
import {BlocksService} from "../blocks.service";
import {HitResult} from "../hit-result.interface";

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
    @Input("index") index: number;
    @Input("bankType") bankType: string;

    hit: boolean = false;
    hitOnRight: boolean = false;
    hitOnLeft: boolean = false;

    draggable: any;

    constructor(
        private blocksService: BlocksService
    ) { }

    ngOnInit() {

        this.draggable = Draggable.create(this.content.nativeElement, {
            onDrag: () => {
                this.resetHitValues();

                const hitResult: HitResult = this.getIntersectingBlock();

                if (hitResult) {
                    hitResult.hitObject.hit = true;
                    hitResult.hitObject.hitOnRight = hitResult.intersectionArea > 0;
                    hitResult.hitObject.hitOnLeft = hitResult.intersectionArea <= 0;
                }
            },
            onDragEnd: (evt: PointerEvent) => {
                this.resetHitValues();

                const hitResult: HitResult = this.getIntersectingBlock();

                if (hitResult) {
                    if (hitResult.intersectionArea > 0) {
                        console.log("ici");
                        this.blocksService.moveBlockToIndex(this.index, hitResult.hitObject.index + 1, this.bankName, this.bankType);
                    } else {
                        console.log("là");
                        this.blocksService.moveBlockToIndex(this.index, hitResult.hitObject.index, this.bankName, this.bankType);
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

    resetHitValues() {
        for (let elem of this.blocksService.droppedComponent[this.bankName]) {
            elem.hit = false;
            elem.hitOnLeft = false;
            elem.hitOnRight = false;
        }
    }

    getIntersectingBlock(): HitResult {
        let maxHitArea: number = 0;
        let hitObject: BlockItemComponent;
        let maxIndex: number = 0;

        let index: number = 0;

        for (let elem of this.blocksService.droppedComponent[this.bankName]) {
            const hit: boolean = this.draggable.hitTest(elem.content.nativeElement);

            if (hit) {
                const toDrop: Object = this.content.nativeElement.getBoundingClientRect();
                const target: Object = elem.content.nativeElement.getBoundingClientRect();

                const hitArea: number = this.getBoundingRectIntersectionAreaWithXFactor(toDrop, target);

                if (Math.abs(hitArea) > Math.abs(maxHitArea)) {
                    hitObject = elem;
                    maxHitArea = hitArea;
                    maxIndex = index;
                }
            }

            index++;
        }

        return hitObject ? {
            hitObject: hitObject,
            intersectionArea: maxHitArea,
            index: maxIndex
        } : null;
    }

    getBoundingRectIntersectionAreaWithXFactor(rect1: any, rect2: any): number {
        const xa: number = rect1.right - rect2.right;
        const xb: number = rect1.left - rect2.left;

        const xf: number = Math.min(xa, xb);
        const f: number = (xf > 0) ? 1 : -1;

        const x_overlap: number = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const y_overlap: number = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

        return x_overlap * y_overlap * f;
    }
}
