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
import { Avatar } from '@mui/material';
import { getServerTags } from '../../Function/APIController';
import { useNavigate } from "react-router-dom";
import './conversion.css';
import { useTranslation } from "react-i18next";
import nl2br from 'react-newline-to-break';
export function ToButton(tag_names) {
    const navigate = useNavigate();
    if (!Array.isArray(tag_names)) return tag_names
    return tag_names.map((tag_name, index) => <Button className="m-1 my-2 py-1 px-2 btn-secondary" key={index} onClick={() => navigate(`/tag/${tag_name}`) }>{tag_name}</Button>);
    //return tag_names.map((tag_name, index) => <Button className="m-1 my-2 py-1 px-2 btn-secondary" key={index} href={`/tag/${tag_name}`}>{tag_name}</Button>);
}

// expect [{ name: '', count: '' }]
/*
export function toTagButton(tagData) {
    console.log(tagData);
    //if (!Array.isArray(tag_names)) return tag_names
    return toTagButton()
    return tag_names.map((tag_name, index) => <Button className="m-1 my-2 py-1 px-2 btn-secondary" key={index} href={`/tag/${tag_name}`}>{tag_name}</Button>);
}
*/
export function TagButton(props) {
    return <Button className="m-1 my-2 py-1 px-2 btn-secondary" href={`/tag/${props.tagName}`}>{props.tagName}</Button>;
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
        <div style={{ minHeight: '160px' }}>
            <div ref={ref} className="overflow-hidden" style={{ height: overflowHeight, fontSize: '1rem' }}>
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
        </div>
    );
}

export function GuildCard(props) {
    const navigate = useNavigate();
    const [guildtags, setGuildTags] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        getServerTags(props.guildID).then((response) => {
            setGuildTags(response.data.map(value => value['name']));
        });
    }, [props.guildID]);
    return (
        <Col>
            <Card cardName="m-3">
                <Card.Header>
                    <div className={props.cardTitleName}>
                        <button className="to-guild-view-button w-100" onClick={() => navigate(`/server/${props.guildID}`)}>
                            <Stack direction="horizontal">
                                <Avatar src={props.guildIcon} sx={{ width: 60, height: 60 }} className="sp-icon me-4" alt={props.guildName} variant="rounded">
                                    {props.guildName[0]}
                                </Avatar>
                                <Card.Title className="fs-5">{props.guildName}</Card.Title>
                            </Stack>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body className="pt-2">
                    <div className={props.cardTagClassName + " mb-3"} style={{ minHeight: '90px' }}>
                        {ToButton(guildtags)}
                    </div>
                    <OpenableOverflowContainer>
                        {nl2br(props.guildDescription)}
                    </OpenableOverflowContainer>
                    <div className={props.cardDataClassName + " guild-card-data-container"}>
                        {props.dataString}
                    </div>
                </Card.Body>
                <Card.Footer className="pb-4 d-flex justify-content-center">
                    <Button className="d-flex flex-row py-2" onClick={()=>window.open(props.guildInviteURL)}>
                        <div style={{ height: "100%", width: "23px" }} className="me-2">
                            <FaDiscord className="h-100 w-100" />
                        </div>
                        <div className="">
                            {t('conversion.guildCard.joinServer')}
                        </div>
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}