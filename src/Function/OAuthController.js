import { deleteCookie, getCookie, hasCookie, setCookie } from "./CookieController";

const _smdluidKeyName = "_smdluid";

/*****************  set  ********************/
export function set_SessionManagerDiscordListUID(_smdluid) {
    setCookie(_smdluidKeyName, _smdluid, 31536000)
}

/*****************  get  ********************/
export function get_SessionManagerDiscordListUID() {
    return getCookie(_smdluidKeyName);
}

/*****************  delete  ********************/
export function delete_SessionManagerDiscordListUID() {
    deleteCookie(_smdluidKeyName);
}

/*****************  has  ********************/
export function has_SessionManagerDiscordListUID() {
    return hasCookie(_smdluidKeyName);
}