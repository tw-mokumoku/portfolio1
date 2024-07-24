import { deleteCookie, getCookie, hasCookie, setCookie } from "./CookieController";

const discordOAuthToken = "discord_oauth_token";
const discordAccessToken = "discord_access_token";
const discordRefreshToken = "discord_refresh_token";

/*****************  set  ********************/
export function setDiscordOAuthTokenCookie(token) {
    setCookie(discordOAuthToken, token, 2419200, "/");
}
export function setDiscordAccessTokenCookie(token) {
    setCookie(discordAccessToken, token, 2419200, "/");
}
export function setDiscordRefreshTokenCookie(token) {
    setCookie(discordRefreshToken, token, 2419200, "/");
}

/*****************  get  ********************/
export function getDiscordAccessTokenCookie() {
    return getCookie(discordAccessToken);
}
export function getDiscordRefreshTokenCookie() {
    return getCookie(discordRefreshToken);
}
export function getDiscordOAuthTokenCookie() {
    return getCookie(discordOAuthToken);
}

/*****************  delete  ********************/
export function deleteDiscordAccessTokenCookie() {
    deleteCookie(discordAccessToken);
}
export function deleteDiscordRefreshTokenCookie() {
    deleteCookie(discordRefreshToken);
}
export function deleteDiscordOAuthTokenCookie() {
    deleteCookie(discordOAuthToken);
}

/*****************  has  ********************/
export function hasDiscordOAuthTokenCookie() {
    return hasCookie(discordOAuthToken);
}
export function hasDiscordAccessTokenCookie() {
    return hasCookie(discordAccessToken);
}
export function hasDiscordRefreshTokenCookie() {
    return hasCookie(discordRefreshToken);
}