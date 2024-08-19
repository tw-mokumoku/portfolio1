/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { SearchBar } from './searchBar';
import { useTranslation } from "react-i18next";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './bigSection.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import nl2br from 'react-newline-to-break';

/*
export function BigTitle() {
    const { t } = useTranslation();
    // DiscordListへようこそ
    return (
        <Container className="d-flex my-5">
            <Stack className="justify-content-center align-items-center my-5">
                <h1 className="p-2">{t('bigSection.bigTitle.title')}</h1>
                <p className="p-2 fs-6">{t('bigSection.bigTitle.subtitle')}</p>
            </Stack>
        </Container>
    );
    // <SearchBar />
}
*/
export function BigTitle(props) {
    return (
        <>
            <Container>
                <RecommendPanel {...props} />
                <div className="d-flex justify-content-center align-items-center mb-5">
                    <SearchBar />
                </div>
            </Container>
        </>
    );
    /*
                        <Avatar src={getDiscordGuildIcon(props.id, props.icon)} sx={{ width: 80, height: 80 }} className="sp-icon" alt={props.name}></Avatar>
                        <img className="w-100 h-100" src={props.mainImage[0]} alt="" />
    */
}

function RecommendPanel(props) {
    const { t } = useTranslation();
    const [panels, setPanels] = useState([]);
    const [panelIndex, setPanelIndex] = useState(0);
    const [showingPanel, setShowingPanel] = useState(<></>);
    useEffect(() => {
        const tmpPanels = props.recommendServers.map((value, index) => {
            var panel = <></>;
            var rankingText = "";
            if (value.type === 'dayRanking') rankingText = t('bigSection.recommendPanel.dailyRanking');
            if (value.type === 'weekRanking') rankingText = t('bigSection.recommendPanel.weeklyRanking');
            if (value.type === 'monthRanking') rankingText = t('bigSection.recommendPanel.monthlyRanking');
            let description = value.description.slice(0, 100);
            if (description.length >= 100) description += t('bigSection.recommendPanel.clickToReadMore');
                panel = <RankingRecommendPanel
                    icon={value.icon}
                    name={value.name}
                    id={value.id}
                    rank={value.rank}
                    member_count={value.member_count}
                    rankingText={rankingText}
                    description={description}
                />
                return panel;
        });
        console.log(tmpPanels);
        setPanels(tmpPanels);
        setShowingPanel(tmpPanels[0]);
    }, [props.recommendServers]);
    const showNextPanel = () => {
        console.log(panelIndex);
        var tmpIndex; 
        if (panelIndex + 1 == panels.length)
            tmpIndex = 0;
        else
            tmpIndex = panelIndex + 1;
        setPanelIndex(tmpIndex);
        setShowingPanel(panels[tmpIndex]);
    }
    const showPrevPanel = () => {
        console.log(panelIndex);
        var tmpIndex; 
        if (panelIndex == 0)
            tmpIndex = panels.length - 1;
        else
            tmpIndex = panelIndex - 1;
        setPanelIndex(tmpIndex);
        setShowingPanel(panels[tmpIndex]);

    }
    return (
        <div className="big-section-panel-recommend-container pb-2 pt-1">
            <div className="mb-3">注目＆おすすめ</div>
            <div style={{ position: 'relative' }}>
                <div className="recommend-panel-left-arrow-container">
                    <div className="recommend-panel-left-arrow" onClick={() => showPrevPanel()}>
                        <KeyboardArrowLeftIcon style={{ transform: 'scale(2)' }} />
                    </div>
                </div>
                <div className="recommend-panel-right-arrow-container">
                    <div className="recommend-panel-right-arrow" onClick={() => showNextPanel() }>
                        <KeyboardArrowRightIcon style={{ transform: 'scale(2)' }} />
                    </div>
                </div>
                {showingPanel}
            </div>
        </div>
    );
}

function RankingRecommendPanel(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="big-section-panel-recommend" onClick={() => navigate(`/server/${props.id}`)}>
            <div className="big-section-panel-recommend-img" style={{ background: "black" }}>
                <img src={props.icon} className="big-section-panel-recommend-img-background" alt=""></img>
                <img src={props.icon} className="big-section-panel-recommend-img-inner" alt=""></img>
            </div>
            <div className="big-section-panel-recommend-info p-4 pe-5" style={{ background: "#0c0d0f" }}>
                <p className="fs-4 mb-1">
                    {props.name}
                </p>
                <p className="mb-5">{props.rankingText} {props.rank} {t('bigSection.recommendPanel.rankText')}</p>
                <div className="ranking-recommend-panel-description" style={{ fontSize: '0.9rem' }}>
                    {nl2br(props.description)}
                </div>
            </div>
        </div>
    );
}