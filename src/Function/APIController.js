import axios from 'axios';
import { getDiscordOAuthPageURL } from './LocalRemoteSwitcher';
import { getDiscordAccessTokenCookie, get_SessionManagerDiscordListUID, hasDiscordOAuthTokenCookie } from './OAuthController';
import { getCurrentDiscordUserDataLocalStorage, getMemberDataLocalStorage } from './LocalStorageController';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { checkLocalAndOAuth } from './LoginController';


const DiscordBaseURL = "https://discord.com/api";
const DiscordImageBaseURL = "https://cdn.discordapp.com/";
//const DislitBaseURL = "https://nfvdoa532a.execute-api.ap-northeast-1.amazonaws.com/InitialStage";
const DislitBaseURL = "https://xixj7gp1xl.execute-api.ap-northeast-1.amazonaws.com/InitialStage";

/***************************************************************/
/***************************************************************/
/**************************  dislist  **************************/
/***************************************************************/
/***************************************************************/
/*****************  dislist login  ********************/
////  GET
export async function getLogin(redirect_uri, code){
    return await axios.get(`${DislitBaseURL}/login?redirect_uri=${redirect_uri}&code=${code}`);
}
export async function getCheckLogin() {
    return await axios.get(`${DislitBaseURL}/login/check?_smdluid=${get_SessionManagerDiscordListUID()}`);
}


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
export async function getCountryRankingTag(country_id) {
    return await axios.get(`${DislitBaseURL}/country/${country_id}/ranking/tag`);
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
    return await axios.post(`${DislitBaseURL}/member/${member_id}?_smdluid=${get_SessionManagerDiscordListUID()}`);
}


/*****************  dislist server  ********************/
////  GET
export async function getSearch(query, country_id = "JP") {
    return await axios.get(
        `${DislitBaseURL}/search?${query.map((value) => `query=${value}`).join('&') }&country_id=${country_id}`
    );
}
export async function getRecommend(country_id = "JP") {
    return await axios.get(
        `${DislitBaseURL}/server/recommend?country_id=${country_id}`
    );
}
export async function getServer(server_id) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}`);
}
export async function getServerVCLogs(server_id, start_epoch, end_epoch) {
    return await axios.get(`${DislitBaseURL}/server/${server_id}/vc_log?start_epoch=${start_epoch}&end_epoch=${end_epoch}`);
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
export async function getServerRankingCountryUpdatedLog(country_id, limit, offset) {
    return await axios.get(`${DislitBaseURL}/server/ranking/${country_id}/updated_log?limit=${limit}&offset=${offset}`);
}

////  POST
export async function createServer(id, name) {
    var data = {
        id: `${id}`,
        name: `${name}`
    }

    return await axios.post(
        `${DislitBaseURL}/server?_smdluid=${get_SessionManagerDiscordListUID()}`,
        data
    );
}

////  PATCH
export async function updateServer({ id, name = null, invite_url = null, description = null, country_id = null, icon = null, is_public = null, added_tag_pairs = null, removed_tag_pairs = null}) {
    var data = {};
    if (name != null) data['name'] = name;
    if (invite_url != null) data['invite_url'] = invite_url;
    if (description != null) data['description'] = description;
    if (country_id != null) data['country_id'] = country_id;
    if (icon != null) data['icon'] = icon;
    if (is_public != null) data['is_public'] = is_public;
    data['updated_epoch'] = `${Math.floor(Date.now() / 1000)}`;
    if (added_tag_pairs != null) data['added_tag_pairs'] = added_tag_pairs;
    if (removed_tag_pairs != null) data['removed_tag_pairs'] = removed_tag_pairs;

    return await axios.patch(
        `${DislitBaseURL}/server/${id}?_smdluid=${get_SessionManagerDiscordListUID()}`,
        data
    );
}
export async function updateServerUpdatedLog(server_id) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/updated_log?_smdluid=${get_SessionManagerDiscordListUID()}`
    );
}
export async function updateServerCurrentActiveUsers(server_id, user_num) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/current_active_users?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            user_num: `${user_num}`
        }
    );
}
export async function incrementServerCurrentActiveUsers(server_id) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/current_active_users/increment`,
    );
}
export async function decrementServerCurrentActiveUsers(server_id) {
    return await axios.patch(
        `${DislitBaseURL}/server/${server_id}/current_active_users/increment`
    );
}

/*****************  dislist tag  ********************/
////  GET
export async function getTagServers(tag_name) {
    return await axios.get(`${DislitBaseURL}/tag/${tag_name}/servers`);
}
export async function getTagRankingCurrent(tag_name) { //�z��w��\
    return await axios.get(
        `${DislitBaseURL}/tag/ranking/current`,
        {
            tag_name: `${tag_name}`
        });
}
export async function getTagSuggests(country_id, value) {
    return await axios.get(`${DislitBaseURL}/tag/suggests?country_id=${country_id}&value=${value}`);
}
export async function getTagRankingCurrentServers(tag_name, limit, offset) {
    return await axios.get(
        `${DislitBaseURL}/tag/${tag_name}/ranking/current?limit=${limit}&offset=${offset}`,
    );
}

////  POST
export async function createTag(name, country_id) { // �񐄏�
    return await axios.post(
        `${DislitBaseURL}/tag?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            name: `${name}`,
            country_id: `${country_id}`
        }
    );
}


