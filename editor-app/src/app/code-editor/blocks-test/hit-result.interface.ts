import {BlockItemComponent} from "./block-item/block-item.component";

export interface HitResult {
    hitObject: BlockItemComponent;
    intersectionArea: number;
    index: number;
}