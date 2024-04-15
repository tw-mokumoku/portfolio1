/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { CurrentDiscordUserIcon, getCurrentDiscordUserGlobalName, getDiscordGuildIcon } from '../Function/APIController';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import './dashboard.css';
import { getCurrentDiscordUserOwnerGuildsLocalStorage } from '../Function/LocalStorageController';
import { Avatar } from '@mui/material';


export function DashBoard() {
    return (
        <Container>
            <HeaderUnion />
            <Row className="mt-5">
                <Col xl={4}>
                    <Card>
                        <Card.Header className="d-flex align-items-center">
                            <div className="me-3">
                                <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 60, height: 60 }} />
                            </div>
                            <h4>
                                {getCurrentDiscordUserGlobalName()}
                            </h4>
                        </Card.Header>
                        <Card.Body className="px-3 pb-3">
                            <Stack>
                                <h5
                                    className="mb-3 fs-5"
                                    style={{ marginLeft: "10px" }}
                                >
                                    General
                                </h5>
                                <SimpleButton
                                    icon={<InfoTwoToneIcon />}
                                    title="Overview"
                                />
                                <SimpleButton
                                    icon={<SettingsTwoToneIcon />}
                                    title="Settings"
                                />
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={8}>
                    <div className="">
                        <p className="fs-2">ディスコード サーバー</p>
                        <Row xs={1} md={3} xl={3}>
                            {
                                getCurrentDiscordUserOwnerGuildsLocalStorage().map((value, key) => {
                                    return <ServerPanel
                                        key={key}
                                        id={value.id}
                                        name={value.name}
                                        icon={value.icon}
                                    />
                                })
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export function ServerPanel(props) {
    return (
        <Col>
            <div className="sp-container mb-3">
                <img src={getDiscordGuildIcon(props.id, props.icon)} className="sp-background" alt=""></img>
                <Avatar src={getDiscordGuildIcon(props.id, props.icon)} sx={{ width: 80, height: 80 }} className="sp-icon" alt={props.name}></Avatar>
            </div>
            <div className="mb-5">
                <p className="fs-6 fw-bold mb-4">{props.name}</p>
                <Button className="py-2 w-100" style={{ borderRadius: "10px" }}>Add to Discord list</Button>
            </div>
        </Col>
    );
}

export function SimpleButton(props) {
    return (
        <button className="simple-bt" onClick={props.onClick}>
            {props.icon}
            <p>{props.title}</p>
        </button>
    );
}

