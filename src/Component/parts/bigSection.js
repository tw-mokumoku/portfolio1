/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getPrefersColorScheme } from '../../Function/ThemeController';
export function BigTitle() {
    return (
        <Container className="d-flex" style={{ height: "300px" }}>
            <Stack className="justify-content-center align-items-center">
                <h1 className="p-2">DiscordListへようこそ</h1>
                <p className="p-2 fs-6">サーバーを検索して友達を見つけましょう！</p>
                <InputGroup className="mb-3" style={{ width: "60%" }}>
                    <Form.Control
                        placeholder="サーバー名"
                        aria-label=""
                        aria-describedby=""
                    />
                    <Button>検索</Button>
                </InputGroup>
            </Stack>
        </Container>
    );
}