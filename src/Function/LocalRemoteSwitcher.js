const localUrlOrigin = "http://localhost:3000";
const remoteUrlOrigin = "https://discordlist.kolysis.com";

/*****************  Function  ********************/
export function isLocal() {
    const hostname = document.location.hostname;
    return (hostname === 'localhost' || hostname === '127.0.0.1');
}
export function getSearchParam(value) {
    const params = new URLSearchParams(document.location.search);
    return params.get(value);
}
export function getURL(pathname) {
    return isLocal() ?
        `${localUrlOrigin}${pathname}`
        :
        `${remoteUrlOrigin}${pathname}`
}


export function getDiscordOAuthURL() {
    return isLocal() ?
        "https://discord.com/oauth2/authorize?client_id=1226955908991418510&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscordauth&scope=identify+guilds+email"
        :
        "https://discord.com/oauth2/authorize?client_id=1226955908991418510&response_type=code&redirect_uri=https%3A%2F%2Fdiscordlist.kolysis.com%2Fdiscordauth&scope=identify+guilds+email";
}
export function getDiscordOAuthPageURL() {
    return getURL('/discordauth');
}

export function getDiscordOAuthTokenViaSearch() {
    return getSearchParam("code");
}