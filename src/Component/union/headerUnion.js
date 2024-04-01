import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { switchPrefersColorScheme } from '../../Function/ThemeController';
import LightModeIcon from '@mui/icons-material/LightMode';
export function HeaderUnion() {
    return (
        <Navbar expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">Discord List</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav variant="underline" className="me-auto">
                        <Nav.Link href="/search">検索</Nav.Link>
                        <Nav.Link href="/server">サーバー</Nav.Link>
                        <Nav.Link href="/ranking">レビュー</Nav.Link>
                        <NavDropdown title="更新順">
                            <NavDropdown.Item href="/">更新順</NavDropdown.Item>
                            <NavDropdown.Item href="/">日間アクティブ率</NavDropdown.Item>
                            <NavDropdown.Item href="/">月間アクティブ率</NavDropdown.Item>
                            <NavDropdown.Item href="/">年間アクティブ率</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Row>
                            <Col xs="auto">
                                <Button onClick={() => {
                                    switchPrefersColorScheme();
                                    window.location.reload();
                                }}><LightModeIcon /></Button>
                            </Col>
                            <Col xs="auto">
                                <Button>ログイン</Button>
                            </Col>
                        </Row>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

