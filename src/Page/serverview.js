/* react-bootstrap */
import './serverview.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { getDiscordGuildIcon, getServer, getServerCurrentActiveUsers, getServerTags, getServerUpdatedLog } from '../Function/APIController';
import { useEffect, useState } from 'react';
import { OverlayLoading } from "react-loading-randomizable";
import { ViewServerHeader } from '../Component/union/viewServerHeaderUnion';
import { ViewServerBody } from '../Component/union/viewServerBodyUnion';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import nl2br from 'react-newline-to-break'; 

export function ServerView() {
    const { t } = useTranslation();
    const params = useParams();
    const [serverIcon, setServerIcon] = useState(<></>);
    const [currentServerName, setCurrentServerName] = useState();
    const [serverID, setServerID] = useState("");
    const [currentServerDescription, setCurrentServerDescription] = useState();
    const [loading, setLoading] = useState(true);
    const [currentServer, setCurrentServer] = useState({});
    const [serverUpdatedLog, setServerUpdatedLog] = useState();
    const [serverCurrentUpdatedLog, setServerCurrentUpdatedLog] = useState();
    const [serverInviteURL, setServerInviteURL] = useState();
    const [guildTags, setGuildTags] = useState();

    useEffect(() => {
        setServerID(params['id']);
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
                const avatarStyle = { borderRadius: "100px", border: "2px solid lightblue", width: 120, height: 120 };
                // Sever Icon
                if (!currentServer['icon']) {
                    setServerIcon(
                        <Avatar
                            style={avatarStyle}
                        >
                            {currentServer['name'].slice(0, 2)}
                        </Avatar>
                    );
                } else {
                    setServerIcon(
                        <Avatar
                            src={
                                getDiscordGuildIcon(params['id'], currentServer['icon'])
                            }
                            style={avatarStyle}
                        />
                    );
                }
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

                // chart—p
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
            <ToastContainer />
            <HeaderUnion />
            <Container>
                <Row className="mt-5">
                    <Card className="mb-4">
                        <Card.Header>
                            <ViewServerHeader
                                serverIcon={serverIcon}
                                currentServerName={currentServerName}
                                serverID={serverID}
                                serverInviteURL={serverInviteURL}
                            />
                        </Card.Header>
                        <Card.Body>
                            <ViewServerBody
                                params={params}
                                currentServerDescription={nl2br(currentServerDescription)}
                                currentServer={currentServer}
                                serverUpdatedLog={serverUpdatedLog}
                                serverCurrentUpdatedLog={serverCurrentUpdatedLog}
                                guildTags={guildTags}
                            />
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    );
}