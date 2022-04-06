import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar className="nav-bg-custom" expand="lg">
      <Container>
        <Navbar.Brand href="/">Kit Kat Corner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/Forum">Forum</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
          </Nav>
          <Button className="nav-button" type="submit" variant="outline-light" href='/Login'>Login</Button>
          <Button className="nav-button" type="submit" variant="outline-info" href='/Register'>Register</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar