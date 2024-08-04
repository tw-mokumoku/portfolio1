/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar } from './searchBar';
export function BigTitle() {
    return (
        <Container className="d-flex my-5">
            <Stack className="justify-content-center align-items-center my-5">
                <h1 className="p-2">DiscordListへようこそ</h1>
                <p className="p-2 fs-6">サーバーを検索して友達を見つけましょう！</p>
                <SearchBar />
            </Stack>
            {/*
                <InputGroup className="mb-3" style={{ width: "70%" }}>
                    <InputGroup.Text>
                        <SearchIcon />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder={"タグを入力"}
                        aria-label=""
                        aria-describedby=""
                    />
                    <Button>検索</Button>
                </InputGroup>
            */}
        </Container>
    );
}