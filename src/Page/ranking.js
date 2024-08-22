import { useState } from "react";
import { useEffect } from "react";
import { OverlayLoading } from "react-loading-randomizable";
import Container from 'react-bootstrap/Container';
import { HeaderUnion } from "../Component/union/headerUnion";

export function Ranking(props) {
    const [loading, setLoading] = useState(true);
    const [didSelectedRegionChange, setDidSelectedRegionChange] = useState(false);

    useEffect(() => {
        setLoading(false);
        setDidSelectedRegionChange(false);
    }, []);

    useEffect(() => {
        if (didSelectedRegionChange === false) return;
        setDidSelectedRegionChange(false);
    }, [didSelectedRegionChange]);

    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion setDidSelectedRegionChange={setDidSelectedRegionChange} />
            <Container>
            </Container>
        </>
    );
}