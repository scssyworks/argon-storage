import { getCookie, setCookie, removeCookie, getAllCookies } from './api/cookies';
import { LZStorage } from './api/storage';
import { toUTF16, fromUTF16 } from './modules/utf16';

export {
    LZStorage,
    getCookie,
    setCookie,
    removeCookie,
    getAllCookies,
    toUTF16 as compress,
    fromUTF16 as decompress
};