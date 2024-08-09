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

export function HeaderUnion() {
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
                    {/*
                    <Col xs="auto" className="d-flex">
                        <Button className="p-3" onClick={() => {
                            switchPrefersColorScheme();
                                window.location.reload();
                        }}>
                            <LightModeIcon height="40" width="40"/>
                        </Button>
                    </Col>
                    */}
                    <Col xs="auto">
                        {
                            hasDiscordAccessTokenCookie() ?
                                <Button className="p-2" href="/dashboard">
                                        <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 40, height: 40 }} />
                                </Button>
                                :
                                <Button href={getDiscordOAuthURL()}>ログイン</Button>
                        }
                    </Col>
                    </Row>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}