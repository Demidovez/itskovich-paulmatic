import {
  Card,
  CardHeader,
  Container,
  Row,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import "./Menu.scss";

const Menu = ({ logo, routes }) => {
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            // onClick={closeCollapse}
            className="pl-4 pr-4 h-100 d-flex justify-content-center align-items-center"
            activeClassName="active"
          >
            <i className={`${prop.icon} pl-0 pr-2 ml--2`} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  return (
    <Container fluid className="menu-component shadow">
      <Row>
        <div className="col-2">
          {logo ? (
            <NavbarBrand className="pt-0 pb-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
                style={{ maxHeight: "6rem" }}
              />
            </NavbarBrand>
          ) : null}
        </div>
        <div className="col-8 d-flex justify-content-center align-items-center navbar-nav">
          <Nav className="h-100">{createLinks(routes)}</Nav>
        </div>
        <div className="col-2"></div>
      </Row>
    </Container>
  );
};

export default Menu;
