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
import { useTranslation } from "react-i18next";
import { getLanguageLocalStorage } from '../Function/LocalStorageController';
import { useNavigate } from "react-router-dom";

export function SearchResult(props) {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const queryParams = searchParams.get("q").replace(/\s+/g, ' ').split(' ');
    const countryParams = searchParams.get("country");
    const [guildCards, setGuildCards] = useState([<></>]);
    const [loading, setLoading] = useState(true);
    const [hasResult, setHasResult] = useState(false);
    const [didSelectedRegionChange, setDidSelectedRegionChange] = useState(false);
    const navigate = useNavigate();

    const getSeachFunction = () => {
        getSearch(queryParams, countryParams)
            .then((response) => {
                if (response.data === "" || response.data.length === 0) {
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
                            dataString={
                                <>
                                    {t('searchresult.searchResult.currentVCConnectionNumber')}：
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
            });
    }

    useEffect(() => {
        getSeachFunction();
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }, [searchParams]);
    useEffect(() => {
        if (didSelectedRegionChange === false) return;
        navigate(`/search?q=${searchParams.get("q")}&country=${getLanguageLocalStorage()}`);
        /*
        getSeachFunction();
        */
        setDidSelectedRegionChange(false);
    }, [didSelectedRegionChange]);

    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion setDidSelectedRegionChange={setDidSelectedRegionChange} />
            <Container>
                <div className="mt-3 mb-5 d-flex justify-content-center align-items-center">
                    <SearchBar />
                </div>
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
                                        <p className="mb-5">{searchParams.get("q")}{t('searchresult.searchResult.searchInfoNotFount')}</p>
                                    </div>
                                    <Stack className="d-flex justify-content-center align-items-center">
                                        <div className="w-75">
                                            <p style={{ fontSize: '1rem' }}>{t('searchresult.searchResult.searchHint')}</p>
                                            <p style={{ fontSize: '0.9rem' }}>{t('searchresult.searchResult.checkMisspelling')}</p>
                                            <p style={{ fontSize: '0.9rem' }}>{t('searchresult.searchResult.checkOtherKeywords')}</p>
                                            <p style={{ fontSize: '0.9rem' }}>{t('searchresult.searchResult.checkMoreCommonKeywords')}</p>
                                            <p style={{ fontSize: '0.9rem' }}>{t('searchresult.searchResult.reduceKeywordsNumber')}</p>
                                        </div>
                                    </Stack>
                                </>
                            }
                        </>
                        :
                        <></>
                    }
                </div>
            </Container>
        </>
    );
}