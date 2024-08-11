/* container */
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { SearchBar } from './searchBar';
import { useTranslation } from "react-i18next";


export function BigTitle() {
    const { t } = useTranslation();
    // DiscordListへようこそ
    return (
        <Container className="d-flex my-5">
            <Stack className="justify-content-center align-items-center my-5">
                <h1 className="p-2">{t('home.bigSection.title')}</h1>
                <p className="p-2 fs-6">{t('home.bigSection.subtitle')}</p>
                <SearchBar />
            </Stack>
        </Container>
    );
    // <SearchBar />
}