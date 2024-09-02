import { getCheckLogin } from "./APIController";
import { deleteCookie, getCookie, hasCookie, setCookie } from "./CookieController";

const _smdluidKeyName = "_smdluid";

/*****************  set  ********************/
export function set_SessionManagerDiscordListUID(_smdluid, updated_epoch) {
    setCookie(
        _smdluidKeyName,
        `value=${_smdluid}&ue=${updated_epoch}`,
        31536000
    );
}

/*****************  get  ********************/
export function get_SessionManagerDiscordListUID() {
    return (new URLSearchParams(getCookie(_smdluidKeyName))).get('value');
}
function get_smdluidUpdatedEpoch() {
    return (new URLSearchParams(getCookie(_smdluidKeyName))).get('ue');
}
/*****************  delete  ********************/
export function delete_SessionManagerDiscordListUID() {
    deleteCookie(_smdluidKeyName);
}

/*****************  has  ********************/
export function has_SessionManagerDiscordListUID() {
    return hasCookie(_smdluidKeyName);
}

export async function checkLoginExpiry() {
    return new Promise((resolve, reject) => {
        if (Number(get_smdluidUpdatedEpoch()) >= 86400) {
            resolve();
            return;
        }
        getCheckLogin()
            .then((response) => {
                set_SessionManagerDiscordListUID(response.data._smdluid, response.data.updated_epoch);
                resolve();
            }).catch((response) => {
                reject();
            });
    });
}