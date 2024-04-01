/* union */
import { HeaderUnion } from '../Component/union/headerUnion';
import { BigTitle } from '../Component/parts/bigSection';
import { TagListSection } from '../Component/union/SectionUnion';
/* faker-js */
import { faker } from '@faker-js/faker';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export function Home() {
    return (
        <>
            <HeaderUnion />
            <BigTitle />
            <TagListSection />
            <Container>
                <Row>
                    <Card className="mb-3 m-3" style={{ width: '28rem' }}>
                        <Card.Header>サーバー名</Card.Header>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                {faker.lorem.sentences({ min: 1, max: 5 }) }
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">3分前に更新</small>
                        </Card.Footer>
                    </Card>
                    <Card className="mb-3 m-3" style={{ width: '28rem' }}>
                        <Card.Header>サーバー名</Card.Header>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                {faker.lorem.sentences({ min: 1, max: 5 }) }
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                                <small className="text-muted">3分前に更新</small>
                        </Card.Footer>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

// meta 情報 section
// サーバーパネルズ section