import { OverlayLoading } from "react-loading-randomizable";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { HeaderUnion } from "../Component/union/headerUnion";
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { useTranslation } from "react-i18next";
import { getLanguageLocalStorage } from "../Function/LocalStorageController";

export function Setting() {
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
    }

    useEffect(() => {
        setSelectedRegion(getLanguageLocalStorage());
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
                        <p className="fs-2">{t('setting.setting.settingTitle')}</p>
                        <Card style={{ minHeight: "60vh" }}>
                            <Card.Body>
                                <EditCategory
                                    title={t('serveredit.serverEdit.language')}
                                >
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
                                </EditCategory>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
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