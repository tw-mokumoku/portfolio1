import { Avatar } from '@mui/material';
import Col from 'react-bootstrap/Col';
import { getDiscordGuildIcon, getServer } from '../../Function/APIController';
import { faker } from '@faker-js/faker';
import { ServerPanelButtons } from './Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentDislistUserOwningServersLocalStorage } from '../../Function/LocalStorageController';

export function ServerPanel(props) {
    const [isServerAdded, setIsServerAdded] = useState(false);
    useEffect(() => {
        const currentDislistUserOwningServers = getCurrentDislistUserOwningServersLocalStorage();
        if (currentDislistUserOwningServers.length === 0) return;
        console.log("gcduosls", currentDislistUserOwningServers);
        for (let i = 0; i < currentDislistUserOwningServers.length; i++) {
            if (currentDislistUserOwningServers[i]['id'] === props.id) setIsServerAdded(true);
        }
    }, []);

    return (
        <Col>
            <div className="sp-container mb-3">
                <img src={getDiscordGuildIcon(props.id, props.icon)} className="sp-background" alt=""></img>
                <Avatar src={getDiscordGuildIcon(props.id, props.icon)} sx={{ width: 80, height: 80 }} className="sp-icon" alt={props.name}></Avatar>
            </div>
            <div className="mb-5">
                <p className="fs-6 fw-bold mb-4 ms-1">{props.name}</p>
                <ServerPanelButtons addedServer={isServerAdded} server_id={props.id} />
            </div>
        </Col>
    );
}