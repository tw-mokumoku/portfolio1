/* union */
import { HeaderUnion } from '../Component/union/headerUnion';
import { BigTitle } from '../Component/parts/bigSection';
import { GuildCardContainer, TagListSection } from '../Component/union/SectionUnion';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { GuildCard } from '../Component/parts/conversion';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getRecommend, getServerRankingCountryUpdatedLog } from '../Function/APIController';
import { OverlayLoading } from "react-loading-randomizable";
import './home.css';
import { getLanguageLocalStorage, hasHomeTourFlagLocalStorage, setHomeTourFlagLocalStorage } from '../Function/LocalStorageController';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { useTranslation } from "react-i18next";
import { timeDiff } from '../Function/DateCalc';
import { checkLocalAndOAuth } from '../Function/LoginController';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Avatar } from '@mui/material';
import Placeholder from 'react-bootstrap/Placeholder';
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';

export function Home(props) {
    const { t } = useTranslation();
    const params = useParams();
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [didSelectedRegionChange, setDidSelectedRegionChange] = useState(false);
    const [recommendServers, setRecommendServers] = useState([]);

    const [hasResult, setHasResult] = useState(true);
    const cardAmountPerLoad = 24;
    const [hasMoreServers, setHasMoreServers] = useState(true);
    const [didAPIExecuted, setDidAPIExecuted] = useState(false);

    const steps = [
        {
            target: '.search-bar-tour',
            content: t('home.home.searchBarTour'),
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
            target: '.header-login-tour',
            content: t('home.home.headerLoginTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
        {
            target: '.popular-tour',
            content: t('home.home.popularTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
        {
            target: '.guild-card-tag-tour',
            content: t('home.home.guildCardTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
        {
            target: '.guild-card-data-tag-tour',
            content: t('home.home.guildCardDataTagTour'),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        },
        {
            target: '.guild-card-title-tour',
            content: (
                <>
                    <div>
                        {t('home.home.guildCardTitleTour1')}
                    </div>
                    <br />
                    <div>
                        {t('home.home.guildCardTitleTour2')}
                    </div>
                </>
            ),
            locale: {
                skip: <strong aria-label="skip">{t('home.home.skip')}</strong>,
                next: t('home.home.next'),
                back: t('home.home.back'),
                last: t('home.home.last'),
            },
            placement: 'auto',
        }
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, origin, status, type } = data;

        if ([EVENTS.TOUR_END].includes(type)) {
            setHomeTourFlagLocalStorage();
        }
    }

    const getServerRecommendFunction = () => {
        getRecommend(getLanguageLocalStorage())
            .then((response) => {
                var tmpRecommendServers = [];
                response.data.dayRanking
                    .map((value, index) => {
                    tmpRecommendServers = [
                        ...tmpRecommendServers,
                        {
                            type: 'dayRanking',
                            icon: value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : "",
                            avarage_sec_per_log: value.avarage_sec_per_log,
                            avarage_sec_per_member: value.avarage_sec_per_member,
                            description: value.description,
                            id: value.id,
                            name: value.name,
                            total_sec: value.total_sec,
                            rank: value.rank,
                            member_count: value.member_count
                        }
                    ];
                });
                response.data.weekRanking.map((value, index) => {
                    if (!value.is_bot_available || !value.is_public) return null;
                    tmpRecommendServers = [
                        ...tmpRecommendServers,
                        {
                            type: 'weekRanking',
                            icon: value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : "",
                            avarage_sec_per_log: value.avarage_sec_per_log,
                            avarage_sec_per_member: value.avarage_sec_per_member,
                            description: value.description,
                            id: value.id,
                            name: value.name,
                            total_sec: value.total_sec,
                            rank: value.rank,
                            member_count: value.member_count
                        }
                    ];
                });
                response.data.monthRanking.map((value, index) => {
                    if (!value.is_bot_available || !value.is_public) return null;
                    tmpRecommendServers = [
                        ...tmpRecommendServers,
                        {
                            type: 'monthRanking',
                            icon: value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : "",
                            avarage_sec_per_log: value.avarage_sec_per_log,
                            avarage_sec_per_member: value.avarage_sec_per_member,
                            description: value.description,
                            id: value.id,
                            name: value.name,
                            total_sec: value.total_sec,
                            rank: value.rank,
                            member_count: value.member_count
                        }
                    ];
                });
                setRecommendServers(tmpRecommendServers);
            });
    }

    const getServerRankingCountryUpdatedLogFunction = () => {
        setDidAPIExecuted(true);
        getServerRecommendFunction();
        getServerRankingCountryUpdatedLog(getLanguageLocalStorage(), cardAmountPerLoad, 0)
            .then((response) => {
                if (response.data === "" || response.data.length === 0) {
                    setLoading(false);
                    setHasResult(false);
                    return;
                }
                const tmpGuildCards = response.data.map((value, index) => {
                    return <GuildCard
                    key={index}
                    cardTitleName={index == 0 ? "guild-card-title-tour" : ""}
                    cardTagClassName={index == 0 ? "guild-card-tag-tour" : ""}
                    cardDataClassName={index == 0 ? "guild-card-data-tag-tour" : ""}
                    guildID={value['id']}
                    guildIcon={value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : ""}
                    guildName={value['name']}
                    guildInviteURL={value['invite_url']}
                    guildDescription={value['description']}
                    dataString={
                        <>
                            {t('tagView.tagView.currentVCConnectionNumber')}：
                            {value['user_num'] !== 0 ?
                                <span className="ms-1" style={{ color: '#12c74b' }}>{value['user_num']}</span>
                                :
                                <span className="ms-1">{value['user_num']}</span>
                            }
                        </>
                        }
                    />
                });
                setGuildCards(tmpGuildCards);
                setLoading(false);
                setDidAPIExecuted(false);
                if (tmpGuildCards.length != cardAmountPerLoad) setHasMoreServers(false);
                if (!hasHomeTourFlagLocalStorage()) setRunning(true);
            });
    }

    const addServerRankingCountryUpdatedLog = () =>{
        if (didAPIExecuted) return;
        setDidAPIExecuted(true);
        getServerRankingCountryUpdatedLog(getLanguageLocalStorage(), cardAmountPerLoad, guildCards.length)
            .then((response) => {
                const tmpGuildCards = response.data.map((value, index) => {
                    return <GuildCard
                    key={index}
                    cardTitleName={index == 0 ? "guild-card-title-tour" : ""}
                    cardTagClassName={index == 0 ? "guild-card-tag-tour" : ""}
                    cardDataClassName={index == 0 ? "guild-card-data-tag-tour" : ""}
                    guildID={value['id']}
                    guildIcon={value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : ""}
                    guildName={value['name']}
                    guildInviteURL={value['invite_url']}
                    guildDescription={value['description']}
                    dataString={
                        <>
                            {t('tagView.tagView.currentVCConnectionNumber')}：
                            {value['user_num'] !== 0 ?
                                <span className="ms-1" style={{ color: '#12c74b' }}>{value['user_num']}</span>
                                :
                                <span className="ms-1">{value['user_num']}</span>
                            }
                        </>
                        }
                    />
                });
                setGuildCards(guildCards.concat(tmpGuildCards));
                if (tmpGuildCards.length != cardAmountPerLoad) setHasMoreServers(false);
                setDidAPIExecuted(false);
            });

    }

    const onLoadMore = () => {
        addServerRankingCountryUpdatedLog();
    }

    const loaderPlaceHolder = () => {
        return (
            <Col>
                <Card cardName="m-3">
                    <Card.Header className="d-flex">
                        <Avatar src="https://holder.js/100px100" sx={{ width: 60, height: 60 }} className="sp-icon me-4" variant="rounded" />
                        <div className="d-flex w-100 align-items-center ">
                            <Placeholder className="w-100" as={Card.Title} animation="glow">
                                <Placeholder xs={8} />
                            </Placeholder>
                        </div>
                    </Card.Header>
                    <Card.Body className="pt-2">
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} /> <Placeholder xs={4} />
                            <Placeholder xs={4} /> <Placeholder xs={6} />
                            <Placeholder xs={8} />
                            <br />
                            <br />
                            <Placeholder xs={6} /><Placeholder xs={8} />
                        </Placeholder>
                    </Card.Body>
                    <Card.Footer className="pb-4 d-flex justify-content-center">
                    </Card.Footer>
                </Card>
            </Col>        
        );
    }

    useEffect(() => {
        checkLocalAndOAuth()
            .then(() => {
                getServerRankingCountryUpdatedLogFunction();
            })
    }, []);
    useEffect(() => {
        if (didSelectedRegionChange === false) return;
        getServerRankingCountryUpdatedLogFunction();
        setDidSelectedRegionChange(false);
    }, [didSelectedRegionChange]);
    return (
        <>
            <OverlayLoading active={loading} />
            <Joyride
                continuous
                hideCloseButton
                run={running}
                scrollToFirstStep
                showProgress
                showSkipButton
                steps={steps}
                spotlightClicks
                scrollOffset={200}
                styles={{
                    options: {
                        zIndex: 10000
                    }
                }}
                callback={handleJoyrideCallback}
            />
            <HeaderUnion setDidSelectedRegionChange={setDidSelectedRegionChange} />
            <Container>
                <BigTitle recommendServers={recommendServers} />
                <TagListSection didSelectedRegionChange={didSelectedRegionChange} />
                <p className="fs-6 mb-0">
                    {t('home.home.guildCardDisplayExplaination1')}
                </p>
                <p className="fs-6">
                    {t('home.home.guildCardDisplayExplaination2')}
                </p>
                
                {!loading ?
                    <>
                        {hasResult ?
                            <>
                                <InfiniteScroll
                                    pageStart={1}
                                    loadMore={onLoadMore}
                                    hasMore={hasMoreServers}
                                    loader={
                                        <GuildCardContainer>
                                            {
                                                [...Array(3)].map(() => loaderPlaceHolder())
                                            }
                                        </GuildCardContainer>
                                    }
                                >
                                    <GuildCardContainer>
                                            {guildCards}
                                    </GuildCardContainer>
                                </InfiniteScroll>
                            </>
                            :
                            <>
                                <div className="d-flex justify-content-center align-items-center mb-5">
                                    <p className="mb-5">
                                        {t('tagView.tagView.tagNotFound1')}{params['name']}{t('tagView.tagView.tagNotFound2')}
                                    </p>
                                </div>
                            </>
                        }
                    </>
                    :
                    <></>
                }
            </Container>
        </>
    );
}
/*
                <GuildCardContainer>
                    {guildCards}
                </GuildCardContainer>
*/
// meta 情報 section
// サーバーパネルズ section