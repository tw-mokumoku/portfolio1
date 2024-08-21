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

export function Home(props) {
    const { t } = useTranslation();
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [didSelectedRegionChange, setDidSelectedRegionChange] = useState(false);
    const [recommendServers, setRecommendServers] = useState([]);

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
        getServerRecommendFunction();
        getServerRankingCountryUpdatedLog(getLanguageLocalStorage())
            .then((response) => {
                setGuildCards(
                    response.data.map((value, index) => {
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
//                            dataString={t('home.home.updatedDataString') + timeDiff(t, new Date(value['updated_epoch'] * 1000))}
                        />
                    })
                )
                setLoading(false);
                if (!hasHomeTourFlagLocalStorage()) setRunning(true);
            });
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
            <Container>
                <HeaderUnion setDidSelectedRegionChange={setDidSelectedRegionChange} />
                <BigTitle recommendServers={recommendServers} />
                <TagListSection didSelectedRegionChange={didSelectedRegionChange} />
                <p className="fs-6 mb-0">
                    {t('home.home.guildCardDisplayExplaination1')}
                </p>
                <p className="fs-6">
                    {t('home.home.guildCardDisplayExplaination2')}
                </p>
                <GuildCardContainer>
                    {guildCards}
                </GuildCardContainer>
            </Container>
        </>
    );
}

// meta 情報 section
// サーバーパネルズ section