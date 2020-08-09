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
    get(key: string, isSession?: boolean): any;
    getAll(key: string): {
        key: string;
        value: any;
        type: string;
    }[];
    remove(key: string): boolean;
}
//# sourceMappingURL=storage.d.ts.map