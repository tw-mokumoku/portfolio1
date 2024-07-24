import { removeCurrentDiscordUserDataLocalStorage, removeCurrentDiscordUserGuildsLocalStorage, removeCurrentDislistUserOwningServersLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie } from "./OAuthController";

export function disconnectViaDiscord() {
    removeCurrentDiscordUserDataLocalStorage();
    removeCurrentDiscordUserGuildsLocalStorage();
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
}
export function disconnectVisDislist() {
    removeCurrentDislistUserOwningServersLocalStorage();
}