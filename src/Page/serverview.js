/* react-bootstrap */
import './serverview.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { getDiscordGuildIcon, getServer, getServerTags, getServerVCLogs } from '../Function/APIController';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ToButton } from '../Component/parts/conversion';
import { VCLogChartTabs } from '../Component/union/VCLogChartUnion';
import Stack from 'react-bootstrap/Stack';


export function ServerView() {
    const params = useParams();
    const [serverIcon, setServerIcon] = useState(<></>);
    const [currentServerName, setCurrentServerName] = useState();
    const [serverID, setServerID] = useState("");
    const [currentServerDescription, setCurrentServerDescription] = useState();

    useEffect(() => {
        setServerID(params['id']);
        getServer(params['id'])
            .then((response) => {
                let currentServer = response.data;
                const avatarStyle = { borderRadius: "100px", border: "2px solid lightblue", width: 120, height: 120 };
                // Sever Icon
                if (!currentServer['icon']) {
                    setServerIcon(
                        <Avatar
                            style={avatarStyle}
                        >
                            {currentServer['name'].slice(0, 2)}
                        </Avatar>
                    );
                } else {
                    setServerIcon(
                        <Avatar
                            src={
                                getDiscordGuildIcon(params['id'], currentServer['icon'])
                            }
                            style={avatarStyle}
                        />
                    );
                }
                // Set Current Server Name
                setCurrentServerName(currentServer['name']);
                // Set Current Server Description
                setCurrentServerDescription(currentServer['description']);
            });
    }, [params]);

    return (
        <Container>
            <HeaderUnion />
            <Row className="mt-5">
                <Card className="mb-4">
                    <Card.Header>
                        <ViewServerHeader
                            serverIcon={serverIcon}
                            currentServerName={currentServerName}
                            serverID={serverID}
                        />
                    </Card.Header>
                    <Card.Body>
                        <ViesServerBody
                            params={params}
                            currentServerDescription={currentServerDescription}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}
function ViewServerHeader(props) {
    return (
        <div className="d-flex flex-row mb-1">
            <div className="me-4">
                {props.serverIcon}
            </div>
            <div>
                <p className="fs-3 mb-0">{props.currentServerName}</p>
                <p className="fs-6">@{props.serverID}</p>
                <Button className="py-2 px-3">サーバーに参加</Button>
            </div>
        </div>
    );
}

function ViesServerBody(props) {
    const params = useParams();
    const [guildTags, setGuildTags] = useState();

    useEffect(() => {
        getServerTags(params['id']).then((response) => {
            setGuildTags(response.data.map(value => value['name']));
        });
    }, []);

    return (
        <div>
            <FirstEditCategory title="タグ">
            <div className="mb-3" style={{ height: '40px' }}>
                {ToButton(guildTags)}
            </div>
            </FirstEditCategory>
            <BodySeparater />
            <EditCategory title="概要">
                <p>{props.currentServerDescription}</p>
            </EditCategory>
            <BodySeparater />
            <EditCategory title="基本情報">
                <BasicInfo />
            </EditCategory>
            <BodySeparater />
            <EditCategory title="VC 接続グラフ">
                <VCLogChartTabs serverID={params['id']} />
            </EditCategory>
        </div>
    );
}
function BasicInfo(props) {
    return (
        <Row xs={2} md={3} xl={6}>
            <BasicInfoPanel
                title="ユーザー"
                data={"998"}
            />
            <BasicInfoPanel
                title="月間新規ユーザー"
                data={"54.08%"}
            />
            <BasicInfoPanel
                title="非アクティブユーザー"
                data={"76.34%"}
            />
            <BasicInfoPanel
                title="VC接続回数"
                data={"1,241"}
            />
            <BasicInfoPanel
                title="平均VC接続時間"
                data={"00:14:31"}
            />
            <BasicInfoPanel
                title="最終更新"
                data={"21時間前"}
            />
        </Row>
    );
}

function BasicInfoPanel(props) {
    return (
        <Col>
            <div className="basic-info-panel py-2">
                <div className="basic-info-panel-title">
                    {props.title}
                </div>
                <div className="fs-5">
                    {props.data}
                </div>
            </div>
        </Col>
    );
}

function BodySeparater(props) {
    return (
        <div className="server-view-body-separater"></div>
    );
}

function FirstEditCategory(props) {
    return (
        <div className="edit-category pb-2">
            <div
                className="mb-2 fs-6"
            >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}
function EditCategory(props) {
    return (
        <div className="edit-category pb-2">
            <div
                className="mb-2 fs-6 pt-4"
            >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}