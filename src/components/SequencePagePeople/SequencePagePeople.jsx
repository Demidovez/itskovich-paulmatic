import { Card, CardHeader, Row, Col, CardFooter } from "reactstrap";
import TableContacts from "components/TableContacts/TableContacts";
import CreateContactsSelector from "components/CreateContactsSelector/CreateContactsSelector";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedIds,
  setCurrentContactPage,
  searchValueContactPage,
} from "store/slices/contactsSlice";
import Pagination from "components/Pagination/Pagination";
import { setCache } from "store/slices/tablesSlice";
import SearchBarContacts from "components/SearchBarContacts/SearchBarContacts";
import ModalContactForm from "components/ModalContactForm/ModalContactForm";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
} from "store/api/contacts";
import { saveContactIdsSequence } from "store/slices/sequenceMasterSlice";

const columns = [
  {
    label: "LinkedIn",
    name: "linkedin",
    style: {
      width: "37%",
      minWidth: "100px",
      maxWidth: "800px",
    },
  },
  {
    label: "Последовательность",
    name: "sequence",
    isDisabled: true,
    style: {
      width: "14%",
      minWidth: "100px",
      maxWidth: "400px",
    },
  },
];

const COUNT_ON_PAGE = 100;

const SequencePagePeople = ({ isShow }) => {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const dispatch = useDispatch();
  const { selectedIds, currentPage, searchValue } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    dispatch(saveContactIdsSequence(selectedIds || []));
  }, [(selectedIds || []).toString()]);

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

  const [activeContact, setActiveContact] = useState(null);

  const onResetForm = () => {
    activeContact && setActiveContact(null);
    isCreateNew && setIsCreateNew(false);
  };

  const onSave = (contact) => {
    createOrUpdateContact(contact);
    onResetForm();
  };

  const onSearch = (searchStr) => {
    dispatch(searchValueContactPage(searchStr));
    onSetCurrentPage(0);
  };

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentContactPage(page));
  };

  return (
    <>
      {isShow ? (
        <div className="modal-body d-flex flex-column overflow-hidden p-0 mt-3">
          <Row className="flex-fill p-0">
            <div className="col mb-0 d-flex">
              <Card className="shadow1 flex-fill overflow-hidden border-0">
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
                      <CreateContactsSelector
                        onCreate={() => setIsCreateNew(true)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <TableContacts
                  data={contactsData || cacheTables["contacts"]}
                  onSelect={() => {}}
                  selectedIds={selectedIds}
                  columns={columns}
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

          <ModalContactForm
            isShow={isCreateNew}
            onSave={onSave}
            onClose={onResetForm}
          />
        </div>
      ) : null}
    </>
  );
};

export default SequencePagePeople;
