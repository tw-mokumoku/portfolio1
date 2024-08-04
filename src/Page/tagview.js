import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import Row from 'react-bootstrap/Row';
import { GuildCardContainer } from '../Component/union/SectionUnion';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getTagRankingCurrentServers } from '../Function/APIController';
import { useParams } from "react-router-dom";
import { GuildCard } from '../Component/parts/conversion';
import { SearchBar } from '../Component/parts/searchBar';
export function TagView() {
    const params = useParams();
    const [guildCards, setGuildCards] = useState([<></>])
    useEffect(() => {
        getTagRankingCurrentServers(params['name'])
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
                            dataString={"現在の接続人数：" + value['user_num']}
                        />
                    })
                )
            })
    }, [])

    return (
        <Container>
            <HeaderUnion />
            <div className="mt-3 mb-5">
                <SearchBar />
            </div>
            <div className="mt-5">
            <GuildCardContainer>
                {guildCards}
            </GuildCardContainer>
            </div>
        </Container>
    );
}