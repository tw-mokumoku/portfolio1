import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { switchPrefersColorScheme } from '../../Function/ThemeController';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getDiscordOAuthURL } from '../../Function/LocalRemoteSwitcher';
import { CurrentDiscordUserIcon, getLogin } from '../../Function/APIController';
import { hasDiscordAccessTokenCookie, has_SessionManagerDiscordListUID } from '../../Function/OAuthController';
import { getLanguageLocalStorage, hasCurrentDiscordUserDataLocalStorage } from '../../Function/LocalStorageController';
import { useTranslation } from "react-i18next";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import './headerUnion.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from 'react-bootstrap/Modal';
import { checkLocalAndOAuth } from '../../Function/LoginController';
import { SearchBar } from '../parts/searchBar';
import Container from 'react-bootstrap/Container';
import { useWindowScroll } from 'react-use';

function MyVerticallyCenteredModal(props) {
    const { t, i18n } = useTranslation();
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('headerUnion.myVerticallyCenteredModal.changeLanguage')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SelectableRegionPanel {...props} />
            </Modal.Body>
        </Modal>
    );
}
export function HeaderUnion(props) {
    const { x, y } = useWindowScroll();
    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const [loginOffcanvasMenu, setLoginOffcanvasMenu] = useState(<></>);

    useEffect(() => {
        setLoginOffcanvasMenu(has_SessionManagerDiscordListUID() ?
            <OffcanvasMenu
                title={t('headerUnion.headerUnion.dashboard')}
                onClick={() => navigate('/dashboard')}
            />
            :
            <div className="offcanvas-menu-container">
                <div className="offcanvas-menu fs-5" onClick={() => window.location.replace(getDiscordOAuthURL())}>
                    {t('headerUnion.headerUnion.login')}
                </div>
            </div>
        )
    }, []);
    return (
        <Navbar expand="lg" sticky="top" style={{ boxShadow: y === 0 ? 'none': 'rgba(0, 0, 0, 0.25) 0px 0px 6px 2px' }}>
            <Container>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    {...props}
                />
                <div className="header-union-show-offcanvas p-2" onClick={() => setShow(true)}>
                    <MenuIcon />
                </div>
                <Navbar.Brand className="header-union-navbar-brand" href="/">
                    <div>
                        Discord List
                    </div>
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <div className="header-union-pc-view">
                        <HeaderItems {...props} />
                    </div>
                </Nav>
                <Offcanvas style={{ width: '15rem' }} show={show} onHide={() => setShow(false)}>
                    <Offcanvas.Body className="header-union-offcanvas-body">
                        {loginOffcanvasMenu}
                        <OffcanvasMenu
                            title={t('headerUnion.headerUnion.language')}
                            onClick={() => setModalShow(true)}
                        />
                        {/*
                        <OffcanvasMenu
                            title={t('headerUnion.headerUnion.ranking')}
                            onClick={() => navigate('/ranking')}
                        />
                        */}
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </Navbar>
    );
}

function OffcanvasMenu(props) {
    const navigate = useNavigate();
    return (
        <div className="offcanvas-menu-container">
            <div className="offcanvas-menu fs-5" onClick={props.onClick}>
                {props.title}
            </div>
        </div>
    );
}


function HeaderItems(props) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
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
        if (props.setDidSelectedRegionChange) props.setDidSelectedRegionChange(!props.didSelectedRegionChange);
    }

    useEffect(() => {
        setSelectedRegion(getLanguageLocalStorage());
        setLoading(false);
    }, []);

    return (
        <div className="d-flex align-items-center gap-4">
            {/*
            <Button className="p-1" href={'/ranking'}>
                <LeaderboardIcon />
            </Button>
            */}
            <div className="h-100">
                <select
                    className="header-union-region-select"
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
            <div className="header-login-tour">
            {
                has_SessionManagerDiscordListUID() ?
                    <Button className="p-2" href="/dashboard">
                        <CurrentDiscordUserIcon alt="" style={{ borderRadius: "30px", border: "2px solid lightblue", width: 40, height: 40 }} />
                    </Button>
                    :
                    <Button className="p-2 px-3" href={getDiscordOAuthURL()}>{t('headerUnion.headerUnion.login')}</Button>
            }
            </div>
        </div>
    );
}

function SelectableRegionPanel(props) {
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
        if (props.setDidSelectedRegionChange) props.setDidSelectedRegionChange(!props.didSelectedRegionChange);
    }

    useEffect(() => {
        setSelectedRegion(getLanguageLocalStorage());
        setLoading(false);
    }, []);    
    return (
        <div className="h-100">
            <select
                className="header-union-region-select"
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