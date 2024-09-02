import { useEffect, useState } from "react";
import { OverlayLoading } from "react-loading-randomizable";
import { HeaderUnion } from "../Component/union/headerUnion";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { useParams } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import './serverstepper.css';
import { getDiscordBotOAuthURL, getDiscordBotStepperOAuthURL } from "../Function/LocalRemoteSwitcher";
import { getServer } from "../Function/APIController";
import { ToastContainer, toast } from 'react-toastify';

// 実験
import { useCallback } from "react";
import { useDebounce } from 'react-use';
import { getTagSuggests, updateServer, getMemberDataGuilds, getServerTags } from "../Function/APIController";
import { has_SessionManagerDiscordListUID } from "../Function/OAuthController";
import { Navigate } from "react-router-dom";
import { ReactTags } from 'react-tag-autocomplete';
import Toggle from 'react-toggle';
// 実験



export function ServerStepper() {
    const { t } = useTranslation();
    const steps = [
        t('serverStepper.serverStepper.addToServer'),
        t('serverStepper.serverStepper.registerInviteURL'),
        t('serverStepper.serverStepper.inputServerInfo'),
        t('serverStepper.serverStepper.finalConfirmation')
    ];
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [serverEditActive, setServerEditActive] = useState(false);

    useEffect(() => {
        getServer(params['id'])
            .then((response) => {
                let tmpStep = 0;
                if (response.data == null) {
                    toast.error(t('serverStepper.serverStepper.botNotAddedToServer'));
                    return;
                }
                if (response.data != null && response.data.is_bot_available == true) tmpStep++;
                if (response.data.invite_url != null && response.data.invite_url != "") tmpStep++;
                if (
                    response.data.description != null && response.data.description != "" &&
                    response.data.country_id != null && response.data.country_id != ""
                ) tmpStep++;
                setActiveStep(tmpStep);
                setCurrentStep(tmpStep);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (activeStep == currentStep) setNextDisabled(true);
        else setNextDisabled(false);
        if (activeStep == 2) setServerEditActive(true);
        else setServerEditActive(false);
    }, [activeStep]);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNextDisabled(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setActiveStepFunc = (value) => setActiveStep(value);

    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion />
            <ToastContainer />
            <Container>
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9} className="h-100">
                        <div className="mb-5">
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>
                                                {index == activeStep ?
                                                    <div style={{ color: '#e8ecef' }}>
                                                        {label}
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </div>

                        <div className="server-stepper-body w-100" style={{ minHeight: '500px' }}>
                            {
                                activeStep == 0 ? <Step1Panel setActiveStepFunc={setActiveStepFunc} /> : <></>
                            }
                            {
                                activeStep == 1 ? <Step2Panel setActiveStepFunc={setActiveStepFunc} /> : <></>
                            }
                            <ServerEditBody active={serverEditActive} setActiveStepFunc={setActiveStepFunc} toast={toast} activeStep={activeStep} />
                            {
                                /*
                                activeStep == 2 ? <ServerEditBody active={serverEditActive} setActiveStepFunc={setActiveStepFunc} toast={toast} /> : <></>
                                */
                            }
                            {
                                activeStep == 3 ? <Step4Panel /> : <></>
                            }
                        </div>

                        <div className="mb-5">
                            {activeStep === steps.length ?
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                        <Button style={{ color: 'rgb(117, 176, 34)' }} href={`/server/${params['id']}`}>{t('serverStepper.serverStepper.checkServer')}</Button>
                                </Box>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        {t('serverStepper.serverStepper.back')}
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button
                                        disabled={nextDisabled}
                                        onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? t('serverStepper.serverStepper.end') : t('serverStepper.serverStepper.next')}
                                    </Button>
                                </Box>
                            </React.Fragment>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
function Step4Panel() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    return (
        <>
            <div style={{ color: '#cbd2d8' }}>
                {t('serverStepper.step4panel.congratulations')}
            </div>
            <div className="mt-4" style={{ color: '#cbd2d8' }}>
                {t('serverStepper.step4panel.checkView')}
            </div>
            <div className="d-flex justify-content-center w-100 mt-5">
                <Paper
                    elevation={4}
                    sx={{
                        bgcolor: '#272b30',
                        borderRadius: 10,
                        cursor: 'pointer'
                    }}
                    className="ms-2 px-5 py-2"
                    onClick={() => navigate(`/server/${params['id']}`)}
                >
                    <div className="step-1-panel-join-bot-button">
                        {t('serverStepper.step4panel.check')}
                    </div>
                </Paper>
            </div>
        </>
    );
}

function Step2Panel(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
    }, []);
    const onCheckInviteURLAvailable = () => {
        getServer(params['id'])
            .then((response) => {
                if (response.data == null) {
                    toast.error(t('serverStepper.step2panel.botNotAdded'));
                    props.setActiveStepFunc((v) => v - 1);
                    return;
                }
                if (!response.data.is_bot_available) {
                    toast.error(t('serverStepper.step2panel.botNotAdded'));
                    props.setActiveStepFunc((v) => v - 1);
                    return;
                }
                if (response.data.invite_url == null || response.data.invite_url == "") {
                    toast.error(t('serverStepper.step2panel.inviteURLSettingIncomplete'));
                    return;
                }
                props.setActiveStepFunc((v) => v + 1);
                toast.success(t('serverStepper.step2panel.inviteURLSettingComplete'))
            });
    }
    return (
        <>
            <div style={{ color: '#cbd2d8' }}>
                {t('serverStepper.step2panel.description1')}
            </div>
            <div className="mt-2" style={{ color: '#cbd2d8' }}>
                {t('serverStepper.step2panel.description2')}
            </div>
            <div className="mt-5 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step2panel.title1')}
            </div>
            <div className="ms-4 mt-2" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step2panel.title1Description1')}
            </div>
            <div className="ms-4" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step2panel.title1Description2')}
            </div>
            <div className="mt-4 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step2panel.title2')}
            </div>
            <div className="ms-4 mt-2" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step2panel.title2Description1')}
            </div>
            <div className="ms-4" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step2panel.title2Description2')}
            </div>
            <div className="mt-4 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step2panel.title3')}
            </div>
            <div className="d-flex justify-content-center w-100 mt-5">
                <Paper
                    elevation={4}
                    sx={{
                        bgcolor: '#272b30',
                        borderRadius: 10,
                        cursor: 'pointer'
                    }}
                    onClick={() => onCheckInviteURLAvailable()}
                    className="ms-2 px-5 py-2"
                >
                    <div className="step-1-panel-join-bot-button">
                        {t('serverStepper.step2panel.check')}
                    </div>
                </Paper>
            </div>
        </>
    );
}

function Step1Panel(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
    }, []);
    const onCheckServerExists = () => {
        getServer(params['id'])
            .then((response) => {
                if (response.data == null) {
                    toast.error(t('serverStepper.step1panel.botNotAdded'));
                    return;
                }
                if (!response.data.is_bot_available) {
                    toast.error(t('serverStepper.step1panel.botNotAdded'));
                    return;                    
                }
                props.setActiveStepFunc((v) => v + 1);
                toast.success(t('serverStepper.step1panel.botAdded'))
            });
    }
    return (
        <>
            <div style={{ color: '#cbd2d8' }}>
                {t('serverStepper.step1panel.description1')}
            </div>
            <div className="mt-5 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step1panel.title1')}
            </div>
            <div className="ms-4 mt-2" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step1panel.title1Description1')}
            </div>
            <div className="mt-4 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step1panel.title2')}
            </div>
            <div className="ms-4 mt-2" style={{ fontSize: '14px', color: '#acb2b8' }}>
                {t('serverStepper.step1panel.title2Description1')}
            </div>
            <div className="mt-4 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step1panel.title3')}
            </div>
            <div className="ms-4 mt-2" style={{ fontSize: '14px', color: '#acb2b8'}}>
                {t('serverStepper.step1panel.title3Description1')}
            </div>
            <div className="mt-4 fw-bold" style={{ color: '#ced5db' }}>
                {t('serverStepper.step1panel.title4')}
            </div>
            <div className="d-flex justify-content-center w-100 mt-5">
                <Paper
                    elevation={4}
                    sx={{
                        bgcolor: '#272b30',
                        borderRadius: 10,
                        padding: 2,
                        cursor: 'pointer'
                    }}
                    onClick={() => window.open(getDiscordBotStepperOAuthURL(params['id']))}
                    className="px-5 py-2"
                >
                    <div className="step-1-panel-join-bot-button">
                        {t('serverStepper.step1panel.add')}
                    </div>
                </Paper>
                <Paper
                    elevation={4}
                    sx={{
                        bgcolor: '#272b30',
                        borderRadius: 10,
                        cursor: 'pointer'
                    }}
                    onClick={() => onCheckServerExists() }
                    className="ms-2 px-5 py-2"
                >
                    <div className="step-1-panel-join-bot-button">
                        {t('serverStepper.step1panel.check')}
                    </div>
                </Paper>
            </div>
        </>    
    );
}


