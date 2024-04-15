import { removeCurrentDiscordUserDataLocalStorage } from "./LocalStorageController";
import { deleteDiscordAccessTokenCookie, deleteDiscordOAuthTokenCookie, deleteDiscordRefreshTokenCookie } from "./OAuthController";

export function disconnectViaDiscordAccount() {
    removeCurrentDiscordUserDataLocalStorage();
    deleteDiscordAccessTokenCookie();
    deleteDiscordRefreshTokenCookie();
    deleteDiscordOAuthTokenCookie();
}