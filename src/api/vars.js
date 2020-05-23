const loc = typeof location !== 'undefined' ? location : {};
const ls = typeof localStorage !== 'undefined' ? localStorage : {};
const ss = typeof sessionStorage !== 'undefined' ? sessionStorage : {};
const doc = typeof document !== 'undefined' ? document : {};

export { loc, ls, ss, doc };