import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import { SearchBar } from '../Component/parts/searchBar';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getSearch } from '../Function/APIController';
import { GuildCardContainer } from '../Component/union/SectionUnion';
import { OverlayLoading } from "react-loading-randomizable";
import { GuildCard } from '../Component/parts/conversion';
import Stack from 'react-bootstrap/Stack';

export function SearchResult(props) {
    const [searchParams] = useSearchParams();
    const queryParams = searchParams.get("q").replace(/\s+/g, ' ').split(' ');
    const countryParams = searchParams.get("country");
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [hasResult, setHasResult] = useState(false);

    useEffect(() => {
        getSearch(queryParams, countryParams)
            .then((response) => {
                if (response.data === "") {
                    setLoading(false);
                    setHasResult(false);
                    return;
                }
                setGuildCards(
                    response.data.map((value, index) => {
                        return <GuildCard
                            key={index}
                            guildID={value['id']}
                            guildIcon={value['icon'] ? getDiscordGuildIcon(value['id'], value['icon']) : ""}
                            guildName={value['name']}
                            guildInviteURL={value['invite_url']}
                            guildDescription={value['description']}
                            dataString={"現在のVCの接続人数：" + value['user_num']}
                        />
                    })
                );
                setHasResult(true);
                setLoading(false);
            })
    }, [searchParams]);

    return (
        <>
            <OverlayLoading active={loading} />
            <Container>
                <HeaderUnion />
                <div className="mt-3 mb-5 d-flex justify-content-center align-items-center">
                    <SearchBar />
                </div>
                <div className="mt-5">
                    {hasResult ?
                        <GuildCardContainer>
                            {guildCards}
                        </GuildCardContainer>
                        :
                        <>
                            <div className="d-flex justify-content-center align-items-center mb-5">
                                <p className="mb-5">{searchParams.get("q")}に一致する情報は見つかりませんでした。</p>
                            </div>
                            <Stack className="d-flex justify-content-center align-items-center">
                                <div className="w-75">
                                    <p style={{ fontSize: '1rem' }}>検索のヒント:</p>
                                    <p style={{ fontSize: '0.9rem' }}>・ キーワードに誤字・脱字がないか確認します。</p>
                                    <p style={{ fontSize: '0.9rem' }}>・ 別のキーワードを試してみます。</p>
                                    <p style={{ fontSize: '0.9rem' }}>・ もっと一般的なキーワードに変えてみます。</p>
                                    <p style={{ fontSize: '0.9rem' }}>・ キーワードの数を減らしてみます。</p>
                                </div>
                            </Stack>
                            </>
                    }
                </div>
            </Container>
        </>
    );
}