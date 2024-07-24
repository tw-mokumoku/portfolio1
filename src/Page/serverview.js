/* react-bootstrap */
import { HeaderUnion } from '../Component/union/headerUnion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css';
import { Navigate } from "react-router-dom";
import { hasDiscordOAuthTokenCookie } from '../Function/OAuthController';
import { DashboardUserPanel } from '../Component/union/SectionUnion';
export function ServerView() {
    if (!hasDiscordOAuthTokenCookie()) return <Navigate to="/" />
    return (
        <Container>
            <HeaderUnion />
            <Row className="mt-5">
                <Col xl={3}>
                    <DashboardUserPanel />
                </Col>
                <Col xl={9}>
                </Col>
            </Row>
        </Container>
    );
}