/* faker-js */
import { faker } from '@faker-js/faker';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
/* react-bootstrap */
import { toButton } from '../parts/conversion';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

export function TagListSection() {
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState({ height: "100px" });
    const tagButtons = toButton(faker.word.words(100).split(' ').map((v) => `${v} (${faker.number.int(100000)})`));
    useEffect(() => {
        if (visible) setStyle({ height: "auto" });
        else setStyle({ height: "100px" });
    }, [visible])
    return (
        <>
            <div className="d-flex justify-content-center">
                <h5>
                人気タグ一覧
                </h5>
            </div>
            <div className="overflow-y-hidden p-2" style={style}>
                {tagButtons}
            </div>
            <div className="d-flex justify-content-center">
                <Button onClick={() => setVisible(!visible)}>
                    <ExpandMoreIcon />
                </Button>
            </div>
        </>
    );
}

export function GuildCardContainer(props) {
    return (
        <Row xs={1} md={2} xl={3} className="mt-5 gx-0">
            {props.children}
        </Row>
    );
}