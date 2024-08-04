/* react-bootstrap */
import './serverview.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { getDiscordGuildIcon, getServer, getServerTags, getServerVCLogs } from '../Function/APIController';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Chart from "react-apexcharts";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { CssVarsProvider } from '@mui/joy/styles';
import TabPanel from '@mui/joy/TabPanel';
import { ToButton } from '../Component/parts/conversion';


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
    const [periodText, setPeriodText] = useState("");
    const periodTextChanger = (newPeriodText) => { setPeriodText(newPeriodText) }
    const [guildTags, setGuildTags] = useState();
    useEffect(() => {
        getServerTags(params['id']).then((response) => {
            setGuildTags(response.data.map(value => value['name']));
        });
    }, []);

    return (
        <div>
            <div className="mb-3" style={{ height: '40px' }}>
                {ToButton(guildTags)}
            </div>
            <p>{props.currentServerDescription}</p>
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
                        <VCLogChart xAxisUnit="day" periodTextChanger={periodTextChanger} {...props} />
                    </TabPanel>
                    <TabPanel value={1}>
                        <VCLogChart xAxisUnit="week" periodTextChanger={periodTextChanger} {...props} />
                    </TabPanel>
                    <TabPanel value={2}>
                        <VCLogChart xAxisUnit="month" periodTextChanger={periodTextChanger} {...props} />
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </div>
    );
}


function VCLogChart(props) {
    const [seriesData, setSeriesData] = useState([]);
    const [notExistText, setNotExistText] = useState("");
    const params = useParams();

    useEffect(() => {
        const todayEpoch = (Date.now() / 1000);
        const end_epoch = todayEpoch.toFixed();
        var start_epoch;
        var createPeriodLambda = (startDate, endDate) => {
            return `${startDate.getFullYear()}/${to2digit(startDate.getMonth())}/${to2digit(startDate.getDate())} ${to2digit(startDate.getHours())}:${to2digit(startDate.getMinutes())}` +
                " - " +
                `${endDate.getFullYear()}/${to2digit(endDate.getMonth())}/${to2digit(endDate.getDate())} ${to2digit(endDate.getHours())}:${to2digit(endDate.getMinutes())}`;
        }
        const to2digit = (value) => ('00' + value).slice(-2);

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
        getServerVCLogs(params['id'], start_epoch, end_epoch)
            .then((response) => {
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

                props.periodTextChanger(createPeriodLambda(startDate, endDate));

                // logsの接続数を算出しフォーマット
                var logs_formatted = [];
                var i = 0;
                logs.forEach(({ epoch, fluctuation }) => {
                    i += fluctuation;
                    logs_formatted.push({ epoch: epoch, userNum: i });
                });

                // logsをchart用データにフォーマット
                const daily_log_datas = logs_formatted.map(({ epoch, userNum }) => ([epoch, userNum]));
                setSeriesData(daily_log_datas);
            });
    }, []);


    return (
        <div className="views-server-body-chart-container">
            <div className="views-server-body-chart-container-child">
                <Chart
                    type="area"
                    series={[
                        {
                            name: '接続数',
                            data: seriesData
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
