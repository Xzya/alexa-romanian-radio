export interface RequestAttributes {
    t(key: string, ...args: any[]): string;
    [key: string]: any;
}
