/* faker-js */
import { faker } from '@faker-js/faker';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
/* react-bootstrap */
import { toButton } from '../parts/conversion';

export function TagListSection() {
    const tagNames = [];
    for (let i = 0; i < 30; i++) {
        tagNames.push(
            faker.word.words(
                faker.number.int({ min: 1, max: 3 })
            )
        );
    }
    return (
        <Container style={{ width: "60%" }}>
            {toButton(tagNames)}
        </Container>
    );
}