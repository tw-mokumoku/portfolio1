import { getCurrentDiscordUser, getCurrentUserGuilds, getServer } from "./APIController";
const currentDiscodUserData = "current_discord_user_data";
const currentDiscordUserGuilds = "current_discord_user_guilds";
const currentDislistUserOwningServers = "current_dislist_user_owning_servers";


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
