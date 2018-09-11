export interface BlockDefinition {
    type: string;
    group?: string;
    text?: string;
    value?: any;
    class?: string;
    useValueProvider?: boolean;
    useTextProvider?: boolean;

    // ici ?
    breakAfter?: boolean;
    indentAfter?: boolean;
}