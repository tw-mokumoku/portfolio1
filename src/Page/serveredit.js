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
import { getCurrentUserGuilds, getServer, getServerTags, getTagSuggests, updateServer } from "../Function/APIController";
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import './serveredit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OverlayLoading } from "react-loading-randomizable";
import "react-toggle/style.css";
import Toggle from 'react-toggle';
import { useDebounce } from 'react-use';

export function ServerEdit(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [selectedTags, setSelectedTags] = useState([]);
    const [descriptionText, setDescriptionText] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("JP");
    const [initialSelectedTags, setInitialSelectedTags] = useState([]);
    const [initialRegion, setInitialRegion] = useState("");
    const [isAPIProcessing, setIsAPIProcessing] = useState(false);
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
    const [inputValues, setInputValues] = useState('');

    const [, cancel] = useDebounce(
        () => {
            if (inputValues == null || inputValues === "") {
                setSuggestions([]);
                return;
            }
            getTagSuggests("JP", inputValues).then((response) => {
                setSuggestions(response.data.map(({ id, name, country_id }) => ({ value: name, label: name })));
            });
        },
        1000,
        [inputValues],
    );

    const onRegionChange = (event) => {
        if (event.target.value === initialRegion) setSelectedTags(initialSelectedTags);
        else setSelectedTags([]);
        setSelectedRegion(event.target.value);
    }

    const onSaveModification = () => {
        // サーバー説明多すぎ
        if (descriptionText.length > 5000) {
            toast.error(
                `サーバー説明上限は5000文字です。現在 ${descriptionText.length} 文字`
            );
            return;
        }
        // サーバー説明未入力時
        if (descriptionText === "") {
            toast.error(
                "サーバー説明が未入力です"
            );
            return;
        }
        // サーバータグ多すぎ
        if (selectedTags.length > 7) {
            toast.error(
                `タグ数の上限は7個です。現在 ${selectedTags.length} 個`
            );
            return;
        }
        // サーバータグ選択時
        if (selectedTags.length === 0) {
            toast.error(
                "タグを最低１つ選択してください"
            );
            return;
        }
        // 前回のサーバー更新処理未終了時
        if (isAPIProcessing) {
            toast.error("処理を実行中です。少々お待ちください。");
            return;
        }
        // toastの有効化
        setIsAPIProcessing(true);


        const updateServerPromise = new Promise((resolve, reject) => {
            updateServerProcess().then(() => {
                setIsAPIProcessing(false);
                resolve();
            }).catch(() => {
                setIsAPIProcessing(false);
                reject();
            })
        })

        toast.promise(
            updateServerPromise,
            {
                pending: 'データを保存しています...',
                success: '保存が完了しました',
                error: '情報の保存に失敗しました',
            }
        );
    };

    const updateServerProcess = () => {
        // 各種変数
        const ist = initialSelectedTags.map(({ value, label }) => label);
        const st = selectedTags.map(({ value, label }) => label);
        const filteredIst = ist.filter((value) => !st.includes(value));
        const filteredSt = st.filter((value) => !ist.includes(value));
        console.log("initialIsServerPublic", initialIsServerPublic);
        console.log("isServerPublic", isServerPublic);
        const added_tag_pairs = selectedRegion !== initialRegion ? st : filteredSt;
        const removed_tag_pairs = selectedRegion !== initialRegion ? ist : filteredIst;
        return updateServer({
            id: params['id'],
            name: null,
            invite_url: null,
            description: descriptionText,
            country_id: selectedRegion,
            icon: null,
            is_public: initialIsServerPublic != isServerPublic ? isServerPublic : null,
            added_tag_pairs: added_tag_pairs.length != 0 ? added_tag_pairs : null,
            removed_tag_pairs: removed_tag_pairs != 0 ? removed_tag_pairs : null
        });
    }

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
                                    title="国"
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
                                        classNames={{
                                            root: 'server-edit-react-tags',
                                            rootIsActive: 'is-active',
                                            rootIsDisabled: 'is-disabled',
                                            rootIsInvalid: 'is-invalid',
                                            label: 'server-edit-react-tags__label',
                                            tagList: 'server-edit-react-tags__list',
                                            tagListItem: 'server-edit-react-tags__list-item',
                                            tag: 'server-edit-react-tags__tag',
                                            tagName: 'server-edit-react-tags__tag-name',
                                            comboBox: 'server-edit-react-tags__combobox',
                                            input: 'server-edit-react-tags__combobox-input',
                                            listBox: 'server-edit-react-tags__listbox',
                                            option: 'server-edit-react-tags__listbox-option',
                                            optionIsActive: 'is-active',
                                            highlight: 'server-edit-react-tags__listbox-option-highlight',
                                        }}
                                        placeholderText="タグを入力してください"
                                        selected={selectedTags}
                                        suggestions={suggestions}
                                        onAdd={onAdd}
                                        onDelete={onDelete}
                                        allowNew={true}
                                        noOptionsText="No matching countries"
                                        onInput={(value) => setInputValues(value)}
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