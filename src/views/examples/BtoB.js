import { Container, Row } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import B2Companies from "./B2Companies";
import B2People from "./B2People";
import Tabs from "../../components/Tabs/Tabs";

const tabs = [
  {
    link: "/companies",
    label: "Компании",
    isIndex: true,
    conponent: B2Companies,
  },
  {
    link: "/people",
    label: "Люди",
    isIndex: false,
    conponent: B2People,
  },
];

const BtoB = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <div className="col mt-2 mb-2">
            <Tabs data={tabs} parentPath={props.match.path} />
          </div>
        </Row>
        <Row>
          <Switch>
            {tabs.map((tab) => (
              <Route
                path={props.match.path + tab.link}
                component={tab.conponent}
                key={tab.link}
              />
            ))}
            <Redirect
              from={props.match.path}
              to={props.match.path + tabs.find((tab) => tab.isIndex).link}
            />
          </Switch>
        </Row>
      </Container>
    </>
  );
};

export default BtoB;
