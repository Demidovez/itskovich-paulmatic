import { Card, CardHeader, Row, Col, Container } from "reactstrap";
import B2InfoTable from "components/B2InfoTable/B2InfoTable";
import FilterB2B from "components/FilterB2B/FilterB2B";
import Tabs from "../components/Tabs/Tabs";
import { useLazyGetPersonsQuery } from "store/api/persons";
import { useLazyGetCompaniesQuery } from "store/api/companies";
import { useSelector } from "react-redux";
import ActionTableBar from "components/ActionTableBar/ActionTableBar";
import SearchBar from "components/SearchBar/SearchBar";
import { useAddContactsMutation } from "store/api/contacts";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";

const companiesFields = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "1%",
      minWidth: "60px",
      maxWidth: "60px",
    },
  },
  {
    label: "Название",
    name: "Name",
    style: {
      width: "15%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Категория",
    name: "Category",
    style: {
      width: "15%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Город",
    name: "City",
    style: {
      width: "10%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Адрес",
    name: "Address",
    style: {
      width: "10%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  // {
  //     label: "Страна",
  //     name: "Country",
  // },
  {
    label: "Индекс",
    name: "ZipCode",
    style: {
      width: "8%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "E-mail",
    name: "Email",
    style: {
      width: "10%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Телефон",
    name: "Phone",
    style: {
      width: "9%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  // {
  //     label: "Регион",
  //     name: "Region",
  // },
  {
    label: "Соц.сети",
    name: "Socials",
    style: {
      width: "17%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  // {
  //     label: "Подкатегория",
  //     name: "Subcategory",
  // },
  {
    label: "Сайт",
    name: "Website",
    style: {
      width: "10%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
];

const personsFields = [
  {
    label: "",
    name: "checkbox",
    style: {
      width: "1%",
      minWidth: "60px",
      maxWidth: "60px",
    },
  },
  {
    label: "Имя",
    name: "FullName",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Title",
    name: "Title",
    style: {
      width: "17%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Компания",
    name: "Company",
    style: {
      width: "17%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "E-mail",
    name: "Email",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "LinkedIn",
    name: "Linkedin",
    style: {
      width: "17%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
  {
    label: "Телефон",
    name: "Phone",
    style: {
      width: "16%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
];

const tourSteps = [
  {
    selector: "#nav_item_b2b",
    content: "На этой странице находятся топ-менеджмент компаний. У Вас есть возможность получить доступ к почте, LinkedIn и номеру телефона. Количество получения контактной информации ограниченно.",
  },{
    selector: ".tabs-tour",
    content: "Переключайте вкладки, чтобы добавлять контакты из разных категорий",
  },
  {
    selector: ".filter-tour",
    content: "Выполняйте поиск по фильтру",
  },
  {
    selector: "#b2bActionsToggler",
    content: "Добавляйте выделенных людей в контакты или последовательности. Количество добавлений ограниченно.",
  },
];

const BtoB = () => {
  const [fetchCompanies, companiesData] = useLazyGetCompaniesQuery({
    selectFromResult: ({ data }) => data,
  });

  const [fetchPersons, personsData] = useLazyGetPersonsQuery({
    selectFromResult: ({ data }) => data,
  });

  const [addContacts] = useAddContactsMutation();

  const tables = useSelector((state) => state.tables.tables);
  const activeTable = useSelector((state) => state.tables.activeTable);
  const selectedIds = useSelector((state) => state.tables.selectedIds);

  const onAddContact = () => {
    // addContacts()
  };
  const onAddToSequence = () => {};

  return (
    <Container fluid className="d-flex flex-column height-fill pt-4 pb-3">
      <Row className="h-100 flex-fill">
        <div className="col col-lg-9 col-sm-12 mb-3 d-flex h-100">
          <Card className="shadow w-100">
            <CardHeader className="border-0">
              <Row>
                <Col className="col col-lg-6 col-md-12 col-sm-12">
                  <Tabs
                    tabs={tables}
                    activeTable={activeTable}
                    className="tabs-tour"
                  />
                </Col>
                <Col className="col col-lg-6 col-md-12 col-sm-12 d-flex align-items-center pt-lg-0 pt-3 ">
                  <ActionTableBar
                    disabled={(selectedIds[activeTable] || []).length === 0}
                    onAddContact={onAddContact}
                    onAddToSequence={onAddToSequence}
                  />

                  <SearchBar table={activeTable} className="w-100" />
                </Col>
              </Row>
            </CardHeader>
            {activeTable === "companies" &&
              Object.keys(tables[activeTable]).length > 0 && (
                <B2InfoTable
                  info={tables[activeTable].info}
                  data={companiesData}
                  fetchData={fetchCompanies}
                  fields={companiesFields}
                />
              )}
            {activeTable === "persons" &&
              Object.keys(tables[activeTable]).length > 0 && (
                <B2InfoTable
                  info={tables[activeTable].info}
                  data={personsData}
                  fetchData={fetchPersons}
                  fields={personsFields}
                />
              )}
          </Card>
        </div>
        <div className="col col-3 d-none d-md-block">
          {Object.keys(tables[activeTable]).length > 0 && (
            <FilterB2B
              name={tables[activeTable].info.name}
              filters={tables[activeTable].info.filters}
              className="filter-tour"
            />
          )}
        </div>
      </Row>
      <InteractiveTour steps={tourSteps} name="btb" />
    </Container>
  );
};

export default BtoB;
