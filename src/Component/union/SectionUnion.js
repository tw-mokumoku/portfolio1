/* faker-js */
import { fakerJA as faker } from '@faker-js/faker';
/* react-bootstrap */
import { OpenableOverflowContainer, toButton } from '../parts/conversion';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { SimpleButton } from '../parts/Button';
import { useEffect, useState } from 'react';
import { CurrentDiscordUserIcon, getCurrentDiscordUserGlobalName } from '../../Function/APIController';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import { disconnectViaDiscordAccount } from '../../Function/LoginController';
import { useNavigate } from "react-router-dom";

export function TagListSection() {
    const tagButtons = toButton(faker.word.words(100).split(' ').map((v) => `${v} (${faker.number.int(100000)})`));

    return (
        <>
            <div className="d-flex justify-content-center">
                <h5>
                    人気タグ一覧
                </h5>
            </div>
            <OpenableOverflowContainer>
                {tagButtons}
            </OpenableOverflowContainer>
        </>
    );
}

export function GuildCardContainer(props) {
    return (
        <Row xs={1} md={2} xl={3} className="mt-5 gx-0">
            {props.children}
        </Row>
    );
}

export function DashboardUserPanel() {
    const navigate = useNavigate();
    const [globalName, setGlobalName] = useState("");
    const [userIcon, setUserIcon] = useState(<></>);
    useEffect(() => {
        setGlobalName(getCurrentDiscordUserGlobalName());
        setUserIcon(
            <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 60, height: 60 }} />
        );
    }, []);
    return (
        <Card className="mb-5">
            <Card.Header className="d-flex align-items-center">
                <div className="me-3">
                    {userIcon}
                </div>
                <h4>
                    {globalName}
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
                        icon={<SettingsTwoToneIcon style={{ fill: "#cecece" }} />}
                        title="Settings"
                    />
                    <SimpleButton
                        icon={<LogoutIcon style={{ fill: "#ff6666" }} />}
                        title="Logout"
                        onClick={() => {
                            disconnectViaDiscordAccount();
                            navigate('/');

                        }}
                    />
                </Stack>
            </Card.Body>
        </Card>
    );
}