import Tab, { tabClasses } from '@mui/joy/Tab';
import { CssVarsProvider } from '@mui/joy/styles';
import TabPanel from '@mui/joy/TabPanel';
import { useEffect, useState } from 'react';
import { getServerVCLogs } from '../../Function/APIController';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Chart from "react-apexcharts";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export function VCLogChartTabs(props) {
    return (
        <CssVarsProvider
            defaultMode="dark"
        >
            <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                <TabList
                    disableUnderline
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        borderRadius: 'xl',
                        bgcolor: '#1a1d21',
                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                            boxShadow: 'sm',
                            bgcolor: '#30373d',
                        },
                    }}
                >
                    <Tab disableIndicator color='#ffffff'>日間</Tab>
                    <Tab disableIndicator color='#ffffff'>週間</Tab>
                    <Tab disableIndicator color='#ffffff'>月間</Tab>
                    <div className="ms-auto d-flex align-items-center">
                        <div style={{ marginRight: '10px', color: '#e3e5e8' }}>
                            {props.periodText}
                        </div>
                    </div>
                </TabList>
                <TabPanel value={0}>
                    <VCLogInfo
                        activeUserCount={props.dailyVCLogInfoData['activeUserCount']}
                        vcConnectCount={props.dailyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={props.dailyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={props.dailyVCLogInfoData['vcMaxConnectTime']}
                    />
                    <VCLogChart xAxisUnit="day" seriesData={props.dailySeriesData} serverVCLogsAPIRequestLimiter={props.serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
                <TabPanel value={1}>
                    <VCLogInfo
                        activeUserCount={props.monthlyVCLogInfoData['activeUserCount']}
                        vcConnectCount={props.monthlyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={props.monthlyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={props.monthlyVCLogInfoData['vcMaxConnectTime']}
                    />
                    <VCLogChart xAxisUnit="week" seriesData={props.weeklySeriesData} serverVCLogsAPIRequestLimiter={props.serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
                <TabPanel value={2}>
                    <VCLogInfo
                        activeUserCount={props.yearlyVCLogInfoData['activeUserCount']}
                        vcConnectCount={props.yearlyVCLogInfoData['vcConnectCount']}
                        vcAverageTime={props.yearlyVCLogInfoData['vcAverageTime']}
                        vcMaxConnectTime={props.yearlyVCLogInfoData['vcMaxConnectTime']}
                    />
                    <VCLogChart xAxisUnit="month" seriesData={props.monthlySeriesData} serverVCLogsAPIRequestLimiter={props.serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
            </Tabs>
        </CssVarsProvider>
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
            <div className="basic-info-panel py-2" style={{ color: 'white' }}>
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

function VCLogChart(props) {
    const [notExistText, setNotExistText] = useState("");

    useEffect(() => {
        const todayEpoch = (Date.now() / 1000);
        const end_epoch = todayEpoch.toFixed();
        var start_epoch;

        if (props.xAxisUnit === "day") {
            setNotExistText("直近24時間のデータが存在しません");
            start_epoch = (todayEpoch - 86400).toFixed();
        }
        if (props.xAxisUnit === "week") {
            setNotExistText("直近7日間のデータが存在しません");
            start_epoch = (todayEpoch - 604800).toFixed();
        }
        if (props.xAxisUnit === "month") {
            setNotExistText("直近30日間のデータが存在しません");
            start_epoch = (todayEpoch - 2592000).toFixed();
        }
        // Get Daily Server VC Logs
        props.serverVCLogsAPIRequestLimiter(start_epoch, end_epoch, props.xAxisUnit);
    }, []);


    return (
        <div className="views-server-body-chart-container">
            <div className="views-server-body-chart-container-child">
                <Chart
                    type="area"
                    series={[
                        {
                            name: '接続数',
                            data: props.seriesData ? props.seriesData : []
                        }
                    ]}
                    width="100%"
                    height="100%"
                    options={{
                        dataLabels: {
                            enabled: false
                        },
                        grid: {
                            show: false
                        },
                        fill: {
                            opacity: 0.1,
                            type: 'gradient',
                            gradient: {
                                shade: 'dark',
                                shadeIntensity: 1,
                                opacityFrom: 0.3,
                                opacityTo: 0
                            }
                        },
                        noData: {
                            text: notExistText,
                            style: {
                                color: '#9ea7af',
                                fontSize: '15px'
                            }
                        },
                        stroke: {
                            curve: 'stepline'
                        },
                        tooltip: {
                            enabled: true,
                            followCursor: true,
                            fillSeriesColor: true,
                            theme: 'dark'
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    colors: '#454e56',
                                    fontSize: '14px'
                                },
                                formatter: (timestamp) => {
                                    var date = new Date(timestamp * 1000);
                                    const to2digit = (value) => ('00' + value).slice(-2);
                                    var dayWord = "th";
                                    if (date.getDate() == 1) dayWord = "st";
                                    if (date.getDate() == 2) dayWord = "nd";
                                    if (date.getDate() == 3) dayWord = "rd";
                                    var ampm = "pm";
                                    if (to2digit(date.getHours()) <= 12) ampm = "am"

                                    if (props.xAxisUnit === "day")
                                        return "" +
                                            `${to2digit(date.getHours())}:` +
                                            `${to2digit(date.getMinutes())}`;
                                    if (props.xAxisUnit === "week") {
                                        return "" +
                                            `${date.getDate()}${dayWord}` +
                                            `${to2digit(date.getHours())}${ampm}`;
                                    }
                                    if (props.xAxisUnit === "month")
                                        return "" +
                                            `${to2digit(date.getDate())}${dayWord}`;
                                }
                            },
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                        },
                        yaxis: {
                            show: false,
                        },
                        chart: {
                            toolbar: {
                                show: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}