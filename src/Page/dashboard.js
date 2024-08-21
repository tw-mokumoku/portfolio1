/* react-bootstrap */
import { HeaderUnion } from '../Component/union/headerUnion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { Navigate } from "react-router-dom";
import { ServerPanel } from '../Component/parts/Panel';
import { hasDiscordOAuthTokenCookie } from '../Function/OAuthController';
import { DashboardUserPanel } from '../Component/union/SectionUnion';
import { useEffect } from 'react';
import { getCurrentUserGuilds } from '../Function/APIController';
import { useState } from 'react';
import { OverlayLoading } from "react-loading-randomizable";
import { useTranslation } from "react-i18next";

export function DashBoard() {
    const { t } = useTranslation();
    const [serverPanels, setServerPanels] = useState(<></>)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!hasDiscordOAuthTokenCookie()) return;
        getCurrentUserGuilds()
            .then((response) => {
                setServerPanels(
                    response.data.filter(value => value.owner).map((value, key) => {
                        return <ServerPanel
                            key={key}
                            id={value.id}
                            name={value.name}
                            icon={value.icon}
                        />
                    })
                );
                setLoading(false);
            })
    }, []);
    window.history.replaceState('', '', '/dashboard');
    if (!hasDiscordOAuthTokenCookie()) return <Navigate to="/" />

    return (
        <>
            <OverlayLoading active={loading} />
            <Container>
                <HeaderUnion />
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9}>
                        <p className="fs-2">{t('dashboard.dashboard.dashboardTitle')}</p>
                        <Row xs={1} md={2} xl={3}>
                            {serverPanels}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
