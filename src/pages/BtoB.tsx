import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, Col, Container, Row } from 'reactstrap';

import ActionTableBar from '~src/components/ActionTableBar/ActionTableBar';
import B2InfoTable from '~src/components/B2InfoTable/B2InfoTable';
import FilterB2B from '~src/components/FilterB2B/FilterB2B';
import InteractiveTour from '~src/components/InteractiveTour/InteractiveTour';
import Loader from '~src/components/Loader/Loader';
import ModalAddToSequence from '~src/components/ModalAddToSequence/ModalAddToSequence';
import SearchBar from '~src/components/SearchBar/SearchBar';
import Tabs from '~src/components/Tabs/Tabs';
import useLoader from '~src/hooks/useLoader';
import { useLazyGetCompaniesQuery } from '~src/store/api/companies';
import { useLazyAddToContactsQuery, useLazyAddToSequenceQuery, useLazyGetPersonsQuery } from '~src/store/api/persons';
import { setShowTariffModal } from '~src/store/slices/commonSlice';
import { clearSelectedIds } from '~src/store/slices/tablesSlice';

const companiesFields = [
  {
    label: '',
    name: 'checkbox',
    style: {
      width: '1%',
      minWidth: '60px',
      maxWidth: '60px',
    },
  },
  {
    label: 'Название',
    name: 'Company',
    style: {
      width: '15%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Категория',
    name: 'Category',
    style: {
      width: '15%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Город',
    name: 'City',
    style: {
      width: '10%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Адрес',
    name: 'Address',
    style: {
      width: '10%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  // {
  //     label: "Страна",
  //     name: "Country",
  // },
  {
    label: 'Индекс',
    name: 'ZipCode',
    style: {
      width: '8%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'E-mail',
    name: 'Email',
    style: {
      width: '10%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Телефон',
    name: 'Phone',
    style: {
      width: '9%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  // {
  //     label: "Регион",
  //     name: "Region",
  // },
  {
    label: 'Соц.сети',
    name: 'Socials',
    style: {
      width: '17%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  // {
  //     label: "Подкатегория",
  //     name: "Subcategory",
  // },
  {
    label: 'Сайт',
    name: 'Website',
    style: {
      width: '10%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
];

const personsFields = [
  {
    label: '',
    name: 'checkbox',
    style: {
      width: '1%',
      minWidth: '60px',
      maxWidth: '60px',
    },
  },
  {
    label: 'Имя',
    name: 'FirstName',
    style: {
      width: '16%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Фамилия',
    name: 'LastName',
    style: {
      width: '16%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Должность',
    name: 'Title',
    style: {
      width: '17%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Компания',
    name: 'Company',
    style: {
      width: '17%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'E-mail',
    name: 'Email',
    style: {
      width: '16%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'LinkedIn',
    name: 'Linkedin',
    style: {
      width: '17%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
  {
    label: 'Телефон',
    name: 'Phone',
    style: {
      width: '16%',
      minWidth: '100px',
      maxWidth: '400px',
    },
  },
];

const tourSteps = [
  {
    selector: '#nav_item_b2b',
    content:
      'На этой странице находятся топ-менеджмент компаний. У Вас есть возможность получить доступ к почте, LinkedIn и номеру телефона. Количество получения контактной информации ограниченно.',
  },
  {
    selector: '.tabs-tour',
    content:
      'Переключайте вкладки, чтобы добавлять контакты из разных категорий',
  },
  {
    selector: '.filter-tour',
    content: 'Выполняйте поиск по фильтру',
  },
  {
    selector: '#b2bActionsToggler',
    content:
      'Добавляйте выделенных людей в контакты или последовательности. Количество добавлений ограниченно.',
  },
];

const BtoB = () => {
  const dispatch = useDispatch();
  const [
    fetchCompanies,
    { data: companiesData, error: errorCompanies, isError: isErrorCompanies },
  ] = useLazyGetCompaniesQuery();

  const [
    fetchPersons,
    { data: personsData, error: errorPersons, isError: isErrorPersons },
  ] = useLazyGetPersonsQuery();

  const [addToContacts] = useLazyAddToContactsQuery();
  const [addToSequence] = useLazyAddToSequenceQuery();

  const tables = useSelector((state) => state.tables.tables);
  const activeTable = useSelector((state) => state.tables.activeTable);
  const selectedIds = useSelector((state) => state.tables.selectedIds);

  const [ isShowModalAddToSequence, setIsShowModalAddToSequence ] =
    useState(false);

  const onAddContact = () => {
    addToContacts(selectedIds[activeTable]);
    dispatch(clearSelectedIds(activeTable));
  };
  const onAddToSequence = () => {
    setIsShowModalAddToSequence(true);
  };

  const { isLoadingPeople, isLoadingCompanies } = useSelector(
    (state) => state.common.loader.pages.b2b,
  );

  const [isShowLoaderPeople] = useLoader(isLoadingPeople, 1000);
  const [isShowLoaderCompanies] = useLoader(isLoadingCompanies, 1000);

  useEffect(() => {
    if (
      (isErrorCompanies || isErrorPersons) &&
      (errorCompanies || errorPersons)
    ) {
      if (
        [
          (((errorCompanies || {}).data && errorCompanies.data.error) || {})
            .reason,
          (((errorPersons || {}).data && errorPersons.data.error) || {}).reason,
        ].includes('REASON_FEATURE_UNACCESSABLE')
      ) {
        dispatch(
          setShowTariffModal(
            errorPersons.data.error.message || errorCompanies.data.error.message,
          ),
        );
      }
    }
  }, [ errorCompanies, errorPersons, isErrorCompanies, isErrorPersons ]);

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
            {activeTable === 'companies' &&
              Object.keys(tables[activeTable]).length > 0 && (
              <>
                {isShowLoaderCompanies ? <Loader className="mt-7" /> : null}
                <B2InfoTable
                  info={tables[activeTable].info}
                  data={companiesData}
                  fetchData={fetchCompanies}
                  fields={companiesFields}
                  isLoading={isShowLoaderCompanies}
                  isLoaded={!isLoadingCompanies}
                  loadingLabel="isLoadingCompanies"
                />
              </>
            )}
            {activeTable === 'persons' &&
              Object.keys(tables[activeTable]).length > 0 && (
              <>
                {isShowLoaderPeople ? <Loader className="mt-7" /> : null}
                <B2InfoTable
                  info={tables[activeTable].info}
                  data={personsData}
                  fetchData={fetchPersons}
                  fields={personsFields}
                  isLoading={isShowLoaderPeople}
                  isLoaded={!isLoadingPeople}
                  loadingLabel="isLoadingPeople"
                />
              </>
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
      <ModalAddToSequence
        isShow={isShowModalAddToSequence}
        onSubmit={(sequenceId) =>
          addToSequence({
            entityIds: selectedIds[activeTable],
            sequenceId,
          })
        }
        clearSelectedIds={() => dispatch(clearSelectedIds(activeTable))}
        onCancel={() => setIsShowModalAddToSequence(false)}
      />
    </Container>
  );
};

export default BtoB;
