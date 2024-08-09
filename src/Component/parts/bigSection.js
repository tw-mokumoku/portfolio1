/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { SearchBar } from './searchBar';
export function BigTitle() {
    return (
        <Container className="d-flex my-5">
            <Stack className="justify-content-center align-items-center my-5">
                <h1 className="p-2">DiscordListへようこそ</h1>
                <p className="p-2 fs-6">サーバーを検索して友達を見つけましょう！</p>
                <SearchBar />
            </Stack>
        </Container>
    );
    // <SearchBar />
}