export declare function setCookie(key: string, value: any, expiryDays?: number, path?: string, domain?: string, isSecure?: boolean): void;
export declare function getCookie(key: string, trimResult?: boolean): string;
export declare function getAllCookies(matchRegex: RegExp): {
    key: string;
    value: string;
}[];
export declare function removeCookie(key: string, path?: string, domain?: string): boolean;
//# sourceMappingURL=cookies.d.ts.map