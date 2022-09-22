import { Card, CardHeader, Container, Row, Col, Spinner } from "reactstrap";
import TableContacts from "../../components/TableContacts/TableContacts";
import FormContacts from "../../components/FormContacts/FormContacts";
import SearchBar from "../../components/SearchBar/SearchBar";
import UploadContacts from "../../components/UploadContacts/UploadContacts";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactMutation,
} from "../../store/api/contacts";
import { useEffect, useState } from "react";

const Contacts = () => {
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
      <Container fluid>
        <Row>
          <div className="col col-8 d-flex align-items-center">
            <h1 className="mt-4 mb-4 mr-3">Контакты</h1>
            {(isFetching || isUpdating || isDeleting) && (
              <Spinner color="primary" />
            )}
          </div>
        </Row>
        <Row>
          <div className="col col-8 mb-5">
            <Card className="shadow">
              <CardHeader className="border-0 ">
                <Row>
                  <Col md={6}>
                    <SearchBar onSearch={onSearch} />
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <UploadContacts />
                  </Col>
                </Row>
              </CardHeader>
              <TableContacts
                data={contacts}
                onSelect={onSelectActiveContact}
                activeContactId={activeContact.id}
              />
            </Card>
          </div>
          <div className="col col-4">
            <FormContacts
              className="sticky-top"
              style={{ top: 20 }}
              contact={activeContact}
              onNew={onResetForm}
              onSave={onSave}
              onRemove={onRemove}
            />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
