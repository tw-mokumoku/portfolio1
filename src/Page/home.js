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

export function Home(props) {
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getServerRankingCountryUpdatedLog('JP')
            .then((response) => {
                setGuildCards(
                    response.data.map((value, index) => {
                        return <GuildCard
                            key={index}
                            guildID={value['id']}
                            guildIcon={value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : ""}
                            guildName={value['name']}
                            guildInviteURL={value['invite_url']}
                            guildDescription={value['description']}
                            dataString={"更新：" + timeDiff(new Date(value['updated_epoch'] * 1000))}
                        />
                    })
                )
                setLoading(false);
            });
    }, []);
    return (
        <>
            <OverlayLoading active={loading} />
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