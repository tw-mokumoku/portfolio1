import { useEffect, useRef } from 'react';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { getServerTags, getServerVCLogs } from '../../Function/APIController';
import { ToButton } from '../parts/conversion';
import { VCLogChartTabs } from './VCLogChartUnion';
import Row from 'react-bootstrap/Row';
import { useTranslation } from "react-i18next";
import { timeDiff } from '../../Function/DateCalc';

export function ViewServerBody(props) {
    const { t } = useTranslation();
    const params = useParams();
    //const [guildTags, setGuildTags] = useState();
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

    const VCLogInfoContainerRef = useRef(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        const checkVCLogInfoElementDisplay = () => {
            if (window.getComputedStyle(VCLogInfoContainerRef.current).display == 'block') setShowPeriodVCLogInfo(true);
            else setShowPeriodVCLogInfo(false);
        }
        checkVCLogInfoElementDisplay();
        window.onresize = () => checkVCLogInfoElementDisplay();
        // chart用
        /*
        getServerTags(params['id']).then((response) => {
            setGuildTags(response.data.map(value => value['name']));
        });
        */
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
            <EditCategory title={t('viewServerBodyUnion.viewServerBody.basicInfoTitle')}>
                <BasicInfo {...props} />
            </EditCategory>
            <div className="vc-log-info-container d-display d-md-none" ref={VCLogInfoContainerRef}>
                <BodySeparater />
                <EditCategory title={t('viewServerBodyUnion.viewServerBody.dailyInfoTitle')}>
                    <VCLogInfo
                        activeUserCount={dailyVCLogInfoData['activeUserCount']}
                        vcConnectCount={dailyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={dailyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={dailyVCLogInfoData['vcMaxConnectTime']}
                    />
                </EditCategory>
                <EditCategory title={t('viewServerBodyUnion.viewServerBody.weeklyInfoTitle')}>
                    <VCLogInfo
                        activeUserCount={monthlyVCLogInfoData['activeUserCount']}
                        vcConnectCount={monthlyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={monthlyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={monthlyVCLogInfoData['vcMaxConnectTime']}
                    />
                </EditCategory>
                <EditCategory title={t('viewServerBodyUnion.viewServerBody.monthlyInfoTitle')}>
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
                <EditCategory title={t('viewServerBodyUnion.viewServerBody.vcConnectionGraphTitle')}>
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
            <BodySeparater />
            <EditCategory title={t('viewServerBodyUnion.viewServerBody.descriptionTitle')}>
                <p className="view-server-body-description">
                    {props.currentServerDescription}
                </p>
            </EditCategory>
        </div>
    );
}
function BasicInfo(props) {
    const { t } = useTranslation();
    return (
        <Row xs={2} md={4} xl={4}>
            <BasicInfoPanel
                title={t('viewServerBodyUnion.basicInfo.latestUpdatedDate')}
                data={
                    props.serverUpdatedLog ?
                        timeDiff(t, new Date(props.serverUpdatedLog['updated_epoch'] * 1000))
                        :
                        t('viewServerBodyUnion.basicInfo.failedToGetData')
                }
            />
            <BasicInfoPanel
                title={t('viewServerBodyUnion.basicInfo.vcConnectionNumber')}
                data={props.serverCurrentUpdatedLog ? props.serverCurrentUpdatedLog['user_num'] : t('viewServerBodyUnion.basicInfo.failedToGetData')}
            />
        </Row>
    );
}
function VCLogInfo(props) {
    const { t } = useTranslation();
    const numDataString = (data) => {
        return data ? data : "0";
    };
    const timeDataString = (data) => {
        return data ? data : "00:00:00";
    };
    return (
        <Row xs={2} md={4} xl={4}>
            <BasicInfoPanel
                title={t('viewServerBodyUnion.vcLogInfo.activeUser')}
                data={numDataString(props.activeUserCount)}
            />
            <BasicInfoPanel
                title={t('viewServerBodyUnion.vcLogInfo.vcConnectionNumber')}
                data={numDataString(props.vcConnectCount)}
            />
            <BasicInfoPanel
                title={t('viewServerBodyUnion.vcLogInfo.avarageConnectionTime')}
                data={timeDataString(props.vcAverageTime)}
            />
            <BasicInfoPanel
                title={t('viewServerBodyUnion.vcLogInfo.maxConnectionTime')}
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

export function FirstEditCategory(props) {
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