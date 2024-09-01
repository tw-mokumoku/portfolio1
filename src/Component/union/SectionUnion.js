/* faker-js */
import { fakerJA as faker } from '@faker-js/faker';
/* react-bootstrap */
import { OpenableOverflowContainer, TagButton, toButton, toTagButton } from '../parts/conversion';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { SimpleButton } from '../parts/Button';
import { useEffect, useState } from 'react';
import { CurrentDiscordUserIcon, getCountryRankingTag, getCurrentDiscordUserGlobalName } from '../../Function/APIController';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import { checkLocalAndOAuth, disconnectViaDiscord, disconnectVisDislist } from '../../Function/LoginController';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLanguageLocalStorage, getMemberDataLocalStorage } from '../../Function/LocalStorageController';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export function TagListSection(props) {
    const { t } = useTranslation();
    const [tagButtons, setTagButtons] = useState(<></>);
    const getCountryRankingTagFunction = () => {
        getCountryRankingTag(getLanguageLocalStorage())
            .then((response) => {
                if (response.data == null || response.data.length == 0) {
                    setTagButtons([]);
                    return;
                }
                setTagButtons(
                    response.data.map((value, key) => {
                        return <TagButton key={key} tagName={value['name']} />
                    })
                );
            });
    }
    useEffect(() => {
        getCountryRankingTagFunction();
    }, []);
    useEffect(() => {
        if (props.didSelectedRegionChange === false) return;
        getCountryRankingTagFunction();
    }, [props.didSelectedRegionChange]);
    return (
        <div className="popular-tour">
            <div className="d-flex justify-content-center">
                <h5>
                    {t('sectionUnion.tagListSection.title')}
                </h5>
            </div>
            <OpenableOverflowContainer>
                {tagButtons}
            </OpenableOverflowContainer>
        </div>
    );
}

export function GuildCardContainer(props) {
    return (
        <Row xs={1} md={2} xl={3} className="mt-2 g-3">
            {props.children}
        </Row>
    );
}

export function DashboardUserPanel() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [globalName, setGlobalName] = useState("");
    const [userIcon, setUserIcon] = useState(<></>);
    useEffect(() => {
        checkLocalAndOAuth()
            .then(() => {
                setGlobalName(getCurrentDiscordUserGlobalName());
                setUserIcon(
                    <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 60, height: 60 }} />
                );
            });
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
                        {t('sectionUnion.dashboardUserPanel.general')}
                    </h5>
                    {/*
                    <SimpleButton
                        icon={<PersonSearchIcon style={{ fill: "#add7e6" }} />}
                        title={t('sectionUnion.dashboardUserPanel.profile')}
                        onClick={() => {
                            navigate('/profile')
                        }}
                    />
                    */}
                    <SimpleButton
                        icon={<InfoTwoToneIcon style={{ fill: "#cdade6" }} />}
                        title={t('sectionUnion.dashboardUserPanel.dashboard')}
                        onClick={() => {
                            navigate('/dashboard')
                        }}
                    />
                    <SimpleButton
                        icon={<SettingsTwoToneIcon style={{ fill: "#cecece" }} />}
                        title={t('sectionUnion.dashboardUserPanel.setting')}
                        onClick={() => {
                            navigate('/setting')
                        }}
                    />
                    <SimpleButton
                        icon={<LogoutIcon style={{ fill: "#ff6666" }} />}
                        title={t('sectionUnion.dashboardUserPanel.logout')}
                        onClick={() => {
                            disconnectViaDiscord();
                            navigate('/');
                        }}
                    />
                </Stack>
            </Card.Body>
        </Card>
    );
}