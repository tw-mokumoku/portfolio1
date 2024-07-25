import { hasDiscordOAuthTokenCookie } from "../Function/OAuthController";
import { Navigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { HeaderUnion } from "../Component/union/headerUnion";
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { ReactTags } from 'react-tag-autocomplete'
import { useCallback, useState } from "react";
import './serveredit.css';
import { createTagPair, deleteTagPair, getServer, getServerTags, getTagSuggests, updateServer } from "../Function/APIController";
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import { getCurrentDislistUserOwningServersLocalStorage } from "../Function/LocalStorageController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ServerEdit(props) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [descriptionText, setDescriptionText] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("JP");
    const [initialSelectedTags, setInitialSelectedTags] = useState([]);
    const [initialRegion, setInitialRegion] = useState("");
    const [isAPIProcessing, setIsAPIProcessing] = useState(false);
    const params = useParams();

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

        const allPromises = new Promise(resolve => {

            var deleteTagPairPromise = [];
            //delete tag_pair
            if (selectedRegion !== initialRegion) {
                for (let i = 0; i < ist.length; i++) {
                    deleteTagPairPromise.push(deleteTagPair(params['id'], ist[i]));
                }
            } else {
                for (let i = 0; i < filteredIst.length; i++) {
                    deleteTagPairPromise.push(deleteTagPair(params['id'], filteredIst[i]));
                }
            }

            Promise.all(deleteTagPairPromise).then(() => {
                updateServer({
                    id: params['id'],
                    country_id: selectedRegion,
                    description: descriptionText
                }).then(() => {
                    var createTagPairPromise = [];
                    //create tag_pair
                    if (selectedRegion !== initialRegion) {
                        for (let i = 0; i < st.length; i++) {
                            createTagPairPromise.push(createTagPair(params['id'], st[i]));
                        }
                    } else {
                        for (let i = 0; i < filteredSt.length; i++) {
                            createTagPairPromise.push(createTagPair(params['id'], filteredSt[i]));
                        }
                    }
                    Promise.all(createTagPairPromise).then(() => {
                        setInitialSelectedTags(selectedTags);
                        setInitialRegion(selectedRegion);
                        setIsAPIProcessing(false);
                        resolve();
                    });
                });
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
            <ToastContainer />
            <Container>
                <HeaderUnion />
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9}>
                        <p className="fs-2">
                            「{
                                getCurrentDislistUserOwningServersLocalStorage()
                                    .filter(value => value.id === params.id)[0].name
                            }」 編集
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