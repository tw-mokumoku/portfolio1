import { hasDiscordOAuthTokenCookie } from "../Function/OAuthController";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { HeaderUnion } from "../Component/union/headerUnion";
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { ReactTags } from 'react-tag-autocomplete'
import { useCallback, useState } from "react";
import { createTagPair, deleteTagPair, getCurrentUserGuilds, getServer, getServerTags, getTagSuggests, updateServer } from "../Function/APIController";
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import './serveredit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OverlayLoading } from "react-loading-randomizable";
import "react-toggle/style.css"
import Toggle from 'react-toggle'

export function ServerEdit(props) {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [descriptionText, setDescriptionText] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("JP");
    const [initialSelectedTags, setInitialSelectedTags] = useState([]);
    const [initialRegion, setInitialRegion] = useState("");
    const [isAPIProcessing, setIsAPIProcessing] = useState(false);
    const params = useParams();
    const [serverName, setServerName] = useState("");
    const [loading, setLoading] = useState(true);
    const [isServerPublic, setIsServerPublic] = useState(false);
    const [initialIsServerPublic, setInitialIsServerPublic] = useState(false);

    const onAdd = useCallback((newTag) => {
        setSelectedTags([...selectedTags, newTag])
    }, [selectedTags]);

    const onDelete = useCallback((tagIndex) => {
        setSelectedTags(selectedTags.filter((_, i) => i !== tagIndex))
    }, [selectedTags]);

    const [suggestions, setSuggestions] = useState([]);

    const onInput = (value) => {
        if (value == null || value === "") {
            setSuggestions([]);
            return;
        }
        getTagSuggests("JP", value).then((response) => {
            setSuggestions(response.data.map(({ id, name, country_id }) => ({ value: name, label: name })));
        });
    };

    const onRegionChange = (event) => {
        if (event.target.value === initialRegion) setSelectedTags(initialSelectedTags);
        else setSelectedTags([]);
        setSelectedRegion(event.target.value);
    }

    const onSaveModification = () => {
        if (descriptionText === "") {
            toast.error(
                "サーバー説明が未入力です"
            );
            return;
        }
        if (selectedTags.length === 0) {
            toast.error(
                "タグを最低１つ選択してください"
            );
            return;
        }
        if (isAPIProcessing) {
            toast.error("処理を実行中です。少々お待ちください。");
            return;
        }
        setIsAPIProcessing(true);
        const ist = initialSelectedTags.map(({ value, label }) => label);
        const st = selectedTags.map(({ value, label }) => label);
        const filteredIst = ist.filter((value) => !st.includes(value));
        const filteredSt = st.filter((value) => !ist.includes(value));

        const allPromises = new Promise((resolve, reject) => {
            var failedDeleteTags = [];
            const deleteTagPairPromise = new Promise((resolve, reject) => {
                const deleteTagPairs = async () => {
                    var deleteTagsFailed = false;
                    //delete tag_pair
                    if (selectedRegion !== initialRegion) {
                        for (let i = 0; i < ist.length; i++) {
                            try {
                                await deleteTagPair(params['id'], ist[i]);
                            } catch (err) {
                                failedDeleteTags.push(ist[i]);
                                deleteTagsFailed = true;
                            }
                        }
                    } else {
                        for (let i = 0; i < filteredIst.length; i++) {
                            try {
                                await deleteTagPair(params['id'], filteredIst[i]);
                            } catch (err) {
                                failedDeleteTags.push(filteredIst[i]);
                                deleteTagsFailed = true;
                            }
                        }
                    }
                    if (deleteTagsFailed) reject();
                }
                deleteTagPairs()
                    .then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    })
            })

            deleteTagPairPromise.then(() => {
                var updateServerData = {
                    id: params['id'],
                    country_id: selectedRegion,
                    description: descriptionText,
                };
                if (initialIsServerPublic != isServerPublic) {
                    updateServerData['is_public'] = isServerPublic;
                }
                updateServer(updateServerData).then(() => {
                    var failedCreateTags = [];
                    const createTagPairPromise = new Promise((resolve, reject) => {
                        const createTagPairs = async () => {
                            var createTagsFailed = false;
                            if (selectedRegion !== initialRegion) {
                                for (let i = 0; i < st.length; i++) {
                                    try {
                                        await createTagPair(params['id'], st[i]);
                                    } catch (err) {
                                        failedCreateTags.push(st[i]);
                                        createTagsFailed = true
                                    }
                                }
                            } else {
                                for (let i = 0; i < filteredSt.length; i++) {
                                    try {
                                        await createTagPair(params['id'], filteredSt[i]);
                                    } catch (err) {
                                        failedCreateTags.push(filteredSt[i]);
                                        createTagsFailed = true
                                    }
                                }
                            }
                            if (createTagsFailed) reject();
                        }
                        createTagPairs()
                            .then(() => {
                                resolve();
                            }).catch(() => {
                                reject();
                            })
                    });
                    //create tag_pair
                    createTagPairPromise.then(() => {
                        setInitialSelectedTags(selectedTags);
                        setInitialRegion(selectedRegion);
                        setIsAPIProcessing(false);
                        resolve();
                    }).catch(() => {
                        toast.error(
                            `タグ ${failedCreateTags.join(', ')} の追加に失敗しました\n少し時間を置いて再度お試しください`
                            //"タグの追加に失敗しました。"
                        );
                        setIsAPIProcessing(false);
                        reject();
                    })
                }).catch(() => {
                    toast.error(
                        "サーバーの更新に失敗しました。"
                    );
                    setIsAPIProcessing(false);
                    reject();
                });
            }).catch(() => {
                toast.error(
                    `タグ 「${failedDeleteTags.join(', ')}」 の除去に失敗しました\n少し時間を置いて再度お試しください`
                );
                setIsAPIProcessing(false);
                reject()
            });
        });
        toast.promise(
            allPromises,
            {
                pending: 'データを保存しています...',
                success: '保存が完了しました',
                error: '情報の保存に失敗しました',
            }
        );
    };
    useEffect(() => {
        getCurrentUserGuilds().then((response) => {
            const userOwnerGuilds = response.data.filter(value => value.id == params['id'] && value.owner);
            if (userOwnerGuilds.length == 0) navigate(`/server/${params['id']}`);
            setLoading(false);
        })
        getServerTags(params['id'])
            .then((response) => {
                const serverTags = response.data.map(({ name }) => ({ value: name, label: name }));
                setInitialSelectedTags(serverTags);
                setSelectedTags(serverTags);
            }).catch((response) => {
                console.log(response);
            });

        getServer(params['id'])
            .then((response) => {
                setServerName(response.data.name);
                setIsServerPublic(response.data.is_public)
                setInitialIsServerPublic(response.data.is_public)
                setDescriptionText(response.data['description'] ? response.data['description'] : "");
                if (response.data['country_id']) {
                    setSelectedRegion(response.data['country_id']);
                    setInitialRegion(response.data['country_id']);
                }
            })
    }, [params]);

    if (!hasDiscordOAuthTokenCookie()) return <Navigate to="/" />;
    return (
        <>
            <OverlayLoading active={loading} />
            <ToastContainer />
            <Container>
                <HeaderUnion />
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9}>
                        <p className="fs-2">
                            「{serverName}」 編集
                        </p>
                        <Card className="mb-4">
                            <Card.Body>
                                <EditCategory
                                    title="リージョン"
                                >
                                    <select
                                        className="server-edit-region-select"
                                        value={selectedRegion}
                                        onChange={onRegionChange}
                                    >
                                        <option value="JP">日本</option>
                                        <option value="US">アメリカ</option>
                                    </select>
                                </EditCategory>
                                <EditCategory
                                    title="タグ"
                                >
                                    <ReactTags
                                        placeholderText="タグを入力してください"
                                        selected={selectedTags}
                                        suggestions={suggestions}
                                        onAdd={onAdd}
                                        onDelete={onDelete}
                                        allowNew={true}
                                        noOptionsText="No matching countries"
                                        onInput={onInput}
                                    />
                                </EditCategory>
                                <EditCategory
                                    title="サーバー説明"
                                >
                                    <textarea
                                        value={descriptionText}
                                        onChange={(event) => setDescriptionText(event.target.value)}
                                        className="w-100 server-edit-description-textarea"
                                    />
                                </EditCategory>
                                <EditCategory
                                    title="サーバーを公開する"
                                >
                                    <Toggle
                                        id='cheese-status'
                                        checked={isServerPublic}
                                        defaultChecked={isServerPublic}
                                        onChange={() => setIsServerPublic(!isServerPublic)} />
                                </EditCategory>
                            </Card.Body>
                        </Card>
                        <div className="d-flex justify-content-center mb-5">
                            <Button
                                onClick={onSaveModification}
                            >
                                変更を保存する
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function EditCategory(props) {
    return (
        <div className="edit-category mb-4">
            <div
                className="mb-2 fs-6"
            >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}