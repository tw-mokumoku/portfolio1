import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { switchPrefersColorScheme } from '../../Function/ThemeController';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getDiscordOAuthURL } from '../../Function/LocalRemoteSwitcher';
import { CurrentDiscordUserIcon } from '../../Function/APIController';
import { hasDiscordAccessTokenCookie } from '../../Function/OAuthController';
import { getLanguageLocalStorage, hasCurrentDiscordUserDataLocalStorage } from '../../Function/LocalStorageController';
import { useTranslation } from "react-i18next";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function HeaderUnion() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState("");

    const onRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        if (event.target.value == "JP") i18n.changeLanguage("ja");
        if (event.target.value == "US") i18n.changeLanguage("en-US");
        if (event.target.value == "KR") i18n.changeLanguage("ko");
        if (event.target.value == "CN") i18n.changeLanguage("cn");
        if (event.target.value == "ES") i18n.changeLanguage("es");
        if (event.target.value == "FR") i18n.changeLanguage("fr");
        window.location.reload();
    }

    useEffect(() => {
        setSelectedRegion(getLanguageLocalStorage());
        setLoading(false);
    }, []);
    return (
        <Navbar expand="lg" sticky="top">
            <Navbar.Brand href="/">
                Discord List
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="align-items-end">
                <Nav variant="underline" className="me-auto" style={{ marginBottom: "2px" }} >
                    {/*
                    <Nav.Link href="/search">詳細検索</Nav.Link>
                    */}
                </Nav>
                <Nav>
                    <Row>
                        <Col>
                            <div className="w-100 h-100 d-flex align-items-center">
                                <select
                                    className="server-edit-region-select"
                                    value={selectedRegion}
                                    onChange={onRegionChange}
                                >
                                    <option value="JP">{t('serveredit.serverEdit.jp')}</option>
                                    <option value="US">{t('serveredit.serverEdit.us')}</option>
                                    <option value="KR">{t('serveredit.serverEdit.ko')}</option>
                                    <option value="CN">{t('serveredit.serverEdit.cn')}</option>
                                    <option value="ES">{t('serveredit.serverEdit.es')}</option>
                                    <option value="FR">{t('serveredit.serverEdit.fr')}</option>
                                </select>
                            </div>
                        </Col>

                        <Col xs="auto">
                            <div className="header-login-tour">
                            {
                                hasDiscordAccessTokenCookie() ?
                                    <Button className="p-2" href="/dashboard">
                                            <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 40, height: 40 }} />
                                    </Button>
                                    :
                                    <Button href={getDiscordOAuthURL()}>{t('headerUnion.headerUnion.login')}</Button>
                            }
                            </div>
                        </Col>
                    </Row>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function EditCategory(props) {
    return (
        <div className="edit-category mb-4">
            <div
                className="mb-2 fs-6"
            >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}