export as namespace commonstorage;

export namespace commonstorage {
    export function get(key: string): any;
    export function getAll(key: string): any;
    export function set(key: string, value: any, isSession: boolean): void;
    export function available(): boolean;
    export function remove(key: string): boolean;
    export namespace config {
        export let debug: boolean;
    }
}