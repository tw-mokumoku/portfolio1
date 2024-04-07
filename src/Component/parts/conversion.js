import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { FaDiscord } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

export function toButton(tag_names) {
    if (!Array.isArray(tag_names)) return tag_names
    return tag_names.map((tag_name) => <Button className="m-1 py-1 px-2 btn-secondary" key={`tag_${tag_name}`} href={`/tag/${tag_name}`}>{tag_name}</Button>);
}

export function GuildCard(props) {
    return (
        <Col>
            <Card className="m-2">
                <Card.Header>
                    <Stack direction="horizontal">
                        <div style={{ height: "60px" }} className="me-4">
                            <img src={props.guildIcon} alt="" className="w-100 h-100"></img>
                        </div>
                        <Card.Title>{props.guildName}</Card.Title>
                    </Stack>
                </Card.Header>
                <Card.Body className="pt-2">
                    <div className="mb-3">
                        {toButton(props.guildTags)}
                    </div>
                    <Card.Text>{props.guildDescription}</Card.Text>
                    <Accordion>
                        <Accordion.Item eventKey="0">
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
                                    <br></br>
                                    <thead>
                                        <tr>
                                            <th>アクティブ率</th>
                                            <th>順位</th>
                                            <th>時間</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>日間</td>
                                            <td>{props.guildDailyActiveRank} 位</td>
                                            <td>{props.guildDailyActiveRatio} 時間</td>
                                        </tr>
                                        <tr>
                                            <td>月間</td>
                                            <td>{props.guildMonthlyActiveRank} 位</td>
                                            <td>{props.guildMonthlyActiveRatio} 時間</td>
                                        </tr>
                                        <tr>
                                            <td>年間</td>
                                            <td>{props.guildYearlyActiveRank} 位</td>
                                            <td>{props.guildYearlyActiveRatio} 時間</td>
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