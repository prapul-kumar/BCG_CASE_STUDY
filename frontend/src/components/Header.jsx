import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export default function Header() {
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      style={{
        backgroundImage: "linear-gradient(15deg, #00be71 0%, #13547a 100%)",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <b>BCG Insurance</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/" className="active">
              Home <i class="bi bi-house-door-fill"></i>
            </Nav.Link>
            <Nav.Link eventKey={2} href="/analytics" className="active">
              Analytics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
