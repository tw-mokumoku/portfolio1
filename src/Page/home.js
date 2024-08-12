/* union */
import { HeaderUnion } from '../Component/union/headerUnion';
import { BigTitle } from '../Component/parts/bigSection';
import { GuildCardContainer, TagListSection } from '../Component/union/SectionUnion';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { GuildCard } from '../Component/parts/conversion';
import { isLocal } from '../Function/LocalRemoteSwitcher';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getServerRankingCountryUpdatedLog } from '../Function/APIController';
import { timeDiff } from '../Function/DateCalc';
import { OverlayLoading } from "react-loading-randomizable";
import './home.css';
import { hasHomeTourFlagLocalStorage, setHomeTourFlagLocalStorage } from '../Function/LocalStorageController';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { useTranslation } from "react-i18next";

export function Home(props) {
    const { t } = useTranslation();
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const steps = [
        {
            target: '.search-bar-tour',
            content: 'ここでは目的のサーバーを検索することができます。',
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
            },
            disableBeacon: true,
            disableOverlayClose: true,
            placement: 'bottom',
            spotlightClicks: true,
        },
        {
            target: '.header-login-tour',
            content: '管理しているサーバーをDiscordListに掲示する場合はここでログインしてください。',
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
                back: '戻る',
                last: '終了',
            },
        },
        {
            target: '.popular-tour',
            content: 'ここではサーバーに使われているタグが人気順で表示されています。',
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
                back: '戻る',
                last: '終了',
            },
        },
        {
            target: '.guild-card-tag-tour',
            content: 'ここでもサーバーに使われているタグが見れます。',
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
                back: '戻る',
                last: '終了',
            },
        },
        {
            target: '.guild-card-data-tag-tour',
            content: 'ここはサーバーの重要な情報が表示されています。「更新」や「現在」のVCの接続人数が見れます。',
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
                back: '戻る',
                last: '終了',
            },
        },
        {
            target: '.guild-card-title-tour',
            content: (
                <>
                    <div>
                        ここクリックするとサーバーのより詳細な情報が表示されます。
                    </div>
                    <br />
                    <div>
                        さっそくハイライトを押してみましょう！
                    </div>
                </>
            ),
            locale: {
                skip: <strong aria-label="skip">スキップ</strong>,
                next: '次へ',
                back: '戻る',
                last: '終了',
            },
        }
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, origin, status, type } = data;

        if ([EVENTS.TOUR_END].includes(type)) {
            setHomeTourFlagLocalStorage();
        }

    }
    useEffect(() => {
        getServerRankingCountryUpdatedLog('JP')
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
                            dataString={t('home.home.updatedDataString') + timeDiff(new Date(value['updated_epoch'] * 1000))}
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