function ServerEditBody(props) {
    const { t } = useTranslation();
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
    const [didRenderOnce, setDidRenderOnce] = useState(false);

    const onAdd = useCallback((newTag) => {
        if (newTag.value.includes(' ') || newTag.value.includes('　')) {
            toast.error(
                t('serveredit.serverEdit.doNotIncludeSpaces')
            );
            return;
        }
        if (newTag.value.length > 100) {
            toast.error(
                t('serveredit.serverEdit.tooManyWordsInTag')
            );
            return;
        }
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
                `${t('serveredit.serverEdit.tooManyDescriptionLength1')}${descriptionText.length}${t('serveredit.serverEdit.tooManyDescriptionLength2')}`
            );
            return;
        }
        // サーバー説明未入力時
        if (descriptionText === "") {
            toast.error(
                t('serveredit.serverEdit.emptyDescription')
            );
            return;
        }
        // サーバータグ多すぎ
        if (selectedTags.length > 7) {
            toast.error(
                `${t('serveredit.serverEdit.tooManyTag1')}${selectedTags.length}${t('serveredit.serverEdit.tooManyTag2')}`
            );
            return;
        }
        // サーバータグ選択時
        if (selectedTags.length === 0) {
            toast.error(
                t('serveredit.serverEdit.emptyTag')
            );
            return;
        }
        // 前回のサーバー更新処理未終了時
        if (isAPIProcessing) {
            toast.error(
                t('serveredit.serverEdit.currentlyProcessing')
            );
            return;
        }
        // toastの有効化
        setIsAPIProcessing(true);


        const updateServerPromise = new Promise((resolve, reject) => {
            updateServerProcess().then(() => {
                setIsAPIProcessing(false);
                resolve();
                props.setActiveStepFunc((v) => v + 1);
            }).catch(() => {
                setIsAPIProcessing(false);
                reject();
            })
        })

        toast.promise(
            updateServerPromise,
            {
                pending: t('serveredit.serverEdit.pending'),
                success: t('serveredit.serverEdit.success'),
                error: t('serveredit.serverEdit.error'),
            }
        );
    };

    const updateServerProcess = () => {
        // 各種変数
        const ist = initialSelectedTags.map(({ value, label }) => label);
        const st = selectedTags.map(({ value, label }) => label);
        const filteredIst = ist.filter((value) => !st.includes(value));
        const filteredSt = st.filter((value) => !ist.includes(value));
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
        if (!props.active) return;
        if (didRenderOnce) return;
        setDidRenderOnce(true);
        getMemberDataGuilds().then((response) => {
            const userOwnerGuilds = response.data.filter(value => value.id == params['id'] && value.owner);
            if (userOwnerGuilds.length == 0) navigate(`/server/${params['id']}`);
        })
        getServerTags(params['id'])
            .then((response) => {
                const serverTags = response.data.map(({ name }) => ({ value: name, label: name }));
                setInitialSelectedTags(serverTags);
                setSelectedTags(serverTags);
            }).catch((response) => {
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
    }, [props.active]);

    if (!has_SessionManagerDiscordListUID()) return <Navigate to="/" />;
    return (
        <>
            { props.active ?
            <>
                <BodyEditCategory
                    title={t('serveredit.serverEdit.language')}
                >
                    <select
                        className="server-edit-region-select"
                        value={selectedRegion}
                        onChange={onRegionChange}
                    >
                        <option value="JP">{t('serveredit.serverEdit.jp')}</option>
                        <option value="US">{t('serveredit.serverEdit.us')}</option>
                        <option value="KO">{t('serveredit.serverEdit.ko')}</option>
                        <option value="CN">{t('serveredit.serverEdit.cn')}</option>
                        <option value="ES">{t('serveredit.serverEdit.es')}</option>
                        <option value="FR">{t('serveredit.serverEdit.fr')}</option>
                    </select>
                </BodyEditCategory>
                <BodyEditCategory
                    title={t('serveredit.serverEdit.tag')}
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
                        placeholderText={t('serveredit.serverEdit.pleaseEnterTag')}
                        selected={selectedTags}
                        suggestions={suggestions}
                        onAdd={onAdd}
                        onDelete={onDelete}
                        allowNew={true}
                        noOptionsText={t('serveredit.serverEdit.noOptionText')}
                        onInput={(value) => setInputValues(value)}
                    />
                </BodyEditCategory>
                <BodyEditCategory
                    title={t('serveredit.serverEdit.serverDescription')}
                >
                    <textarea
                        value={descriptionText}
                        onChange={(event) => setDescriptionText(event.target.value)}
                        className="w-100 server-edit-description-textarea"
                        style={{ height: '150px' }}
                    />
                </BodyEditCategory>
                <BodyEditCategory
                    title={t('serveredit.serverEdit.makeServerPublic')}
                >
                    <Toggle
                        id='cheese-status'
                        checked={isServerPublic}
                        defaultChecked={isServerPublic}
                        onChange={() => setIsServerPublic(!isServerPublic)} />
                </BodyEditCategory>
                <div className="d-flex justify-content-center">
                    <Paper
                        elevation={4}
                        sx={{
                            bgcolor: '#272b30',
                            borderRadius: 10,
                            padding: 2,
                            cursor: 'pointer'
                        }}
                        onClick={onSaveModification}
                        className="px-5 py-3"
                    >
                        <div className="step-1-panel-join-bot-button">
                            {t('serveredit.serverEdit.saveModification')}
                        </div>
                    </Paper>
                </div>
            </>
            :
            <></>
            }
        </>
    );
}

function BodyEditCategory(props) {
    return (
        <div className="edit-category mb-3">
            <div
                className="mb-1 fs-6"
            >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}