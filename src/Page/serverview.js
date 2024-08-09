/* react-bootstrap */
import './serverview.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { getDiscordGuildIcon, getServer, getServerCurrentActiveUsers, getServerTags, getServerUpdatedLog, getServerVCLogs } from '../Function/APIController';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ToButton } from '../Component/parts/conversion';
import { VCLogChartTabs } from '../Component/union/VCLogChartUnion';
import Stack from 'react-bootstrap/Stack';
import { OverlayLoading } from "react-loading-randomizable";
import { timeDiff } from '../Function/DateCalc';
import { useRef } from 'react';


export function ServerView() {
    const params = useParams();
    const [serverIcon, setServerIcon] = useState(<></>);
    const [currentServerName, setCurrentServerName] = useState();
    const [serverID, setServerID] = useState("");
    const [currentServerDescription, setCurrentServerDescription] = useState();
    const [loading, setLoading] = useState(true);
    const [currentServer, setCurrentServer] = useState({});
    const [serverUpdatedLog, setServerUpdatedLog] = useState();
    const [serverCurrentUpdatedLog, setServerCurrentUpdatedLog] = useState();

    useEffect(() => {
        setServerID(params['id']);
        getServer(params['id'])
            .then((response) => {
                let currentServer = response.data;
                setCurrentServer(response.data);
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
                setLoading(false);
            });
        getServerUpdatedLog(params['id'])
            .then((response) => {
                setServerUpdatedLog(response.data);
            });
        getServerCurrentActiveUsers(params['id'])
            .then((response) => {
                setServerCurrentUpdatedLog(response.data);
            })
    }, [params]);

    return (
        <>
            <OverlayLoading active={loading} />
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
                                currentServer={currentServer}
                                serverUpdatedLog={serverUpdatedLog}
                                serverCurrentUpdatedLog={serverCurrentUpdatedLog}
                            />
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
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
    const [showPeriodVCLogInfo, setShowPeriodVCLogInfo] = useState(false);

    // chart用
    const [periodText, setPeriodText] = useState("");
    const [dailySeriesData, setDailySeriesData] = useState();
    const [weeklySeriesData, setWeeklySeriesData] = useState();
    const [monthlySeriesData, setMonthlySeriesData] = useState();
    const defaultVCLogInfoData = { activeUserCount: "", vcConnectCount: "", vcAverageTime: "", vcMaxConnectTime: "" };
    const [dailyVCLogInfoData, setDailyVCLogInfoData] = useState(defaultVCLogInfoData);
    const [monthlyVCLogInfoData, setMonthlyVCLogInfoData] = useState(defaultVCLogInfoData);
    const [yearlyVCLogInfoData, setYearlyVCLogInfoData] = useState(defaultVCLogInfoData);
    const serverVCLogsAPIRequestLimiter = (start_epoch, end_epoch, xAxisUnit) => {
        if (xAxisUnit == "day" && dailySeriesData != null) return;
        if (xAxisUnit == "week" && weeklySeriesData != null) return;
        if (xAxisUnit == "month" && monthlySeriesData != null) return;
        getServerVCLogs(params['id'], start_epoch, end_epoch)
            .then((response) => {
                const to2digit = (value) => ('00' + value).slice(-2);
                var createPeriodLambda = (startDate, endDate) => {
                    return `${startDate.getFullYear()}/${to2digit(startDate.getMonth() + 1)}/${to2digit(startDate.getDate())} ${to2digit(startDate.getHours())}:${to2digit(startDate.getMinutes())}` +
                        " - " +
                        `${endDate.getFullYear()}/${to2digit(endDate.getMonth() + 1)}/${to2digit(endDate.getDate())} ${to2digit(endDate.getHours())}:${to2digit(endDate.getMinutes())}`;
                }
                // logが存在しない場合は戻る。
                if (!response.data || response.data.length == 0) return;
                var logs = [];
                // logsをフォーマット
                response.data.forEach(({ server_id, member_id, start_epoch, interval_sec }) => {
                    logs.push({ epoch: Number(start_epoch), fluctuation: 1 });
                    logs.push({ epoch: (Number(start_epoch) + Number(interval_sec)), fluctuation: -1 });
                });
                logs.push({ epoch: Number(start_epoch), fluctuation: 0 });
                logs.push({ epoch: Number(end_epoch), fluctuation: 0 });

                // logsの順番を並び替え
                logs.sort((a, b) => a.epoch > b.epoch ? 1 : -1);
                const startDate = new Date(logs[0]['epoch'] * 1000);
                const endDate = new Date(logs.slice(-1)[0]['epoch'] * 1000);

                console.log(createPeriodLambda(startDate, endDate));
                setPeriodText(createPeriodLambda(startDate, endDate));

                // logsの接続数を算出しフォーマット
                var logs_formatted = [];
                var i = 0;
                logs.forEach(({ epoch, fluctuation }) => {
                    i += fluctuation;
                    logs_formatted.push({ epoch: epoch, userNum: i });
                });

                // logsをchart用データにフォーマット
                const log_datas = logs_formatted.map(({ epoch, userNum }) => ([epoch, userNum]));
                const intervalSecArr = response.data.map(value => Number(value['interval_sec']));
                const avarageIntervalSec = Math.trunc(intervalSecArr.reduce((a, b) => a + b) / intervalSecArr.length);
                const maxIntervalSec = Math.max(...intervalSecArr);
                const toReadableTimeString = (sec) => {
                    let hour = Math.floor(sec / 3600);
                    let min = Math.floor(sec % 3600 / 60);
                    let rem = sec % 60;
                    return `${to2digit(hour)}:${to2digit(min)}:${to2digit(rem)}`;
                }
                const vcLogInfoData = {
                    activeUserCount: Array.from(new Set(response.data.map(value => value['member_id']))).length,
                    vcConnectCount: response.data.length,
                    vcAverageTime: toReadableTimeString(avarageIntervalSec),
                    vcMaxConnectTime: toReadableTimeString(maxIntervalSec)
                };

                if (xAxisUnit == "day") {
                    setDailySeriesData(log_datas);
                    setDailyVCLogInfoData(vcLogInfoData);
                }
                if (xAxisUnit == "week") {
                    setWeeklySeriesData(log_datas);
                    setMonthlyVCLogInfoData(vcLogInfoData);
                }
                if (xAxisUnit == "month") {
                    setMonthlySeriesData(log_datas);
                    setYearlyVCLogInfoData(vcLogInfoData);
                }
            });
    }

    const test = useRef(null);
    useEffect(() => {
        const checkVCLogInfoElementDisplay = () => {
            if (window.getComputedStyle(test.current).display == 'block') setShowPeriodVCLogInfo(true);
            else setShowPeriodVCLogInfo(false);
        }
        checkVCLogInfoElementDisplay();
        window.onresize = () => checkVCLogInfoElementDisplay();
        // chart用
        getServerTags(params['id']).then((response) => {
            setGuildTags(response.data.map(value => value['name']));
        });
    }, []);

    useEffect(() => {
        if (!showPeriodVCLogInfo) return;
        const todayEpoch = (Date.now() / 1000);
        const end_epoch = todayEpoch.toFixed();

        serverVCLogsAPIRequestLimiter((todayEpoch - 86400).toFixed(), end_epoch, "day");
        serverVCLogsAPIRequestLimiter((todayEpoch - 604800).toFixed(), end_epoch, "week");
        serverVCLogsAPIRequestLimiter((todayEpoch - 2592000).toFixed(), end_epoch, "month");
    }, [showPeriodVCLogInfo])

    return (
        <div>
            <FirstEditCategory title="タグ">
            <div className="mb-3" style={{ minHeight: '40px' }}>
                {ToButton(guildTags)}
            </div>
            </FirstEditCategory>
            <BodySeparater />
            <EditCategory title="概要">
                <p className="view-server-body-description">
                    {props.currentServerDescription}
                </p>
            </EditCategory>
            <BodySeparater />
            <EditCategory title="基本情報">
                <BasicInfo {...props} />
            </EditCategory>
            <div className="d-display d-md-none" ref={test}>
                <BodySeparater />
                <EditCategory title="日間情報">
                    <VCLogInfo
                        activeUserCount={dailyVCLogInfoData['activeUserCount']}
                        vcConnectCount={dailyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={dailyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={dailyVCLogInfoData['vcMaxConnectTime']}
                    />
                </EditCategory>
                <EditCategory title="週間情報">
                    <VCLogInfo
                        activeUserCount={monthlyVCLogInfoData['activeUserCount']}
                        vcConnectCount={monthlyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={monthlyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={monthlyVCLogInfoData['vcMaxConnectTime']}
                    />
                </EditCategory>
                <EditCategory title="月間情報">
                    <VCLogInfo
                        activeUserCount={yearlyVCLogInfoData['activeUserCount']}
                        vcConnectCount={yearlyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={yearlyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={yearlyVCLogInfoData['vcMaxConnectTime']}
                    />
                </EditCategory>
            </div>
            <div className="d-none d-md-block">
                <BodySeparater />
            </div>
            <div className="d-none d-md-block">
                <EditCategory title="VC 接続グラフ">
                    <VCLogChartTabs
                        serverID={params['id']}
                        periodText={periodText}
                        dailySeriesData={dailySeriesData}
                        weeklySeriesData={weeklySeriesData}
                        monthlySeriesData={monthlySeriesData}
                        serverVCLogsAPIRequestLimiter={serverVCLogsAPIRequestLimiter}
                        dailyVCLogInfoData={dailyVCLogInfoData}
                        monthlyVCLogInfoData={monthlyVCLogInfoData}
                        yearlyVCLogInfoData={yearlyVCLogInfoData}
                    />
                </EditCategory>
            </div>
        </div>
    );
}
function BasicInfo(props) {
    return (
        <Row xs={2} md={4} xl={4}>         
            <BasicInfoPanel
                title="最終更新日"
                data={
                    props.serverUpdatedLog ?
                        timeDiff(new Date(props.serverUpdatedLog['updated_epoch'] * 1000))
                        :
                        "データ取得失敗"
                    }
            />
            <BasicInfoPanel
                title="VC人数"
                data={props.serverCurrentUpdatedLog ? props.serverCurrentUpdatedLog['user_num'] : "データ取得失敗"}
            />
        </Row>
    );
}
function VCLogInfo(props) {
    const numDataString = (data) => {
        return data ? data : "0";
    };
    const timeDataString = (data) => {
        return data ? data : "00:00:00";
    };
    return (
        <Row xs={2} md={4} xl={4}>
            <BasicInfoPanel
                title="アクティブユーザー"
                data={numDataString(props.activeUserCount)}
            />
            <BasicInfoPanel
                title="VC接続回数"
                data={numDataString(props.vcConnectCount)}
            />
            <BasicInfoPanel
                title="平均VC接続時間"
                data={timeDataString(props.vcAverageTime)}
            />
            <BasicInfoPanel
                title="最高VC接続時間"
                data={timeDataString(props.vcMaxConnectTime)}
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