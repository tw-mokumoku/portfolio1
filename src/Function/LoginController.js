import { hasCurrentDiscordUserDataLocalStorage, removeCurrentDiscordUserDataLocalStorage, setCurrentDiscordUserDataLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie, hasDiscordOAuthTokenCookie } from "./OAuthController";

export function disconnectViaDiscord() {
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
    removeCurrentDiscordUserDataLocalStorage();
}
export function checkLocalAndOAuth() {
    return new Promise((resolve, reject) => {
        if (hasDiscordOAuthTokenCookie() && !hasCurrentDiscordUserDataLocalStorage()) {
            setCurrentDiscordUserDataLocalStorage()
                .then(() => {
                    //window.location.reload();
                    resolve();
                });
        } else {
            resolve();
        }
    })
}