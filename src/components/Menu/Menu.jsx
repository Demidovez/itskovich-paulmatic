import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { setInMailSettingsStatus } from "store/slices/commonSlice";

import "./Menu.scss";

const Menu = (props) => {
  const dispatch = useDispatch();
  const [collapseOpen, setCollapseOpen] = useState();

  const account = useSelector((state) => state.common.Account);

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const createLinks = (routes) => {
    return routes
      .filter((route) => route.position !== "user")
      .map((prop, key) => {
        return (
          <NavItem key={key} id={"nav_item_" + prop.path.substring(1)}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
              className="pl-lg-3 pr-lg-3 pl-sm-2 pr-sm-2 nav-link-menu"
              // className="h-100 d-flex justify-content-center align-items-center align-content-center"
            >
              <i
                className={`${prop.icon} pr-lg-2 pr-md-0 ml--2 ml-md-0 mt--1`}
              />
              <span className="pl-1">{prop.name}</span>
            </NavLink>
          </NavItem>
        );
      });
  };

  const createUserLinks = (routes) => {
    return routes
      .filter((route) => route.position === "user")
      .map((prop, key) => {
        return (
          <DropdownItem to={prop.layout + prop.path} tag={Link} key={key}>
            <i className={`${prop.icon}`} />
            <span>{prop.name}</span>
          </DropdownItem>
        );
      });
  };

  const { bgColor, routes, logo } = props;
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

  const renderLogo = () => {
    return logo ? (
      <NavbarBrand className="pt-0 pb-0 pl-0 mr-0" {...navbarBrandProps}>
        <img
          alt={logo.imgAlt}
          className="navbar-brand-img logo-height pt-3 pb-3"
          src={logo.imgSrc}
          style={{ maxWidth: "180px" }}
        />
      </NavbarBrand>
    ) : null;
  };

  return (
    <Navbar
      className="fixed-left navbar-light bg-white menu-component shadow pt-0 pb-0 sticky-top"
      style={{ zIndex: 1050 }}
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <button
            className="navbar-toggler p-3"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="d-none d-md-block">{renderLogo()}</div>

          <div className="d-md-none d-sm-block align-content-center">
            {renderLogo()}
          </div>
          <Collapse
            navbar
            isOpen={collapseOpen}
            className="justify-content-center"
          >
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <Nav navbar className="h-100">
              {createLinks(routes)}
            </Nav>
          </Collapse>

          <Nav
            className="align-items-center d-md-flex justify-content-center p-3 p-md-0 "
            navbar
          >
            <UncontrolledDropdown nav>
              <DropdownToggle className="p-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {account.fullName || "User"}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu
                className="dropdown-menu-arrow shadow"
                right
                style={{ minWidth: "12rem" }}
              >
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem("tours");
                  }}
                >
                  <i className="ni ni-spaceship" />
                  <span>Восстановить туры</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => dispatch(setInMailSettingsStatus("change"))}
                >
                  <i className="ni ni-email-83" />
                  <span>Найстройки почты</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                {createUserLinks(routes)}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Menu;
