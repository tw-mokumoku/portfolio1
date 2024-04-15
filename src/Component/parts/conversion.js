import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { FaDiscord } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useOverflowDetector } from 'react-detectable-overflow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { useEffect } from 'react';

export function toButton(tag_names) {
    if (!Array.isArray(tag_names)) return tag_names
    return tag_names.map((tag_name, index) => <Button className="m-1 py-1 px-2 btn-secondary" key={index} href={`/tag/${tag_name}`}>{tag_name}</Button>);
}

export function OpenableOverflowContainer(props) {
    const { ref, overflow } = useOverflowDetector({});
    const [buttonImg, setButtonImg] = useState(<KeyboardArrowDownIcon />);
    const [isOpen, setIsOpen] = useState(false);
    const [buttonClassName, setButtonClassName] = useState();
    const [overflowHeight, setOverflowHeight] = useState("100px");
    const [buttonStyle, setButtonStyle] = useState();
    useEffect(() => {
        if (isOpen) {
            setOverflowHeight("auto");
            setButtonImg(<KeyboardArrowUpIcon />);
            setButtonStyle({
                zIndex: "999",
                marginTop: "10px",
            });
            setButtonClassName("p-1 mb-1");
        } else {
            setOverflowHeight("100px");
            setButtonImg(<KeyboardArrowDownIcon />);
            setButtonStyle({
                zIndex: "999",
                marginTop: "-20px",
            });
            setButtonClassName("p-3 mb-3");
        }
    }, [isOpen]);
    return (
        <>
            <div ref={ref} className="overflow-hidden" style={{ height: overflowHeight }}>
                {props.children}
            </div>
            <div className="w-100">
                <div className="d-flex justify-content-center">
                    {
                        overflow || isOpen ?
                            <Button onClick={() => setIsOpen(!isOpen)} className={buttonClassName} style={buttonStyle}>
                                {buttonImg}
                            </Button>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    );
}

export function GuildCard(props) {
    return (
        <Col>
            <Card className="m-2">
                <Card.Header>
                    <Stack direction="horizontal">
                        <div style={{ height: "60px", width: "60px" }} className="me-4">
                            <img src={props.guildIcon} alt="" className="w-100 h-100" style={{ borderRadius: "10px", border: "2px solid lightblue" }}></img>
                        </div>
                        <Card.Title>{props.guildName}</Card.Title>
                    </Stack>
                </Card.Header>
                <Card.Body className="pt-2">
                    <div className="mb-3">
                        {toButton(props.guildTags)}
                    </div>
                    <OpenableOverflowContainer>
                        {props.guildDescription}
                    </OpenableOverflowContainer>
                    <Accordion>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>サーバー情報</Accordion.Header>
                            <Accordion.Body>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>最終更新日</td>
                                            <td>{props.guildLastUpdated}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <br></br>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>アクティブ率</th>
                                            <th>順位</th>
                                            <th>時間(h)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>日間</td>
                                            <td>{shortNumber(props.guildDailyActiveRank)}</td>
                                            <td>{shortNumber(props.guildDailyActiveRatio)}</td>
                                        </tr>
                                        <tr>
                                            <td>月間</td>
                                            <td>{shortNumber(props.guildMonthlyActiveRank)}</td>
                                            <td>{shortNumber(props.guildMonthlyActiveRatio)}</td>
                                        </tr>
                                        <tr>
                                            <td>年間</td>
                                            <td>{shortNumber(props.guildYearlyActiveRank)}</td>
                                            <td>{shortNumber(props.guildYearlyActiveRatio)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Card.Footer className="pb-4 d-flex justify-content-center">
                    <Button className="d-flex flex-row py-2">
                        <div style={{ height: "100%", width: "23px" }} className="me-2">
                            <FaDiscord className="h-100 w-100" />
                        </div>
                        <div className="">
                            サーバーに参加する
                        </div>
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}

function shortNumber(number) {
    const num = number.toString();
    if (number >= 1000000) return `${num.slice(0,-6)}.${num.slice(-6, -5)}m`;
    if (number >= 1000) return `${num.slice(0, -3)}.${num.slice(-3, -2)}k`;
    return number.toString();
}