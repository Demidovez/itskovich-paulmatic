import { Container, Row } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import B2InfoTable from "../../components/B2InfoTable/B2InfoTable";
import Tabs from "../../components/Tabs/Tabs";
import { useLazyGetPersonsQuery } from "store/api/persons";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companiesApi } from "store/api/companies";
import { useGetCompaniesQuery } from "store/api/companies";

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

const BtoB = () => {
  const [fetchCompanies, { data: companiesData }] = useLazyGetCompaniesQuery();

  const [fetchPersons, personsData] = useLazyGetPersonsQuery({
    selectFromResult: ({ data }) => data,
  });

  const { companies, persons } = useSelector((state) => state.tables.tables);
  const activeTable = useSelector((state) => state.tables.activeTable);

  return (
    <>
      <Container fluid className="d-flex flex-column h-100vh overflow-hidden">
        <Row>
          <div className="col mt-3 mb-3">
            <Tabs tabs={{ companies, persons }} activeTable={activeTable} />
          </div>
        </Row>
        <Row className="flex-fill">
          {activeTable === "companies" && Object.keys(companies).length > 0 && (
            <B2InfoTable
              info={companies.info}
              data={companiesData}
              fetchData={fetchCompanies}
              fields={companiesFields}
            />
          )}
          {activeTable === "persons" && Object.keys(persons).length > 0 && (
            <B2InfoTable
              info={persons.info}
              data={personsData}
              fetchData={fetchPersons}
              fields={personsFields}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default BtoB;
