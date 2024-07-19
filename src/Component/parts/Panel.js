import { Avatar } from '@mui/material';
import Col from 'react-bootstrap/Col';
import { getDiscordGuildIcon } from '../../Function/APIController';
import { faker } from '@faker-js/faker';
import { ServerPanelButtons } from './Button';

export function ServerPanel(props) {
    console.log(props.id);
    return (
        <Col>
            <div className="sp-container mb-3">
                <img src={getDiscordGuildIcon(props.id, props.icon)} className="sp-background" alt=""></img>
                <Avatar src={getDiscordGuildIcon(props.id, props.icon)} sx={{ width: 80, height: 80 }} className="sp-icon" alt={props.name}></Avatar>
            </div>
            <div className="mb-5">
                <p className="fs-6 fw-bold mb-4 ms-1">{props.name}</p>
                <ServerPanelButtons addedServer={faker.datatype.boolean()} />
            </div>
        </Col>
    );
}