/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { getCurrentDiscordUserOwnerGuildsLocalStorage } from '../Function/LocalStorageController';
import { Navigate } from "react-router-dom";
import { ServerPanel } from '../Component/parts/Panel';
import { hasDiscordOAuthTokenCookie } from '../Function/OAuthController';
import { DashboardUserPanel } from '../Component/union/SectionUnion';


export function DashBoard() {
    if (!hasDiscordOAuthTokenCookie()) {
        return <Navigate to="/" />
    }
    return (
        <Container>
            <HeaderUnion />
            <Row className="mt-5">
                <Col xl={3}>
                    <DashboardUserPanel />
                </Col>
                <Col xl={9}>
                    <p className="fs-2">ディスコード サーバー</p>
                    <Row xs={1} md={3} xl={3}>
                        {getCurrentDiscordUserOwnerGuildsLocalStorage().map((value, key) => {
                            return <ServerPanel
                                key={key}
                                id={value.id}
                                name={value.name}
                                icon={value.icon}
                            />
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
