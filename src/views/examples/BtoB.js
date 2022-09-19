import { Container, Row, Spinner } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import B2Companies from "../../components/B2Companies/B2Companies";
import B2Persons from "../../components/B2Persons/B2Persons";
import Tabs from "../../components/Tabs/Tabs";
import { useGetPersonsInfoQuery } from "store/api/persons";
import { useGetCompaniesInfoQuery } from "store/api/companies";
import { useEffect, useState } from "react";

const BtoB = (props) => {
  const { data: personsInfo, isFetching: isFetchingPersonsInfo } =
    useGetPersonsInfoQuery();
  const { data: companiesInfo, isFetching: isFetchingCompaniesInfo } =
    useGetCompaniesInfoQuery();

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (personsInfo && companiesInfo) {
      const companies = companiesInfo && {
        link: "/" + companiesInfo.name,
        label: companiesInfo.description,
        isIndex: true,
        conponentRender: () => <B2Companies info={companiesInfo} />,
      };

      const persons = personsInfo && {
        link: "/" + personsInfo.name,
        label: personsInfo.description,
        isIndex: false,
        conponentRender: () => <B2Persons info={personsInfo} />,
      };

      setTabs([companies, persons]);
    }
  }, [personsInfo, companiesInfo]);

  return (
    <>
      <Container fluid>
        <Row>
          <div className="col mt-3 mb-3">
            <Tabs data={tabs} parentPath={props.match.path} />
          </div>
        </Row>
        <Row>
          <Switch>
            {tabs.map((tab) => (
              <Route
                path={props.match.path + tab.link}
                render={tab.conponentRender}
                key={tab.link}
              />
            ))}
            {tabs.length > 0 && (
              <Redirect
                from={props.match.path}
                to={props.match.path + tabs[0].link}
              />
            )}
          </Switch>
        </Row>
      </Container>
    </>
  );
};

export default BtoB;
