export interface BlockDefinition {
    type?: string;
    itemClass: string;
    group?: string;
    text?: string;
    value?: any;
    class?: string;
    valueProvider?: string;
    textProvider?: Function;

    // ici ?
    breakAfter?: boolean;
    indentAfter?: number;
}