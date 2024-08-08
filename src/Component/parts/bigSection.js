/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar } from './searchBar';
import { useState } from 'react';
export function BigTitle() {
    const [formValue, setFormValue] = useState('');

    const onEnter = (event) => {
        if (event.key !== "Enter") return;
        setFormValue(event.key);
    }

    return (
        <Container className="d-flex my-5">
            <Stack className="justify-content-center align-items-center my-5">
                <h1 className="p-2">DiscordListへようこそ</h1>
                <p className="p-2 fs-6">サーバーを検索して友達を見つけましょう！</p>
                <div className="w-75">
                <InputGroup className="mt-3">
                    <InputGroup.Text id="basic-addon1">
                        <SearchIcon />
                    </InputGroup.Text>
                    <Form.Control
                        value={formValue}
                        onChange={e => setFormValue(e.target.value)}
                        placeholder=""
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onKeyDown={onEnter}
                    />
                </InputGroup>
                </div>
            </Stack>
        </Container>
    );
    // <SearchBar />
}