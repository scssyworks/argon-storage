export as namespace cstorage;

export function get(key: string): any;
export function getAll(key: string): any;
export function set(key: string, value: any, isSession: boolean): void;
export function available(): boolean;
export function remove(key: string): boolean;
export function update(key: string, value: any): void;
export function setCookie(key: string, value: any, expiry: string, path: string, domain: string): void;
export function getCookie(key: string): string;
export function removeCookie(key: string): boolean;
export function resetCookie(key: string): void;
export namespace config {
    export let debug: boolean;
}