import {Leave} from "./leave.interface";

export interface Definition {
    // *, +, 4, 4-6, 2,5, ou fonction
    repetition?: string;
    objects?: any[];
    children?: Definition[];
    tip?: string;
    errorTip?: string;
    target?: string;
}

