import { Container, Row } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import B2InfoTable from "../../components/B2InfoTable/B2InfoTable";
import Tabs from "../../components/Tabs/Tabs";
import { useLazyGetPersonsQuery } from "store/api/persons";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import { useState } from "react";
import { useSelector } from "react-redux";

const companiesFields = [
  {
    label: "",
    name: "checkbox",
  },
  {
    label: "Название",
    name: "Name",
  },
  {
    label: "Категория",
    name: "Category",
  },
  {
    label: "Город",
    name: "City",
  },
  {
    label: "Адрес",
    name: "Address",
  },
  // {
  //     label: "Страна",
  //     name: "Country",
  // },
  {
    label: "Индекс",
    name: "ZipCode",
  },
  {
    label: "E-mail",
    name: "Email",
  },
  {
    label: "Телефон",
    name: "Phone",
  },
  // {
  //     label: "Регион",
  //     name: "Region",
  // },
  {
    label: "Соц.сети",
    name: "Socials",
  },
  // {
  //     label: "Подкатегория",
  //     name: "Subcategory",
  // },
  {
    label: "Сайт",
    name: "Website",
  },
];

const personsFields = [
  {
    label: "",
    name: "checkbox",
  },
  {
    label: "Имя",
    name: "FullName",
  },
  {
    label: "Title",
    name: "Title",
  },
  {
    label: "Компания",
    name: "Company",
  },
  {
    label: "E-mail",
    name: "Email",
  },
  {
    label: "LinkedIn",
    name: "Linkedin",
  },
  {
    label: "Телефон",
    name: "Phone",
  },
];

const BtoB = (props) => {
  const [fetchCompanies, { data: companiesData }] = useLazyGetCompaniesQuery();

  const [fetchPersons, { data: personsData }] = useLazyGetPersonsQuery();

  const { companies, persons } = useSelector((state) => state.tables.tables);

  console.log("BtoB", companiesData);

  return (
    <>
      <Container fluid className="d-flex flex-column h-100vh overflow-hidden">
        <Row>
          <div className="col mt-3 mb-3">
            <Tabs tabs={{ companies, persons }} parentPath={props.match.path} />
          </div>
        </Row>
        <Row className="flex-fill">
          <Switch>
            {Object.keys(companies).length > 0 && (
              <Route
                path={props.match.path + companies.link}
                render={() => (
                  <B2InfoTable
                    info={companies.info}
                    data={companiesData}
                    fetchData={fetchCompanies}
                    key={companies.info.name}
                    fields={companiesFields}
                  />
                )}
              />
            )}
            {Object.keys(persons).length > 0 && (
              <Route
                path={props.match.path + persons.link}
                render={() => (
                  <B2InfoTable
                    info={persons.info}
                    data={personsData}
                    fetchData={fetchPersons}
                    key={persons.info.name}
                    fields={personsFields}
                  />
                )}
              />
            )}

            {Object.keys(companies).length > 0 && (
              <Redirect
                from={props.match.path}
                to={props.match.path + companies.link}
              />
            )}
          </Switch>
        </Row>
      </Container>
    </>
  );
};

export default BtoB;
