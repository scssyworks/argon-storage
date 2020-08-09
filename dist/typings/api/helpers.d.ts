export declare function trim(value: any): string;
export declare function assign(...args: any[]): any;
export declare function tryParse(value: any): any;
export declare function hasOwn(ob: any, prop: (string | number | symbol)): boolean;
export declare class TypeResolver {
    __v: any;
    constructor(value?: any);
    static match(value: any): boolean;
    setValue(value: any): TypeResolver;
    getValue(): any;
}
//# sourceMappingURL=helpers.d.ts.map