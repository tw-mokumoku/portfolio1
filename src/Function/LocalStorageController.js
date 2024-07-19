import { getCurrentDiscordUser, getCurrentUserGuilds } from "./APIController";
const currentDiscodUserData = "current_discord_user_data";
const currentDiscordUserGuilds = "current_discord_user_guilds";


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
export function setCurrentDiscordUserGuildsLocalStorage() {
    return getCurrentUserGuilds()
        .then((response) => {
            setLocalStorageJSON(currentDiscordUserGuilds, response.data);
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
export function getCurrentDiscordUserGuildsLocalStorage() {
    return getLocalStorageJSON(currentDiscordUserGuilds);
}
export function getCurrentDiscordUserOwnerGuildsLocalStorage() {
    const guilds = getCurrentDiscordUserGuildsLocalStorage();
    const ownerGuilds = [];
    for (var i = 0; i < guilds.length; i++) {
        if (guilds[i].owner) ownerGuilds.push(guilds[i]);
    }
    return ownerGuilds;
}
/*****************  remove  ********************/
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
export function removeCurrentDiscordUserDataLocalStorage() {
    return removeLocalStorage(currentDiscodUserData);
}
export function removeCurrentDiscordUserGuildsLocalStorage() {
    return removeLocalStorage(currentDiscordUserGuilds);
}

/*****************  has  ********************/
function hasLocalStorage(key) {
    return (localStorage.getItem(key) != null);
}
export function hasCurrentDiscordUserDataLocalStorage() {
    return hasLocalStorage(currentDiscodUserData);
}
export function hasCurrentDiscordUserGuildsLocalStorage() {
    return hasLocalStorage(currentDiscordUserGuilds);
}
