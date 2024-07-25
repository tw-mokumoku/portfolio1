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
export function setCurrentDiscordUserGuildsLocalStorage() {
    return getCurrentUserGuilds()
        .then((response) => {
            setLocalStorageJSON(currentDiscordUserGuilds, response.data);
        });
}
export function setCurrentDislistUserOwningServers() {
    var currentDislistUserOwningServersList = [];
    var promises = [];
    getCurrentDiscordUserOwnerGuildsLocalStorage().map((value, key) => {
        promises.push(
            getServer(value['id']).then((response) => {
                if (response.data == null) return;
                currentDislistUserOwningServersList.push(response.data)
            })
        );
        return null;
    })
    return Promise.all(promises).then(() => {
        setLocalStorageJSON(currentDislistUserOwningServers, currentDislistUserOwningServersList);
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
export function getCurrentDislistUserOwningServersLocalStorage() {
    return getLocalStorageJSON(currentDislistUserOwningServers);
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
export function removeCurrentDislistUserOwningServersLocalStorage() {
    return removeLocalStorage(currentDislistUserOwningServers);
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
export function hasCurrentDislistUserOwningServers() {
    return hasLocalStorage(currentDislistUserOwningServers);
}
