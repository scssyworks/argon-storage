export default class ArgonStorage {
    constructor(config?: Object);
    available: boolean;
    get(key: string): boolean;
    set(key: string, value: any, isSession?: boolean): void;
    getAll(key: string): any;
    remove(key: string): boolean;
}

declare function setCookie(key: string, value: any, expiryDays?: number, path = '/', domain?: string, secure?: boolean): void;

declare function getCookie(key: string, trim?: boolean): any;

declare function removeCookie(key: string, path = '/', domain?: string): boolean;

declare function getAllCookies(matchRegex?: RegExp | string): Array;

declare function compress(value: string): string;

declare function decompress(value: string): string;

export = { setCookie, getCookie, removeCookie, getAllCookies, compress, decompress };