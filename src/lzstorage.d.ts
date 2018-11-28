export as namespace LZStorage;

export = LZStorage;

declare class LZStorage {
    constructor(config?: Object);
    available(): boolean;
    get(key: string): any;
    getAll(key: string): any;
    set(key: string, value: any, isSession: boolean): void;
    remove(key: string): boolean;
    update(key: string, value: any): void;
    setCookie(key: string, value: any, expiry: string, path: string, domain: string): void;
    getCookie(key: string): string;
    removeCookie(key: string): boolean;
    resetCookie(key: string): void;
}