const loc = typeof location !== 'undefined' ? location : {};
const ls = typeof localStorage !== 'undefined' ? localStorage : {};
const ss = typeof sessionStorage !== 'undefined' ? sessionStorage : {};

export { loc, ls, ss };