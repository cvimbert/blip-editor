export interface BlockDefinition {
    type?: string;
    itemClass: string;
    group?: string;
    text?: string;
    value?: any;
    class?: string;
    valueProvider?: string;
    textProvider?: Function;

    nodeReference?: string;
    include?: string[];

    // ici ?
    breakAfter?: boolean;
    indentAfter?: number;
}