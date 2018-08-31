export as namespace cstorage;

declare namespace cstorage {
    function get(key: string): any;
    function getAll(key: string): any;
    function set(key: string, value: any, isSession: boolean): void;
    function available(): boolean;
    function remove(key: string): boolean;
    function update(key: string, value: any): void;
    function setCookie(key: string, value: any, expiry: string, path: string, domain: string): void;
    function getCookie(key: string): string;
    function removeCookie(key: string): boolean;
    function resetCookie(key: string): void;
    namespace config {
        let debug: boolean;
    }
}

export = cstorage;