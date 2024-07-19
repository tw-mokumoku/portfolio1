import axios from 'axios';
import { getDiscordOAuthPageURL } from './LocalRemoteSwitcher';
import { getDiscordAccessTokenCookie, hasDiscordOAuthTokenCookie } from './OAuthController';
import { getCurrentDiscordUserDataLocalStorage } from './LocalStorageController';
import { Avatar } from '@mui/material';


const DiscordBaseURL = "https://discord.com/api";
const DiscordImageBaseURL = "https://cdn.discordapp.com/";



/*****************  Axios  ********************/
export async function postDiscordAuthentication(token) {
    /* axios.post(url[, data[, config]]) */
    return await axios.post(
        'https://discordapp.com/api/oauth2/token',
        {
            'client_id': '1226955908991418510',
            'client_secret': 'cNpdt3Qz4AhZEZpjd-5CcSvsIZM8oylZ',
            'grant_type': 'authorization_code',
            'code': token,
            'redirect_uri': getDiscordOAuthPageURL()
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
}
async function getDiscordAPI(API_ENDPOINT) {
    if (!hasDiscordOAuthTokenCookie()) return;
    return await axios.get(API_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${getDiscordAccessTokenCookie()}`
        }
    });
}

/*****************  data  ********************/
export async function getDiscordUser(user_id) {
    return getDiscordAPI((DiscordBaseURL + `/users/${user_id}`));
}
export async function getCurrentDiscordUser() {
    return getDiscordUser('@me');
}
export async function getCurrentUserGuilds() {
    return getDiscordAPI((DiscordBaseURL + `/users/@me/guilds`));
}

/*****************  img  ********************/
export function getCurrentDiscordUserIconURL() {
    const userdata = getCurrentDiscordUserDataLocalStorage();
    return `${DiscordImageBaseURL}avatars/${userdata.id}/${userdata.avatar}.png`;
}
export function CurrentDiscordUserIcon(props) {
    const userdata = getCurrentDiscordUserDataLocalStorage();
    return userdata.avatar ?
        <Avatar src={getCurrentDiscordUserIconURL()} {...props} />
        :
        <Avatar>{userdata.username.slice(0, 2)}</Avatar>;
}
export function getDiscordGuildIcon(guild_id, guild_icon) {
    return `${DiscordImageBaseURL}icons/${guild_id}/${guild_icon}.png`;
}


/***************** string ********************/
export function getCurrentDiscordUserName() {
    const userdata = getCurrentDiscordUserDataLocalStorage();
    return userdata.username;
}
export function getCurrentDiscordUserGlobalName() {
    const userdata = getCurrentDiscordUserDataLocalStorage();

    return userdata.global_name ? userdata.global_name : userdata.username;
}