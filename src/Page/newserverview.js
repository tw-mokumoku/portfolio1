import { useEffect } from "react";
import { useState } from "react";
import { OverlayLoading } from "react-loading-randomizable";
import { HeaderUnion } from "../Component/union/headerUnion";
import './newserverview.css';
import Container from 'react-bootstrap/Container';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getDiscordGuildIcon, getServer, getServerCurrentActiveUsers, getServerTags, getServerUpdatedLog } from "../Function/APIController";
import { ToastContainer, toast } from 'react-toastify';
import { Avatar } from '@mui/material';
import { FirstEditCategory, ViewServerBody } from "../Component/union/viewServerBodyUnion";
import nl2br from 'react-newline-to-break'; 
import { ToButton } from "../Component/parts/conversion";
import { useNavigate } from "react-router-dom";

export function NewServerView() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const params = useParams();
    const [currentServerName, setCurrentServerName] = useState();
    const [currentServerDescription, setCurrentServerDescription] = useState();
    const [loading, setLoading] = useState(true);
    const [currentServer, setCurrentServer] = useState({});
    const [serverUpdatedLog, setServerUpdatedLog] = useState();
    const [serverCurrentUpdatedLog, setServerCurrentUpdatedLog] = useState();
    const [serverInviteURL, setServerInviteURL] = useState();
    const [guildTags, setGuildTags] = useState();
    const [isServerPublic, setIsServerPublic] = useState(false);

    useEffect(() => {
        const getServerPromise = getServer(params['id'])
            .then((response) => {
                if (response.data.id == null || response.data.country_id == null || response.data.invite_url == null) {
                    toast.error(
                        t('serverview.serverView.serverDataMissing')
                    );
                    setLoading(false);
                    return;
                }
                let currentServer = response.data;
                setCurrentServer(response.data);
                setIsServerPublic(currentServer['is_public'])
                // Set Current Server Name
                setCurrentServerName(currentServer['name']);
                // Set Current Server Description
                setCurrentServerDescription(currentServer['description']);
                setServerInviteURL(currentServer['invite_url']);
                const getServerUpdatedLogPromise = getServerUpdatedLog(params['id'])
                    .then((response) => {
                        setServerUpdatedLog(response.data);
                    });
                const getServerCurrentActiveUsersPromise = getServerCurrentActiveUsers(params['id'])
                    .then((response) => {
                        setServerCurrentUpdatedLog(response.data);
                    })

                // chart�p
                getServerTags(params['id']).then((response) => {
                    setGuildTags(response.data.map(value => value['name']));
                });
                setLoading(false);
            }).catch((response) => {
                setLoading(false);
                toast.error(
                    t('serverview.serverView.failedToGetServerData')
                );
                setLoading(false);
            });
    }, [params]);
    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion />
            <ToastContainer />
            <div className="new-server-view-bg-img">
                <img src={currentServer ? getDiscordGuildIcon(params['id'], currentServer.icon) : ""} className="w-100" alt=""></img>
            </div>
            <Container>
                <div className="new-server-view-main-info-bg">
                    <div className="new-server-view--container d-flex">
                        <div className="new-server-view-main-info-icon">
                            <img src={currentServer ? getDiscordGuildIcon(params['id'], currentServer.icon) : ""} className="h-100" alt=""></img>
                        </div>
                        <div className="new-server-view-main-info-container">
                            <div className="fs-3 fw-bold">{currentServerName}</div>
                            <div style={{ color: '#acb2b8' }}>@{params['id']}</div>
                            {isServerPublic ?
                                <div className="d-flex">
                                    <div className="new-server-view-tags py-2 px-4 mt-2" style={{ background: 'linear-gradient( to right, #75b022 5%, #588a1b 95%)' }} onClick={() => window.open(serverInviteURL)}>
                                        {t('serverview.serverView.joinServer')}
                                    </div>
                                </div>
                                :
                                <div className="d-flex">
                                    <div
                                        className="new-server-view-tags py-2 px-4 mt-2"
                                        style={{ background: 'linear-gradient( to right, #56606b 5%, #212529 95%)', cursor: 'default' }}
                                    >
                                        {t('serverview.serverView.serverNotPublic')}
                                    </div>
                                </div>
                            }
                            <div className="d-flex mt-2" style={{ flexWrap: 'wrap' }}>
                                {
                                    guildTags ?
                                        guildTags.map((tag_name, index) =>
                                            <div className="new-server-view-tags"
                                                key={index}
                                                onClick={() => navigate(`/tag/${tag_name}`)}
                                            >
                                                {tag_name}
                                            </div>
                                        )
                                    :<></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="new-server-view-space my-4 py-3"></div>
                <div className="new-server-view-narrow-header-container">
                    <div className="new-server-view-narrow-bg-img mb-3">
                        <img src={currentServer ? getDiscordGuildIcon(params['id'], currentServer.icon) : ""} className="w-100" alt=""></img>
                    </div>
                    <div className="fs-3 fw-bold">{currentServerName}</div>
                    <div style={{ color: '#acb2b8' }}>@{params['id']}</div>
                    <div className="d-flex mt-2" style={{ flexWrap: 'wrap' }}>
                        {
                            guildTags ?
                                guildTags.map((tag_name, index) =>
                                    <div className="new-server-view-tags"
                                        key={index}
                                        onClick={() => navigate(`/tag/${tag_name}`)}
                                    >
                                        {tag_name}
                                    </div>
                                )
                                : <></>
                        }
                    </div>
                    <div className="new-server-view-tags py-2 px-3 mt-4 mb-2" style={{ background: 'linear-gradient( to right, #75b022 5%, #588a1b 95%)' }} onClick={() => window.open(serverInviteURL)}>
                        サーバーに参加
                    </div>
                </div>
                <ViewServerBody
                    params={params}
                    currentServerDescription={nl2br(currentServerDescription)}
                    currentServer={currentServer}
                    serverUpdatedLog={serverUpdatedLog}
                    serverCurrentUpdatedLog={serverCurrentUpdatedLog}
                    guildTags={guildTags}
                    showTags={false}
                />
            </Container>
        </>
    );
}