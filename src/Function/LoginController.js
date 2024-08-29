import { hasMemberDataLocalStorage, removeMemberDataLocalStorage, setMemberDataLocalStorage } from "./LocalStorageController";
import { delete_SessionManagerDiscordListUID, has_SessionManagerDiscordListUID } from "./OAuthController";

export function disconnectViaDiscord() {
    delete_SessionManagerDiscordListUID();
    removeMemberDataLocalStorage();
}
export function checkLocalAndOAuth() {
    return new Promise((resolve, reject) => {
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