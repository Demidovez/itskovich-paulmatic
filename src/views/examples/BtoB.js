import { Container, Row, Spinner } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import B2InfoTable from "../../components/B2InfoTable/B2InfoTable";
import Tabs from "../../components/Tabs/Tabs";
import { useGetPersonsInfoQuery } from "store/api/persons";
import {
  useGetCompaniesInfoQuery,
  useLazyGetCompaniesQuery,
} from "store/api/companies";
import { useEffect, useState } from "react";
import { useLazyGetPersonsQuery } from "store/api/persons";

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
    label: "Адрес",
    name: "Address",
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
    label: "Страна",
    name: "Country",
  },
  {
    label: "E-mail",
    name: "Email",
  },
  {
    label: "Телефон",
    name: "Phone",
  },
  {
    label: "Регион",
    name: "Region",
  },
  {
    label: "Соц. сети",
    name: "Socials",
  },
  {
    label: "Подкатегория",
    name: "Subcategory",
  },
  {
    label: "Сайт",
    name: "Website",
  },
  {
    label: "Индекс",
    name: "ZipCode",
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
  const { data: companiesInfo, isFetching: isFetchingCompaniesInfo } =
    useGetCompaniesInfoQuery();

  const { data: personsInfo, isFetching: isFetchingPersonsInfo } =
    useGetPersonsInfoQuery();

  const [
    fetchCompanies,
    {
      data: companies,
      isFetching: isFetchingCompanies,
      isLoading: isLoadingCompanies,
    },
  ] = useLazyGetCompaniesQuery();

  const [
    fetchPersons,
    {
      data: persons,
      isFetching: isFetchingPersons,
      isLoading: isLoadingPersons,
    },
  ] = useLazyGetPersonsQuery();

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (personsInfo && companiesInfo) {
      const companies = companiesInfo && {
        link: "/" + companiesInfo.name,
        label: companiesInfo.description,
        isIndex: true,
        info: companiesInfo,
      };

      const persons = personsInfo && {
        link: "/" + personsInfo.name,
        label: personsInfo.description,
        isIndex: false,
        info: personsInfo,
      };

      setTabs([companies, persons]);
    }
  }, [personsInfo, companiesInfo]);

  return (
    <>
      <Container fluid className="d-flex flex-column h-100vh">
        <Row>
          <div className="col mt-3 mb-3">
            <Tabs data={tabs} parentPath={props.match.path} />
          </div>
        </Row>
        <Row className="flex-fill">
          {tabs.length > 0 && (
            <Switch>
              <Route
                path={props.match.path + tabs[0].link}
                render={() => (
                  <B2InfoTable
                    info={tabs[0].info}
                    data={companies}
                    isLoading={isLoadingCompanies}
                    fetchData={fetchCompanies}
                    key={tabs[0].info.name}
                    fields={companiesFields}
                  />
                )}
              />
              <Route
                path={props.match.path + tabs[1].link}
                render={() => (
                  <B2InfoTable
                    info={tabs[1].info}
                    data={persons}
                    isLoading={isLoadingPersons}
                    fetchData={fetchPersons}
                    key={tabs[1].info.name}
                    fields={personsFields}
                  />
                )}
              />

              <Redirect
                from={props.match.path}
                to={props.match.path + tabs[0].link}
              />
            </Switch>
          )}
        </Row>
      </Container>
    </>
  );
};

export default BtoB;
