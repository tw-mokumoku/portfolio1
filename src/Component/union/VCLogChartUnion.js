import Tab, { tabClasses } from '@mui/joy/Tab';
import { CssVarsProvider } from '@mui/joy/styles';
import TabPanel from '@mui/joy/TabPanel';
import { useEffect, useState } from 'react';
import { getServerVCLogs } from '../../Function/APIController';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Chart from "react-apexcharts";

export function VCLogChartTabs(props) {
    const [periodText, setPeriodText] = useState("");
    const [dailySeriesData, setDailySeriesData] = useState();
    const [weeklySeriesData, setWeeklySeriesData] = useState();
    const [monthlySeriesData, setMonthlySeriesData] = useState();
    const serverVCLogsAPIRequestLimiter = (start_epoch, end_epoch, xAxisUnit) => {
        if (xAxisUnit == "day" && dailySeriesData != null) return;
        if (xAxisUnit == "week" && weeklySeriesData != null) return;
        if (xAxisUnit == "month" && monthlySeriesData != null) return;
        getServerVCLogs(props.serverID, start_epoch, end_epoch)
            .then((response) => {
                const to2digit = (value) => ('00' + value).slice(-2);
                var createPeriodLambda = (startDate, endDate) => {
                    return `${startDate.getFullYear()}/${to2digit(startDate.getMonth())}/${to2digit(startDate.getDate())} ${to2digit(startDate.getHours())}:${to2digit(startDate.getMinutes())}` +
                        " - " +
                        `${endDate.getFullYear()}/${to2digit(endDate.getMonth())}/${to2digit(endDate.getDate())} ${to2digit(endDate.getHours())}:${to2digit(endDate.getMinutes())}`;
                }
                // logが存在しない場合は戻る。
                if (!response.data || response.data.length == 0) return;
                var logs = [];
                logs.push({ epoch: Number(start_epoch), fluctuation: 0 });
                logs.push({ epoch: Number(end_epoch), fluctuation: 0 });
                // logsをフォーマット
                response.data.forEach(({ server_id, member_id, start_epoch, interval_sec }) => {
                    if (interval_sec < 600) return;
                    logs.push({ epoch: Number(start_epoch), fluctuation: 1 });
                    logs.push({ epoch: (Number(start_epoch) + Number(interval_sec)), fluctuation: -1 });
                });

                // logsの順番を並び替え
                logs.sort((a, b) => a.epoch > b.epoch ? 1 : -1);
                const startDate = new Date(logs[0]['epoch'] * 1000);
                const endDate = new Date(logs.slice(-1)[0]['epoch'] * 1000);

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
                if (xAxisUnit == "day") setDailySeriesData(log_datas);
                if (xAxisUnit == "week") setWeeklySeriesData(log_datas);
                if (xAxisUnit == "month") setMonthlySeriesData(log_datas);

            });
    }
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
                            {periodText}
                        </div>
                    </div>
                </TabList>
                <TabPanel value={0}>
                    <VCLogChart xAxisUnit="day" seriesData={dailySeriesData} serverVCLogsAPIRequestLimiter={serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
                <TabPanel value={1}>
                    <VCLogChart xAxisUnit="week" seriesData={weeklySeriesData} serverVCLogsAPIRequestLimiter={serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
                <TabPanel value={2}>
                    <VCLogChart xAxisUnit="month" seriesData={monthlySeriesData} serverVCLogsAPIRequestLimiter={serverVCLogsAPIRequestLimiter} {...props} />
                </TabPanel>
            </Tabs>
        </CssVarsProvider>
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
                            data: props.seriesData
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