import axios from 'axios';
import { getDiscordOAuthPageURL } from './LocalRemoteSwitcher';
import { getDiscordAccessTokenCookie, hasDiscordOAuthTokenCookie } from './OAuthController';
import { getCurrentDiscordUserDataLocalStorage } from './LocalStorageController';
import { Avatar } from '@mui/material';


const DiscordBaseURL = "https://discord.com/api";
const DiscordImageBaseURL = "https://cdn.discordapp.com/";

const DislitBaseURL = "https://nfvdoa532a.execute-api.ap-northeast-1.amazonaws.com/InitialStage";


/***************************************************************/
/***************************************************************/
/**************************  dislist  **************************/
/***************************************************************/
/***************************************************************/
/*****************  dislist country  ********************/
////  GET
export async function getCountryServers(country_id) {
    return await axios.get(`${DislitBaseURL}/country/${country_id}/servers`);
}
export async function getCountryTags(country_id) {
    return await axios.get(`${DislitBaseURL}/country/${country_id}/tags`);
}
export async function getCountryRankingCurrent(country_id) {
    return await axios.get(`${DislitBaseURL}/country/${country_id}/ranking/current`);
}


/*****************  dislist member  ********************/
////  GET
export async function getMemberServers(member_id) {
    return await axios.get(`${DislitBaseURL}/member/${member_id}/servers`);
}
export async function getMemberVCLogs(member_id) {
    return await axios.get(`${DislitBaseURL}/member/${member_id}/vc_logs`);
}
export async function getMember(member_id) {
    return await axios.get(`${DislitBaseURL}/member/${member_id}`);
}

////  POST
export async function createMember(member_id) {
    return await axios.post(`${DislitBaseURL}/member/${member_id}`);
}


/*****************  dislist server  ********************/
////  GET
export async function getServer(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}`);
}
export async function getServerVCLogs(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/vc_log`);
}
export async function getServerUpdatedLog(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/updated_log`);
}
export async function getServerTags(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/tags`);
}
export async function getServerMembers(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/members`);
}
export async function getServerCurrentActiveUsers(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/current_active_users`);
}

////  POST
export async function createServer(id, name) {
    var data = {
        id: `${id}`,
        name: `${name}`
    }

    return await axios.post(`${DislitBaseURL}/server`, data);
}

////  PATCH
export async function updateServer({ id, name = null, country_id = null, invite_url = null, description = null }) {
    var data = {};
    if (name) data['name'] = name;
    if (country_id) data['country_id'] = country_id;
    if (invite_url) data['invite_url'] = invite_url;
    if (description) data['description'] = description;

    return await axios.patch(`${DislitBaseURL}/server/${id}`, data);
}
export async function updateServerUpdatedLog(server_id, updated_epoch) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/updated_log`,
        {
            updated_epoch: `${updated_epoch}`
        });
}
export async function updateServerCurrentActiveUsers(server_id, user_num) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/current_active_users`,
        {
            user_num: `${user_num}`
        });
}
export async function incrementServerCurrentActiveUsers(server_id) {
    return await axios.patch(`${DislitBaseURL}/server/${server_id}/current_active_users/increment`);
}
export async function decrementServerCurrentActiveUsers(server_id) {
    return await axios.patch(`${DislitBaseURL}/server/${server_id}/current_active_users/increment`);
}

/*****************  dislist tag  ********************/
////  GET
export async function getTagServers(tag_name) {
    return await axios.get(`${DislitBaseURL}/tag/${tag_name}/servers`);
}
export async function getTagRankingCurrent(tag_name) { //îzóÒéwíËâ¬î\
    return await axios.get(
        `${DislitBaseURL}/tag/ranking/current`,
        {
            tag_name: `${tag_name}`
        });
}
export async function getTagSuggests(country_id, value) {
    return await axios.get(`${DislitBaseURL}/tag/suggests?country_id=${country_id}&value=${value}`);
}


////  POST
export async function createTag(name, country_id) { // îÒêÑèß
    return await axios.post(
        `${DislitBaseURL}/tag`,
        {
            name: `${name}`,
            country_id: `${country_id}`
        });
}


/*****************  dislist tag_pair  ********************/
////  POST
export async function createTagPair(server_id, tag_name) {
    return await axios.post(
        `${DislitBaseURL}/tag_pair`,
        {
            server_id: `${server_id}`,
            tag_name: `${tag_name}`
        });
}

////  DELETE
export async function deleteTagPair(server_id, tag_name) {
    return await axios.delete(
        `${DislitBaseURL}/tag_pair`,
        {
            data: {
                server_id: `${server_id}`,
                tag_name: `${tag_name}`
            }
        }
    );
}


/*****************  dislist updated_log  ********************/
////  POST
export async function createUpdatedLog(server_id, updated_epoch) {
    return await axios.post(
        `${DislitBaseURL}/updated_log`,
        {
            server_id: `${server_id}`,
            updated_epoch: `${updated_epoch}`
        });
}


/*****************  dislist vc_log  ********************/
////  POST
export async function createVCLog(server_id, member_id, start_epoch, interval_sec) {
    return await axios.post(
        `${DislitBaseURL}/updated_log`,
        {
            server_id: `${server_id}`,
            member_id: `${member_id}`,
            start_epoch: `${start_epoch}`,
            interval_sec: `${interval_sec}`,
        });
}


/*****************  dislist member_pair  ********************/
////  POST
export async function deleteMemberPair(server_id, member_id) {
    return await axios.delete(
        `${DislitBaseURL}/member_pair`,
        {
            server_id: `${server_id}`,
            member_id: `${member_id}`
        });
}




/***************************************************************/
/***************************************************************/
/**************************  Discord  **************************/
/***************************************************************/
/***************************************************************/

/*****************  Axios  ********************/
// Discord
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
// Discord
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
// Discord
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
// Discord
export function getCurrentDiscordUserName() {
    const userdata = getCurrentDiscordUserDataLocalStorage();
    return userdata.username;
}
export function getCurrentDiscordUserGlobalName() {
    const userdata = getCurrentDiscordUserDataLocalStorage();

    return userdata.global_name ? userdata.global_name : userdata.username;
}