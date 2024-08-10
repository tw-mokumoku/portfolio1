import { getCurrentDiscordUser, getCurrentUserGuilds, getServer } from "./APIController";
const currentDiscodUserData = "current_discord_user_data";
const didHomeTourFlag = "did_home_tour_flag"


/*****************  set  ********************/
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
function setLocalStorageJSON(key, value) {
    setLocalStorage(key, JSON.stringify(value));
}
export function setCurrentDiscordUserDataLocalStorage() {
    return getCurrentDiscordUser()
        .then((response) => {
            setLocalStorageJSON(currentDiscodUserData, response.data);
        });
}
export function setHomeTourFlagLocalStorage() {
    setLocalStorageJSON(didHomeTourFlag, true);
}

/*****************  get  ********************/
function getLocalStorage(key) {
    return localStorage.getItem(key);
}
function getLocalStorageJSON(key) {
    return JSON.parse(getLocalStorage(key));
}
export function getCurrentDiscordUserDataLocalStorage() {
    return getLocalStorageJSON(currentDiscodUserData);
}
/*****************  remove  ********************/
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
export function removeCurrentDiscordUserDataLocalStorage() {
    return removeLocalStorage(currentDiscodUserData);
}

/*****************  has  ********************/
function hasLocalStorage(key) {
    return (localStorage.getItem(key) != null);
}
export function hasCurrentDiscordUserDataLocalStorage() {
    return hasLocalStorage(currentDiscodUserData);
}
export function hasHomeTourFlagLocalStorage() {
    return hasLocalStorage(didHomeTourFlag);
}