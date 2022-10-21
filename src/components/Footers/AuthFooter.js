import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="pt-5 pb-0" style={{ background: "white" }}>
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="12" style={{ color: "#919eb4" }}>
              <Nav className="nav-footer justify-content-center">
                <NavItem>
                  <NavLink
                    href="https://palmautic.ru/why_palmautic"
                    target="_blank"
                    style={{
                      color: "#919eb4",
                      fontWeight: 300,
                      fontSize: 16,
                      marginRight: 48,
                    }}
                  >
                    Почему Palmautic?
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/"
                    target="_blank"
                    style={{
                      color: "#919eb4",
                      fontWeight: 300,
                      marginRight: 48,
                      fontSize: 16,
                    }}
                  >
                    License
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/"
                    target="_blank"
                    style={{
                      color: "#919eb4",
                      fontWeight: 300,
                      marginRight: 48,
                      fontSize: 16,
                    }}
                  >
                    FAQ
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col xl="12">
              <div
                className="copyright text-center text-muted m-5"
                style={{ fontWeight: 300, color: "#8896ae" }}
              >
                © {new Date().getFullYear()} Palmautic Solutions
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
