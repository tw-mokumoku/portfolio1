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
import { hasCurrentDiscordUserDataLocalStorage } from '../../Function/LocalStorageController';
import { useTranslation } from "react-i18next";

export function HeaderUnion() {
    const { t } = useTranslation();
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