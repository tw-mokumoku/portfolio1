/* react-bootstrap */
import { HeaderUnion } from '../Component/union/headerUnion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { Navigate } from "react-router-dom";
import { ServerPanel } from '../Component/parts/Panel';
import { hasDiscordOAuthTokenCookie, has_SessionManagerDiscordListUID } from '../Function/OAuthController';
import { DashboardUserPanel } from '../Component/union/SectionUnion';
import { useEffect } from 'react';
import { getCurrentUserGuilds, getMemberDataGuilds } from '../Function/APIController';
import { useState } from 'react';
import { OverlayLoading } from "react-loading-randomizable";
import { useTranslation } from "react-i18next";
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { hasDashboardAfterInviteTourLocalStorage, setDashboardAfterInviteTourLocalStorage, setHomeTourFlagLocalStorage } from '../Function/LocalStorageController';

export function DashBoard() {
    const { t } = useTranslation();
    const [serverPanels, setServerPanels] = useState(<></>)
    const [loading, setLoading] = useState(true);
    const [afterInviteRunning, setAfterInviteRunning] = useState(false);


    const afterInviteSteps = [
        {
            target: '.dashboard-server-container-tour',
            content: t('dashboard.dashboard.serverContainerTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
            },
            disableBeacon: true,
            disableOverlayClose: true,
            placement: 'auto',
            spotlightClicks: true,
        },
        {
            target: '.server-panel-button-edit-tour',
            content: t('dashboard.dashboard.serverPanelButtonEditTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
        {
            target: '.server-panel-button-view-tour',
            content: t('dashboard.dashboard.serverPanelButtonViewTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, origin, status, type } = data;

        if ([EVENTS.TOUR_END].includes(type)) {
            setDashboardAfterInviteTourLocalStorage();
        }
    }

    useEffect(() => {
        if (!has_SessionManagerDiscordListUID()) return;
        getMemberDataGuilds()
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
                if (!hasDashboardAfterInviteTourLocalStorage()) setAfterInviteRunning(true);
                setLoading(false);
            })
    }, []);
    window.history.replaceState('', '', '/dashboard');
    if (!has_SessionManagerDiscordListUID()) return <Navigate to="/" />

    return (
        <>
            <OverlayLoading active={loading} />
            <Joyride
                continuous
                hideCloseButton
                run={afterInviteRunning}
                scrollToFirstStep
                showProgress
                showSkipButton
                steps={afterInviteSteps}
                spotlightClicks
                scrollOffset={200}
                styles={{
                    options: {
                        zIndex: 10000
                    }
                }}
                callback={handleJoyrideCallback}
            />
            <HeaderUnion />
            <Container>
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
