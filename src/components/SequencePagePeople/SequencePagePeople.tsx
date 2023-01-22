import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardFooter, CardHeader, Col, Row } from 'reactstrap';

import CreateContactsSelector from '~src/components/CreateContactsSelector/CreateContactsSelector';
import ModalContactForm from '~src/components/ModalContactForm/ModalContactForm';
import Pagination from '~src/components/Pagination/Pagination';
import SearchBarContacts from '~src/components/SearchBarContacts/SearchBarContacts';
import TableContacts from '~src/components/TableContacts/TableContacts';
import {
  useCreateOrUpdateContactMutation,
  useLazyGetContactsQuery,
} from '~src/store/api/contacts';
import { saveContactIdsSequence } from '~src/store/slices/sequenceMasterSlice';
import { setCache } from '~src/store/slices/tablesSlice';

const columns = [
  {
    label: 'LinkedIn',
    name: 'linkedin',
    style: {
      width: '37%',
      minWidth: '100px',
      maxWidth: '800px',
    },
  },
  {
    label: 'Последовательность',
    name: 'Sequences',
    isDisabled: true,
    style: {
      width: '20%',
      minWidth: '200px',
      maxWidth: '400px',
    },
  },
];

const COUNT_ON_PAGE = 100;

const SequencePagePeople = ({ isShow, contactIds }) => {
  const dispatch = useDispatch();

  const [ isCreateNew, setIsCreateNew ] = useState(false);
  // const [selectedIds, setSelectedIds] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ searchValue, setSearchValue ] = useState('');

  const [ searchContacts, contactsData ] = useLazyGetContactsQuery({
    selectFromResult: ({ data }) => data,
  });

  useEffect(() => {
    contactsData &&
      dispatch(setCache({ table: 'contacts', data: contactsData }));
  }, [contactsData]);

  useEffect(() => {
    searchContacts({
      body: {
        name: searchValue,
      },
      params: { offset: currentPage * COUNT_ON_PAGE, count: COUNT_ON_PAGE },
    });
  }, [ currentPage, searchValue ]);

  useEffect(() => {
    if (
      contactsData &&
      contactsData.TotalCount &&
      currentPage > 0 &&
      contactIds.length > 0
    ) {
      onSetCurrentPage(0);
    }
  }, [ contactsData && contactsData.TotalCount, contactIds ]);

  const [createOrUpdateContact] = useCreateOrUpdateContactMutation();

  const [ activeContact, setActiveContact ] = useState(null);

  const onResetForm = () => {
    activeContact && setActiveContact(null);
    isCreateNew && setIsCreateNew(false);
  };

  const onSave = (contact) => {
    createOrUpdateContact(contact);
    onResetForm();
  };

  const onSearch = (searchStr) => {
    setSearchValue(searchStr);
    onSetCurrentPage(0);
  };

  const onSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const onChecked = (id) => {
    let newContactIds = contactIds;

    if (contactIds.includes(id)) {
      newContactIds = contactIds.filter((contactId) => contactId !== id);
    } else {
      newContactIds = [ ...contactIds, id ];
    }

    dispatch(saveContactIdsSequence(newContactIds));
  };

  return (
    <>
      {isShow ? (
        <div className="modal-body d-flex flex-column overflow-hidden p-0 mt-3">
          <Row className="flex-fill p-0 h-100">
            <div className="col mb-0 d-flex h-100">
              <Card
                className="flex-fill overflow-hidden border-0"
                style={{ maxHeight: '100%' }}
              >
                <CardHeader className="border-0 " style={{ flex: '0 0 auto' }}>
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
                  data={contactsData}
                  selectedIds={contactIds}
                  onChecked={onChecked}
                  columns={columns}
                />
                <CardFooter
                  className="d-flex justify-content-between align-items-center"
                  style={{ flex: '0 0 auto' }}
                >
                  <div></div>
                  <Pagination
                    allCount={contactsData?.TotalCount || 0}
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
