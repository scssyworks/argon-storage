const loc = (typeof location !== 'undefined' ? location : {}) as Location;
const ls = (typeof localStorage !== 'undefined' ? localStorage : {}) as Storage;
const ss = (typeof sessionStorage !== 'undefined' ? sessionStorage : {}) as Storage;
const doc = (typeof document !== 'undefined' ? document : {}) as Document;

export { loc, ls, ss, doc };