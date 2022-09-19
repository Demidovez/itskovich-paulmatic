import { Card, CardHeader, Container, Row, Col, Spinner } from "reactstrap";
import TableContacts from "../TableContacts/TableContacts";
import FormContacts from "../FormContacts/FormContacts";
import SearchContacts from "../SearchContacts/SearchContacts";
import UploadContacts from "../UploadContacts/UploadContacts";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactMutation,
} from "../../store/api/contacts";
import React, { useEffect, useState } from "react";

const B2Persons = () => {
  const [searchContacts, { data: contacts, isFetching }] =
    useLazyGetContactsQuery();

  useEffect(() => {
    searchContacts();
  }, []);

  const [createOrUpdateContact, { isLoading: isUpdating }] =
    useCreateOrUpdateContactMutation();

  const [deleteContactByID, { isLoading: isDeleting }] =
    useDeleteContactMutation();

  const [activeContact, setActiveContact] = useState({});

  const onResetForm = () => {
    setActiveContact({});
  };

  const onSave = (contact) => {
    createOrUpdateContact(contact);
    onResetForm();
  };

  const onRemove = (id) => {
    deleteContactByID(id);
    onResetForm();
  };

  const onSelectActiveContact = (id) => {
    setActiveContact(contacts.find((contact) => contact.id === id));
  };

  const onSearch = (searchStr) => {
    searchContacts(searchStr);
  };

  return (
    <>
      <div className="col col-9 mb-5">
        <Card className="shadow">
          <CardHeader className="border-0 ">
            <Row>
              <Col md={6}>
                <SearchContacts onSearch={onSearch} />
              </Col>
              <Col md={6} className="d-flex justify-content-end"></Col>
            </Row>
          </CardHeader>
          <TableContacts
            data={contacts}
            onSelect={onSelectActiveContact}
            activeContactId={activeContact.id}
          />
        </Card>
      </div>
      <div className="col col-3">
        <FormContacts
          className="sticky-top"
          style={{ top: 20 }}
          contact={activeContact}
          onNew={onResetForm}
          onSave={onSave}
          onRemove={onRemove}
        />
      </div>
    </>
  );
};

export default React.memo(B2Persons);
