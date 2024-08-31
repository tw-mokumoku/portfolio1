import { getCurrentDiscordUser, getCurrentUserGuilds, getMemberData, getServer } from "./APIController";
const currentDiscodUserData = "current_discord_user_data";
const didHomeTourFlag = "did_home_tour_flag";
const i18next = "i18next";
const memberDataString = "member_data"
const didDashboardAfterInviteTourFlag = "did_dashboard_after_invite_tour_flag";

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
export function setDashboardAfterInviteTourLocalStorage() {
    setLocalStorageJSON(didDashboardAfterInviteTourFlag, true);
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
    if (i18nextLocalStorarge == 'en-NZ') return 'US';
    if (i18nextLocalStorarge == 'en-MT') return 'US';
    if (i18nextLocalStorarge == 'en-MU') return 'US';
    if (i18nextLocalStorarge == 'en-PH') return 'US';
    if (i18nextLocalStorarge == 'en-PK') return 'US';
    if (i18nextLocalStorarge == 'en-UM') return 'US';
    if (i18nextLocalStorarge == 'en-GU') return 'US';
    if (i18nextLocalStorarge == 'en-US-POSIX') return 'US';
    if (i18nextLocalStorarge == 'en-NA') return 'US';
    if (i18nextLocalStorarge == 'en-BW') return 'US';
    if (i18nextLocalStorarge == 'en-IE') return 'US';
    if (i18nextLocalStorarge == 'en-AS') return 'US';
    if (i18nextLocalStorarge == 'en-BZ') return 'US';
    if (i18nextLocalStorarge == 'en-JM') return 'US';
    if (i18nextLocalStorarge == 'en-CA') return 'US';
    if (i18nextLocalStorarge == 'en-AU') return 'US';
    if (i18nextLocalStorarge == 'en-SG') return 'US';
    if (i18nextLocalStorarge == 'en-ZW') return 'US';
    if (i18nextLocalStorarge == 'en-IN') return 'US';
    if (i18nextLocalStorarge == 'en-TT') return 'US';
    if (i18nextLocalStorarge == 'en-MH') return 'US';
    if (i18nextLocalStorarge == 'en-GB') return 'US';
    if (i18nextLocalStorarge == 'en-HK') return 'US';
    if (i18nextLocalStorarge == 'en-BE') return 'US';
    if (i18nextLocalStorarge == 'en-ZA') return 'US';
    if (i18nextLocalStorarge == 'en-MP') return 'US';
    if (i18nextLocalStorarge == 'en-VI') return 'US';
    if (i18nextLocalStorarge == 'ko') return 'KR';
    if (i18nextLocalStorarge == 'ko-KR') return 'KR';
    if (i18nextLocalStorarge == 'ja') return 'JP';
    if (i18nextLocalStorarge == 'ja-JP') return 'JP';
    if (i18nextLocalStorarge == 'zh-HK') return 'CN';
    if (i18nextLocalStorarge == 'zh-TW') return 'CN';
    if (i18nextLocalStorarge == 'zh-CN') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hant-HK') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hant-SG') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hans') return 'CN';
    if (i18nextLocalStorarge == 'zh') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hans-CN') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hant') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hant_TW') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hant_MO') return 'CN';
    if (i18nextLocalStorarge == 'zh-Hans_MO') return 'CN';
    if (i18nextLocalStorarge == 'cn') return 'CN';
    if (i18nextLocalStorarge == 'ii_CN') return 'CN';
    if (i18nextLocalStorarge == 'bo_CN') return 'CN';
    if (i18nextLocalStorarge == 'es-ES') return 'ES';
    if (i18nextLocalStorarge == 'es-HN') return 'ES';
    if (i18nextLocalStorarge == 'es-CO') return 'ES';
    if (i18nextLocalStorarge == 'es-PA') return 'ES';
    if (i18nextLocalStorarge == 'es-SV') return 'ES';
    if (i18nextLocalStorarge == 'es-CR') return 'ES';
    if (i18nextLocalStorarge == 'gl-ES') return 'ES';
    if (i18nextLocalStorarge == 'es_PE') return 'ES';
    if (i18nextLocalStorarge == 'es_BO') return 'ES';
    if (i18nextLocalStorarge == 'es_EC') return 'ES';
    if (i18nextLocalStorarge == 'es_GQ') return 'ES';
    if (i18nextLocalStorarge == 'es_MX') return 'ES';
    if (i18nextLocalStorarge == 'es_GT') return 'ES';
    if (i18nextLocalStorarge == 'es-419') return 'ES';
    if (i18nextLocalStorarge == 'es-AR') return 'ES';
    if (i18nextLocalStorarge == 'es') return 'ES';
    if (i18nextLocalStorarge == 'es-PR') return 'ES';
    if (i18nextLocalStorarge == 'es-US') return 'ES';
    if (i18nextLocalStorarge == 'ca-ES') return 'ES';
    if (i18nextLocalStorarge == 'es-NI') return 'ES';
    if (i18nextLocalStorarge == 'es-ES') return 'ES';
    if (i18nextLocalStorarge == 'es-PY') return 'ES';
    if (i18nextLocalStorarge == 'es-UY') return 'ES';
    if (i18nextLocalStorarge == 'eu-ES') return 'ES';
    if (i18nextLocalStorarge == 'es-DO') return 'ES';
    if (i18nextLocalStorarge == 'es-CL') return 'ES';
    if (i18nextLocalStorarge == 'es-VE') return 'ES';
    if (i18nextLocalStorarge == 'fr-CA') return 'FR';
    if (i18nextLocalStorarge == 'fr-FR') return 'FR';
    if (i18nextLocalStorarge == 'fr-GP') return 'FR';
    if (i18nextLocalStorarge == 'fr-GQ') return 'FR';
    if (i18nextLocalStorarge == 'fr-RW') return 'FR';
    if (i18nextLocalStorarge == 'fr-TD') return 'FR';
    if (i18nextLocalStorarge == 'fr-KM') return 'FR';
    if (i18nextLocalStorarge == 'fr-TG') return 'FR';
    if (i18nextLocalStorarge == 'fr-LU') return 'FR';
    if (i18nextLocalStorarge == 'fr-FR') return 'FR';
    if (i18nextLocalStorarge == 'fr-NE') return 'FR';
    if (i18nextLocalStorarge == 'fr-CA') return 'FR';
    if (i18nextLocalStorarge == 'fr-DJ') return 'FR';
    if (i18nextLocalStorarge == 'fr-MC') return 'FR';
    if (i18nextLocalStorarge == 'fr-CD') return 'FR';
    if (i18nextLocalStorarge == 'fr-CF') return 'FR';
    if (i18nextLocalStorarge == 'fr-RE') return 'FR';
    if (i18nextLocalStorarge == 'fr-MF') return 'FR';
    if (i18nextLocalStorarge == 'fr-CG') return 'FR';
    if (i18nextLocalStorarge == 'fr-MG') return 'FR';
    if (i18nextLocalStorarge == 'fr-GA') return 'FR';
    if (i18nextLocalStorarge == 'fr-CH') return 'FR';
    if (i18nextLocalStorarge == 'fr-SN') return 'FR';
    if (i18nextLocalStorarge == 'fr-CI') return 'FR';
    if (i18nextLocalStorarge == 'fr') return 'FR';
    if (i18nextLocalStorarge == 'fr-BF') return 'FR';
    if (i18nextLocalStorarge == 'fr-ML') return 'FR';
    if (i18nextLocalStorarge == 'fr-CM') return 'FR';
    if (i18nextLocalStorarge == 'fr-BI') return 'FR';
    if (i18nextLocalStorarge == 'fr-BJ') return 'FR';
    if (i18nextLocalStorarge == 'fr-MQ') return 'FR';
    if (i18nextLocalStorarge == 'fr-ML') return 'FR';
    if (i18nextLocalStorarge == 'fr-GN') return 'FR';
    return 'US';
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
export function hasDashboardAfterInviteTourLocalStorage() {
    return hasLocalStorage(didDashboardAfterInviteTourFlag);
}
export function hasMemberDataLocalStorage() {
    return hasLocalStorage(memberDataString);
}