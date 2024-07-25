/* react-bootstrap */
import './dashboard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { Navigate, useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { DashboardUserPanel } from '../Component/union/SectionUnion';
import { hasDiscordOAuthTokenCookie } from '../Function/OAuthController';
import { getDiscordGuildPreview, getDiscordGuildIcon, getServer } from '../Function/APIController';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

export function ServerView() {
    const params = useParams();
    const [serverIcon, setServerIcon] = useState(<></>);
    const [currentServerName, setCurrentServerName] = useState();
    const [serverID, setServerID] = useState("");
    const [currentServerDescription, setCurrentServerDescription] = useState();

    useEffect(() => {
        setServerID(params['id']);
        getServer(params['id'])
            .then((response) => {
                let currentServer = response.data;
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
                setCurrentServerName(currentServer['name']);
                setCurrentServerDescription(currentServer['description'])
        });
    }, [params]);

    return (
        <Container>
            <HeaderUnion />
            <Row className="mt-5">
                <Card className="mb-4">
                    <Card.Header>
                        <ViewServerHeader
                            serverIcon={serverIcon}
                            currentServerName={currentServerName}
                            serverID={serverID}
                        />
                    </Card.Header>
                    <Card.Body>
                        <ViesServerBody
                            currentServerDescription={currentServerDescription}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

function ViesServerBody(props) {
    return (
        <div>
            <p>{props.currentServerDescription}</p>
        </div>
    );
}

function ViewServerHeader(props) {
    return (
        <div className="d-flex flex-row mb-1">
            <div className="me-4">
                {props.serverIcon}
            </div>
            <div>
                <p className="fs-3 mb-0">{props.currentServerName}</p>
                <p className="fs-6">@{props.serverID}</p>
                <Button className="py-2 px-3">サーバーに参加</Button>
            </div>
        </div>
    );
}

