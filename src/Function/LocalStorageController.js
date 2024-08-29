import { getCurrentDiscordUser, getCurrentUserGuilds, getMemberData, getServer } from "./APIController";
const currentDiscodUserData = "current_discord_user_data";
const didHomeTourFlag = "did_home_tour_flag";
const i18next = "i18next";
const memberDataString = "member_data"


/*****************  set  ********************/
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
function setLocalStorageJSON(key, value) {
    setLocalStorage(key, JSON.stringify(value));
}
export function setMemberDataLocalStorage() {
    return getMemberData()
        .then((response) => {
            setLocalStorageJSON(memberDataString, response.data);
        })
}
export function setHomeTourFlagLocalStorage() {
    setLocalStorageJSON(didHomeTourFlag, true);
}
export function setMemberDataLocalStorgae(member_data) {
    setLocalStorageJSON(memberDataString, member_data);
}

/*****************  get  ********************/
function getLocalStorage(key) {
    return localStorage.getItem(key);
}
function getLocalStorageJSON(key) {
    return JSON.parse(getLocalStorage(key));
}
export function getMemberDataLocalStorage() {
    return getLocalStorageJSON(memberDataString);
}
function geti18nextLocalStorage() {
    return getLocalStorage(i18next);
}
export function getLanguageLocalStorage() {
    const i18nextLocalStorarge = geti18nextLocalStorage();
    if (i18nextLocalStorarge == 'en') return 'US';
    if (i18nextLocalStorarge == 'en-US') return 'US';
    if (i18nextLocalStorarge == 'en-GB') return 'US';
    if (i18nextLocalStorarge == 'en-CA') return 'US';
    if (i18nextLocalStorarge == 'en-AU') return 'US';
    if (i18nextLocalStorarge == 'en-AU') return 'US';
    if (i18nextLocalStorarge == 'ko') return 'KR';
    if (i18nextLocalStorarge == 'ja') return 'JP';
    if (i18nextLocalStorarge == 'zh-HK') return 'CN';
    if (i18nextLocalStorarge == 'zh-TW') return 'CN';
    if (i18nextLocalStorarge == 'zh-CN') return 'CN';
    if (i18nextLocalStorarge == 'cn') return 'CN';
    if (i18nextLocalStorarge == 'es-ES') return 'ES';
    if (i18nextLocalStorarge == 'es-419') return 'ES';
    if (i18nextLocalStorarge == 'es') return 'ES';
    if (i18nextLocalStorarge == 'fr-CA') return 'FR';
    if (i18nextLocalStorarge == 'fr-FR') return 'FR';
    if (i18nextLocalStorarge == 'fr') return 'FR';
}

/*****************  remove  ********************/
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
export function removeMemberDataLocalStorage() {
    return removeLocalStorage(memberDataString);
}

/*****************  has  ********************/
function hasLocalStorage(key) {
    return (localStorage.getItem(key) != null);
}
export function hasHomeTourFlagLocalStorage() {
    return hasLocalStorage(didHomeTourFlag);
}
export function hasMemberDataLocalStorage() {
    return hasLocalStorage(memberDataString);
}