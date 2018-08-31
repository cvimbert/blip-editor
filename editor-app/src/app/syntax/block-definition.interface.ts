export interface BlockDefinition {
    type: string;
    group?: string;
    text?: string;
    value?: any;

    useValueProvider?: boolean;
    useTextProvider?: boolean;
}