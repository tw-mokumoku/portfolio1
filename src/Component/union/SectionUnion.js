/* faker-js */
import { faker } from '@faker-js/faker';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
/* react-bootstrap */
import { OpenableOverflowContainer, toButton } from '../parts/conversion';
import Row from 'react-bootstrap/Row';

export function TagListSection() {
    const tagButtons = toButton(faker.word.words(100).split(' ').map((v) => `${v} (${faker.number.int(100000)})`));

    return (
        <>
            <div className="d-flex justify-content-center">
                <h5>
                    人気タグ一覧
                </h5>
            </div>
            <OpenableOverflowContainer>
                {tagButtons}
            </OpenableOverflowContainer>
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