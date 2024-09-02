import { hasMemberDataLocalStorage, removeMemberDataLocalStorage, setMemberDataLocalStorage } from "./LocalStorageController";
import { delete_SessionManagerDiscordListUID, get_SessionManagerDiscordListUID, has_SessionManagerDiscordListUID } from "./OAuthController";

export function disconnectViaDiscord() {
    delete_SessionManagerDiscordListUID();
    removeMemberDataLocalStorage();
}
export function checkLocalAndOAuth() {
    return new Promise((resolve, reject) => {
        console.log(get_SessionManagerDiscordListUID());
        if (has_SessionManagerDiscordListUID() && !hasMemberDataLocalStorage()) {
            setMemberDataLocalStorage()
                .then(() => {
                    resolve();
                });
        } else {
            resolve();
        }
    });
}