/*****************  dislist tag_pair  ********************/
////  POST
export async function createTagPair(server_id, tag_name) {
    return await axios.post(
        `${DislitBaseURL}/tag_pair?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            server_id: `${server_id}`,
            tag_name: `${tag_name}`
        }
    );
}

////  DELETE
export async function deleteTagPair(server_id, tag_name) {
    return await axios.delete(
        `${DislitBaseURL}/tag_pair?_smdluid=${get_SessionManagerDiscordListUID()}`,
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
        `${DislitBaseURL}/updated_log?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            server_id: `${server_id}`,
            updated_epoch: `${updated_epoch}`
        }
    );
}


/*****************  dislist vc_log  ********************/
////  POST
export async function createVCLog(server_id, member_id, start_epoch, interval_sec) {
    return await axios.post(
        `${DislitBaseURL}/updated_log?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            server_id: `${server_id}`,
            member_id: `${member_id}`,
            start_epoch: `${start_epoch}`,
            interval_sec: `${interval_sec}`,
        }
    );
}


/*****************  dislist member_pair  ********************/
////  POST
export async function deleteMemberPair(server_id, member_id) {
    return await axios.delete(
        `${DislitBaseURL}/member_pair?_smdluid=${get_SessionManagerDiscordListUID()}`,
        {
            server_id: `${server_id}`,
            member_id: `${member_id}`
        });
}

/*****************  dislist member_data  ********************/
export async function getMemberData() {
    return axios.get(
        `${DislitBaseURL}/member_data?_smdluid=${get_SessionManagerDiscordListUID()}`
    )
}
export async function getMemberDataGuilds() {
    return axios.get(
        `${DislitBaseURL}/member_data/guilds?_smdluid=${get_SessionManagerDiscordListUID()}`
    );
}




/***************************************************************/
/***************************************************************/
/**************************  Discord  **************************/
/***************************************************************/
/***************************************************************/
/*****************  img  ********************/
// Discord
export function getCurrentDiscordUserIconURL() {
    const userdata = getMemberDataLocalStorage();
    return `${DiscordImageBaseURL}avatars/${userdata.member_id}/${userdata.avatar}.png`;
}
export function CurrentDiscordUserIcon(props) {
    const [avatar, setAvatar] = useState(<></>);
    useEffect(() => {
        checkLocalAndOAuth()
            .then(() => {
                const userdata = getMemberDataLocalStorage();
                setAvatar(
                    userdata.avatar ?
                        <Avatar src={getCurrentDiscordUserIconURL()} {...props} />
                        :
                        <Avatar>{userdata.username.slice(0, 2)}</Avatar>
                )
            });
    }, []);
    return avatar;
}
export function getDiscordGuildIcon(guild_id, guild_icon) {
    return `${DiscordImageBaseURL}icons/${guild_id}/${guild_icon}.png?size=4096`;
}


/***************** string ********************/
// Discord
export function getCurrentDiscordUserName() {
    const userdata = getMemberDataLocalStorage();
    return userdata.username;
}
export function getCurrentDiscordUserGlobalName() {
    const userdata = getMemberDataLocalStorage();

    return userdata.global_name ? userdata.global_name : userdata.username;
}