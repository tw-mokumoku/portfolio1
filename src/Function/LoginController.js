import { removeCurrentDiscordUserDataLocalStorage, removeCurrentDiscordUserGuildsLocalStorage, removeCurrentDislistUserOwningServersLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie } from "./OAuthController";

export function disconnectViaDiscord() {
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
    removeCurrentDiscordUserDataLocalStorage();
    removeCurrentDiscordUserGuildsLocalStorage();
}
export function disconnectVisDislist() {
    removeCurrentDislistUserOwningServersLocalStorage();
}