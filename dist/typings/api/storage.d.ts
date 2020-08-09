export declare class ArgonStorage {
    #private;
    config: {
        compress?: boolean;
    };
    constructor(config?: {
        compress: boolean;
    });
    get available(): boolean;
    set(key: string, value: any, isSession?: boolean): void;
    get(...args: any[]): any;
    getAll(...args: any[]): {
        key: string;
        value: any;
        type: string;
    }[];
    remove(...args: any[]): boolean;
}
//# sourceMappingURL=storage.d.ts.map