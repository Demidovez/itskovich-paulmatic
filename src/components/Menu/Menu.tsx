import { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, NavLink as NavLinkRRD, useHistory } from 'react-router-dom';
import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import BlockMenuItemIcon from '~src/assets/img/icons/common/lock.svg';
import UserIcon from '~src/assets/img/icons/common/user.svg';
import ModalYouSure from '~src/components/ModalYouSure/ModalYouSure';
import { ROUTES } from '~src/routes';
import { setIsNeedSetEmailServer } from '~src/store/slices/commonSlice';
import { setShowTariffModal } from '~src/store/slices/commonSlice';
import { getpath } from '~src/utils/utils';

import './Menu.scss';
const basicLogo =
  require('../../assets/img/icons/common/basic_white.svg').default;
const professionalLogo =
  require('../../assets/img/icons/common/professional_white.svg').default;
const enterpriseLogo =
  require('../../assets/img/icons/common/enterprise_white.svg').default;

const LOGO = {
  Basic: basicLogo,
  Professional: professionalLogo,
  Enterprise: enterpriseLogo,
};

const Menu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ collapseOpen, setCollapseOpen ] = useState();
  const [ isAskSure, setIsAskSure ] = useState(false);

  const account = useSelector((state) => state.common.Account);
  const isAccessToB2B = useSelector(
    (state) => state.common.Account.Tariff.FeatureAbilities.B2B,
  );
  const currentTariff = useSelector(
    (state) => state.common.Account.Tariff.Creds.Name,
  );

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const showBlockedMessage = (e) => {
    e.preventDefault();
    dispatch(
      setShowTariffModal('Для перехода на страницу Вам нужно изменить подписку'),
    );
  };

  const createLinks = (routes) => {
    return routes
      .filter((route) => route.position !== 'user')
      .map((prop, key) => {
        const thisIsB2B = prop.path.includes(ROUTES.b2b.path.replace('/', ''));
        // const isBlocked = thisIsB2B && !isAccessToB2B; // TODO: вернуть обратно
        const isBlocked = false; // TODO: удалить

        return (
          <NavItem key={key} id={'nav_item_' + prop.path.substring(1)}>
            <NavLink
              to={prop.layout + getpath(prop.path)}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
              className={'pl-lg-3 pr-lg-3 pl-sm-2 pr-sm-2 nav-link-menu'}
            >
              {isBlocked ? (
                <div className="block-nav" onClick={showBlockedMessage}>
                  <BlockMenuItemIcon
                    fill="#2ecc71"
                    style={{ width: 30, height: 30 }}
                  />
                </div>
              ) : null}
              {/* <i
                className={`${prop.icon} pr-lg-2 pr-md-0 ml--2 ml-md-0 mt--1`}
              /> */}
              {/* {prop.icon()} */}
              <span className="">{prop.name}</span>
            </NavLink>
          </NavItem>
        );
      });
  };

  const createUserLinks = (routes) => {
    return routes
      .filter((route) => route.position === 'user')
      .map((prop, key) => {
        return (
          <DropdownItem
            to={
              prop.layout.includes('admin')
                ? prop.layout + getpath(prop.path)
                : prop.layout + prop.path
            }
            tag={Link}
            key={key}
          >
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
      target: '_blank',
    };
  }

  const renderLogo = () => {
    return logo ? (
      <Link
        to={'/admin' + getpath(ROUTES.index.path)}
        style={{
          backgroundImage: 'url(' + (LOGO[currentTariff] || basicLogo) + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          height: '4.5rem',
          width: 220,
          overflow: 'hidden',
          backgroundPositionX: -45,
          backgroundPositionY: -20,
          backgroundSize: 300,
          display: 'block',
        }}
      >
      </Link>
    ) : null;
  };

  const onLogoutSubmit = () => {
    setIsAskSure(false);
    history.push('/auth/login');
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
                  <span
                    className="avatar avatar-sm rounded-circle"
                    style={{ background: '#ced0fe' }}
                  >
                    <UserIcon color="#636bff" />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {account.fullName || 'User'}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu
                className="dropdown-menu-arrow shadow"
                right
                style={{ minWidth: '12rem' }}
              >
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem('tours');
                  }}
                >
                  <i className="ni ni-spaceship" />
                  <span>Восстановить тур по платформе</span>
                </DropdownItem>
                <DropdownItem
                  to={'/admin' + getpath(ROUTES['user-profile'].path)}
                  tag={Link}
                >
                  <i className="ni ni-settings-gear-65" />
                  <span>Настройки</span>
                </DropdownItem>
                {/* <DropdownItem
                  onClick={() => dispatch(setIsNeedSetEmailServer(true))}
                >
                  <i className="ni ni-email-83" />
                  <span>Настройки почты</span>
                </DropdownItem> */}
                {/* <DropdownItem
                  to={"/admin" + getpath(ROUTES["user-profile"].path)}
                  tag={Link}
                >
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem> */}
                {/* <DropdownItem
                  to={"/admin" + getpath(ROUTES["user-profile"].path)}
                  tag={Link}
                >
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                {/* <DropdownItem divider />
                {createUserLinks(routes)} */}
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => setIsAskSure(true)}
                  className="d-flex align-items-center"
                >
                  <BiLogOut />
                  <span>Выйти</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Row>
      </Container>
      <ModalYouSure
        isShow={isAskSure}
        title={'Выйти'}
        text={'Вы уверены, что хотите выйти?'}
        onAgree={onLogoutSubmit}
        onCancel={() => setIsAskSure(false)}
      />
    </Navbar>
  );
};

export default Menu;
