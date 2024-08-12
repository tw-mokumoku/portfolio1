/* union */
import { HeaderUnion } from '../Component/union/headerUnion';
import { BigTitle } from '../Component/parts/bigSection';
import { GuildCardContainer, TagListSection } from '../Component/union/SectionUnion';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { GuildCard } from '../Component/parts/conversion';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getServerRankingCountryUpdatedLog } from '../Function/APIController';
import { OverlayLoading } from "react-loading-randomizable";
import './home.css';
import { getLanguageLocalStorage, hasHomeTourFlagLocalStorage, setHomeTourFlagLocalStorage } from '../Function/LocalStorageController';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { useTranslation } from "react-i18next";
import { timeDiff } from '../Function/DateCalc';

export function Home(props) {
    const { t } = useTranslation();
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
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

    useEffect(() => {
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
                            dataString={t('home.home.updatedDataString') + timeDiff(t, new Date(value['updated_epoch'] * 1000))}
                        />
                    })
                )
                setLoading(false);
                if (!hasHomeTourFlagLocalStorage()) setRunning(true);
            });
    }, []);
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
                <HeaderUnion />
                <BigTitle />
                <TagListSection />
                <GuildCardContainer>
                    {guildCards}
                </GuildCardContainer>
            </Container>
        </>
    );
}

// meta 情報 section
// サーバーパネルズ section