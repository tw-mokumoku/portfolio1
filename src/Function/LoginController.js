import { removeCurrentDiscordUserDataLocalStorage, removeCurrentDiscordUserGuildsLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie } from "./OAuthController";

export function disconnectViaDiscordAccount() {
    removeCurrentDiscordUserDataLocalStorage();
    removeCurrentDiscordUserGuildsLocalStorage();
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
}