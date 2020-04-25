let WINDOW = {};
if (typeof window !== undefined) {
    WINDOW = window;
}
const loc = WINDOW.location;
const ls = WINDOW.localStorage;
const ss = WINDOW.sessionStorage;

export { WINDOW, loc, ls, ss };