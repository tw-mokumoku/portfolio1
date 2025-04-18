import Container from 'react-bootstrap/Container';
import { HeaderUnion } from '../Component/union/headerUnion';
import { GuildCardContainer } from '../Component/union/SectionUnion';
import { useEffect, useState } from 'react';
import { getDiscordGuildIcon, getTagRankingCurrentServers } from '../Function/APIController';
import { useParams } from "react-router-dom";
import { GuildCard } from '../Component/parts/conversion';
import { SearchBar } from '../Component/parts/searchBar';
import { OverlayLoading } from "react-loading-randomizable";
import { useTranslation } from "react-i18next";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import './tagview.css';
import InfiniteScroll from 'react-infinite-scroller';
import { Avatar } from '@mui/material';
import Placeholder from 'react-bootstrap/Placeholder';
import { Helmet } from 'react-helmet';

export function TagView() {
    const { t } = useTranslation();
    const params = useParams();
    const [guildCards, setGuildCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasResult, setHasResult] = useState(true);
    const cardAmountPerLoad = 24;
    const [hasMoreServers, setHasMoreServers] = useState(true);
    const [didAPIExecuted, setDidAPIExecuted] = useState(false);


    const getTagRankingCurrentServersFunction = () => {
        setDidAPIExecuted(true);
        getTagRankingCurrentServers(params['name'], cardAmountPerLoad, 0)
            .then((response) => {
                if (response.data === "" || response.data.length === 0) {
                    setLoading(false);
                    setHasResult(false);
                    return;
                }
                const tmpGuildCards = response.data.filter((value) => value.invite_url != null).map((value, index) => {
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
                setGuildCards(tmpGuildCards);
                setLoading(false);
                setDidAPIExecuted(false);
                if (tmpGuildCards.length != cardAmountPerLoad) setHasMoreServers(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        getTagRankingCurrentServersFunction();
    }, [params]);

    const addTagRankingCurrentServers = () => {
        if (didAPIExecuted) return;
        setDidAPIExecuted(true);

        getTagRankingCurrentServers(params['name'], cardAmountPerLoad, guildCards.length)
            .then((response) => {
                const tmpGuildCards = response.data.map((value, index) => {
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
                setGuildCards(guildCards.concat(tmpGuildCards));
                if (tmpGuildCards.length != cardAmountPerLoad) setHasMoreServers(false);
                setDidAPIExecuted(false);
            });
    }

    const onLoadMore = () => {
        addTagRankingCurrentServers();
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

    return (
        <>
            <Helmet>
                <title>{params['name']}｜Discord List</title>
                <meta name="description" content={`${t('helmet.tagview.description1')} ${params['name']} ${t('helmet.tagview.description1')}`} />
            </Helmet>
            <OverlayLoading active={loading} />
            <HeaderUnion />
            <Container>
                <div className="mt-3 mb-5 d-flex justify-content-center align-items-center">
                    <SearchBar />
                </div>
                <div className="mt-5">
                    <div className="mt-5">
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
                    </div>
                </div>
            </Container>
        </>
    );
}