import { HeaderUnion } from "../Component/union/headerUnion";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { useEffect, useState } from "react";
import { OverlayLoading } from "react-loading-randomizable";

export function Profile() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion />
            <Container>
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9}>

                    </Col>
                </Row>
            </Container>
        </>
    );
}