/* react-bootstrap */
import './serverview.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@mui/material';
import { Navigate, useParams } from "react-router-dom";
import { HeaderUnion } from '../Component/union/headerUnion';
import { DashboardUserPanel } from '../Component/union/SectionUnion';
import { hasDiscordOAuthTokenCookie } from '../Function/OAuthController';
import { getDiscordGuildPreview, getDiscordGuildIcon, getServer, getServerVCLogs } from '../Function/APIController';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Chart from "react-apexcharts";
import { faker } from '@faker-js/faker';


export function ServerView() {
    const params = useParams();
    const [serverIcon, setServerIcon] = useState(<></>);
    const [currentServerName, setCurrentServerName] = useState();
    const [serverID, setServerID] = useState("");
    const [currentServerDescription, setCurrentServerDescription] = useState();
    const [currentServerVCLogs, setCurrentServerVCLogs] = useState();

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
                setCurrentServerDescription(currentServer['description'])
                // Get Server VC Logs via API
                /* APIリソース節約の為、一旦コメントアウト
                getServerVCLogs(currentServer['id']).then((response) => {
                    setCurrentServerVCLogs(response.data);
                });
                */
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
                            currentServerDescription={currentServerDescription}
                            currentServerVCLogs={currentServerVCLogs}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

function ViesServerBody(props) {
    const options = {
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
            text: "直近24時間のデータが存在しません",
            style: {
                fontSize: '10px'
            }
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            enabled: true,
            followCursor: true,
            fillSeriesColor: true,
            theme: 'dark'
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#454e56',
                    fontSize: '14px'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false,
            labels: {
                style: {
                    colors: '#454e56',
                    fontSize: '14px'
                }
            },
            tickAmount: 20
        },
        chart: {
            toolbar: {
                show: false
            }
        }
    };
    const series = [
        {
            name: '接続数',
            data: [...Array(24)].map(() => faker.number.int(20))
        }
    ];

    useEffect(() => {
        if (!props.currentServerVCLogs) return;
        //途中
        props.currentServerVCLogs.map(({ server_id, member_id, start_epoch, interval_sec }) => ({ start_epoch, interval_sec }));
    }, [props.currentServerVCLogs]);

    return (
        <div>
            <p>{props.currentServerDescription}</p>
            <div className="views-server-body-chart-container">
                <div className="views-server-body-chart-container-child">
                    <Chart
                        type="area"
                        series={series}
                        width="100%"
                        height="100%"
                        options={options}
                    />
                </div>
            </div>
        </div>
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

