import { Avatar } from '@mui/material';
import Col from 'react-bootstrap/Col';
import { getDiscordGuildIcon, getServer } from '../../Function/APIController';
import { ServerPanelButtons } from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

export function ServerPanel(props) {
    const [isServerAdded, setIsServerAdded] = useState(false);
    useEffect(() => {
        getServer(props.id).then((response) => {
            setIsServerAdded(response.data['is_bot_available'])
        })
    }, []);

    return (
        <Col>
            <div className="dashboard-server-container-tour">
                <div className="sp-container mb-3">
                    <img src={getDiscordGuildIcon(props.id, props.icon)} className="sp-background" alt=""></img>
                    <Avatar src={getDiscordGuildIcon(props.id, props.icon)} sx={{ width: 80, height: 80 }} className="sp-icon" alt={props.name}></Avatar>
                </div>
                <div className="mb-5">
                    <p className="fs-6 fw-bold mb-4 ms-1">{props.name}</p>
                    <ServerPanelButtons
                        addedServer={isServerAdded}
                        server_id={props.id}
                        toastError={props.toastError}
                        toastSuccess={props.toastSuccess} />
                </div>
            </div>
        </Col>
    );
}