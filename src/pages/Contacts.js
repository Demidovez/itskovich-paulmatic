import React from "react";
import { Card, CardHeader, Container, Row, Col, CardFooter } from "reactstrap";
import TableContacts from "components/TableContacts/TableContacts";
import CreateContactsSelector from "components/CreateContactsSelector/CreateContactsSelector";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactsMutation,
} from "../store/api/contacts";
import { useEffect, useState } from "react";
import ActionContactsBar from "components/ActionContactsBar/ActionContactsBar";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedIds } from "store/slices/contactsSlice";
import Modal from "components/Modal/Modal";
import { setCurrentContactPage } from "store/slices/contactsSlice";
import Pagination from "components/Pagination/Pagination";
import { searchValueContactPage } from "store/slices/contactsSlice";
import { setCache } from "store/slices/tablesSlice";
import SearchBarContacts from "components/SearchBarContacts/SearchBarContacts";
import ModalContactForm from "components/ModalContactForm/ModalContactForm";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";

const COUNT_ON_PAGE = 100;

const tourSteps = [
  {
    selector: ".contacts-tour",
    content: "Страница контактов",
  },
  {
    selector: ".search-tour",
    content: "Поиск по базе",
  },
];

const Contacts = () => {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const dispatch = useDispatch();
  const { selectedIds, currentPage, searchValue } = useSelector(
    (state) => state.contacts
  );

  const cacheTables = useSelector((state) => state.tables.cache);

  const [searchContacts, contactsData] = useLazyGetContactsQuery({
    selectFromResult: ({ data }) => data,
  });

  useEffect(() => {
    contactsData &&
      dispatch(setCache({ table: "contacts", data: contactsData }));
  }, [contactsData]);

  useEffect(() => {
    searchContacts({
      body: {
        name: searchValue,
      },
      params: { offset: currentPage * COUNT_ON_PAGE, count: COUNT_ON_PAGE },
    });
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (
      contactsData &&
      contactsData.TotalCount &&
      currentPage > 0 &&
      selectedIds.length > 0
    ) {
      contactsData.TotalCount && onSetCurrentPage(0);
      dispatch(clearSelectedIds());
    }
  }, [contactsData && contactsData.TotalCount]);

  const [createOrUpdateContact] = useCreateOrUpdateContactMutation();

  const [deleteContactsByID] = useDeleteContactsMutation();

  const [activeContact, setActiveContact] = useState(null);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const onResetForm = () => {
    activeContact && setActiveContact(null);
    isCreateNew && setIsCreateNew(false);
  };

  const onSave = (contact) => {
    createOrUpdateContact(contact);
    onResetForm();
  };

  const onRemove = (id) => {
    deleteContactsByID([id]);
    onResetForm();
  };

  const onSelectActiveContact = (id) => {
    setActiveContact(contactsData.Items.find((contact) => contact.id === id));
  };

  const onSearch = (searchStr) => {
    dispatch(searchValueContactPage(searchStr));
    onSetCurrentPage(0);
  };

  const handleAddToSequence = () => {};

  const handleDeleteContact = () => {
    setIsShowModalDelete(false);
    deleteContactsByID(selectedIds);
    onResetForm();
    dispatch(clearSelectedIds());
  };

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentContactPage(page));
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column overflow-hidden height-fill"
      >
        <Row>
          <div className="col col-8 d-flex align-items-center">
            <h1 className="mt-4 mb-4 mr-3 contacts-tour">Контакты</h1>
          </div>
        </Row>
        <Row className="flex-fill">
          <div className="col mb-3 d-flex">
            <Card className="shadow flex-fill overflow-hidden">
              <CardHeader className="border-0 ">
                <Row>
                  <Col md={6} className="search-tour">
                    <SearchBarContacts
                      onSearch={onSearch}
                      search={searchValue}
                    />
                  </Col>
                  <Col
                    md={6}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <ActionContactsBar
                      disabled={selectedIds.length === 0}
                      onDelete={() => setIsShowModalDelete(true)}
                      onAddToSequence={handleAddToSequence}
                    />
                    <CreateContactsSelector
                      onCreate={() => setIsCreateNew(true)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <TableContacts
                data={contactsData || cacheTables["contacts"]}
                onSelect={onSelectActiveContact}
                selectedIds={selectedIds}
              />
              <CardFooter className="d-flex justify-content-between align-items-center">
                <div></div>
                <Pagination
                  allCount={
                    contactsData
                      ? contactsData.TotalCount
                      : cacheTables["contacts"] &&
                        cacheTables["contacts"].TotalCount
                  }
                  countOnPage={COUNT_ON_PAGE}
                  page={currentPage}
                  moveToPage={onSetCurrentPage}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal
        isShow={isShowModalDelete}
        title="Вы уверены?"
        text="Удалить выбранные контакты?"
        onAgree={handleDeleteContact}
        onCancel={() => setIsShowModalDelete(false)}
      />
      <ModalContactForm
        contact={activeContact}
        isShow={!!activeContact || isCreateNew}
        onSave={onSave}
        onRemove={onRemove}
        onClose={onResetForm}
      />
      <InteractiveTour steps={tourSteps} name="contacts" />
    </>
  );
};

export default Contacts;
