
import { getCookie, setCookie, removeCookie, getAllCookies } from './api/cookies';
import { toUTF16, fromUTF16 } from './modules/utf16';
import { ArgonStorage } from './api/storage';


export default ArgonStorage;
export {
    getCookie,
    setCookie,
    removeCookie,
    getAllCookies,
    toUTF16 as compress,
    fromUTF16 as decompress
};