import { removeCurrentDiscordUserDataLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie } from "./OAuthController";

export function disconnectViaDiscord() {
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
    removeCurrentDiscordUserDataLocalStorage();
}