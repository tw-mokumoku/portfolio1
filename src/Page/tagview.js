import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import Row from 'react-bootstrap/Row';
import { GuildCardContainer } from '../Component/union/SectionUnion';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getTagRankingCurrentServers } from '../Function/APIController';
import { useParams } from "react-router-dom";
import { GuildCard } from '../Component/parts/conversion';
import { SearchBar } from '../Component/parts/searchBar';
import { OverlayLoading } from "react-loading-randomizable";
import Stack from 'react-bootstrap/Stack';
import { useTranslation } from "react-i18next";

export function TagView() {
    const { t } = useTranslation();
    const params = useParams();
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [hasResult, setHasResult] = useState(false);
    const [prevTagName, setPrevTagName] = useState("");
    const [tagRankingCurrentServersCount, setTagRankingCurrentServersCount] = useState("");

    useEffect(() => {
        var getTagRankingCurrentServersCount = false;
        if (prevTagName != params.name) getTagRankingCurrentServersCount = true;
        setPrevTagName(params.name);
        getTagRankingCurrentServers(params['name'], getTagRankingCurrentServersCount)
            .then((response) => {
                if (response.data.data === "" || response.data.data.length === 0) {
                    setLoading(false);
                    setHasResult(false);
                    return;
                }
                setTagRankingCurrentServersCount(response.data.count);
                setGuildCards(
                    response.data.data.map((value, index) => {
                        return <GuildCard
                            key={index}
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
                    })
                );
                setHasResult(true);
                setLoading(false);
            })
    }, [params])

    return (
        <>
            <OverlayLoading active={loading} />
            <Container>
                <HeaderUnion />
                <div className="mt-3 mb-5 d-flex justify-content-center align-items-center">
                    <SearchBar />
                </div>
                <div className="mt-5">
                    <div className="mt-5">
                        {!loading ?
                            <>
                                {hasResult ?
                                    <GuildCardContainer>
                                        {guildCards}
                                    </GuildCardContainer>
                                    :
                                    <>
                                        <div className="d-flex justify-content-center align-items-center mb-5">
                                            <p className="mb-5">{t('tagView.tagView.tagNotFound1')}{params['name']}{t('tagView.tagView.tagNotFound2')}</p>
                                        </div>
                                    </>
                                }
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}