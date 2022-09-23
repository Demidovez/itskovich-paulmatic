import { Card, CardHeader, Container, Row, Col, Spinner } from "reactstrap";
import TableContacts from "../../components/TableContacts/TableContacts";
import FormContacts from "../../components/FormContacts/FormContacts";
import SearchBar from "../../components/SearchBar/SearchBar";
import UploadContacts from "../../components/UploadContacts/UploadContacts";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactsMutation,
} from "../../store/api/contacts";
import { useEffect, useState } from "react";
import ActionContactsBar from "components/ActionContactsBar/ActionContactsBar";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedIds } from "store/slices/contactsSlice";
import Modal from "components/Modal/Modal";

const Contacts = () => {
  const dispatch = useDispatch();
  const [searchContacts, { data: contactsData, isFetching }] =
    useLazyGetContactsQuery();

  useEffect(() => {
    searchContacts();
  }, []);

  const [createOrUpdateContact, { isLoading: isUpdating }] =
    useCreateOrUpdateContactMutation();

  const [
    deleteContactsByID,
    { isLoading: isDeleting, isFetching: isFetching1 },
  ] = useDeleteContactsMutation();

  const selectedIds = useSelector((state) => state.contacts.selectedIds);

  const [activeContact, setActiveContact] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const onResetForm = () => {
    setActiveContact({});
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
    searchContacts(searchStr);
  };

  const handleAddToSequence = () => {};

  const handleDeleteContact = () => {
    setIsShowModalDelete(false);
    deleteContactsByID(selectedIds);
    onResetForm();
    dispatch(clearSelectedIds());
  };

  return (
    <>
      <Container fluid>
        <Row>
          <div className="col col-8 d-flex align-items-center">
            <h1 className="mt-4 mb-4 mr-3">Контакты</h1>
            {/*{(isFetching || isUpdating || isDeleting) && (*/}
            {/*  <Spinner color="primary" />*/}
            {/*)}*/}
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
                  <Col
                    md={6}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <ActionContactsBar
                      disabled={selectedIds.length === 0}
                      onDelete={() => setIsShowModalDelete(true)}
                      onAddToSequence={handleAddToSequence}
                    />
                    <UploadContacts />
                  </Col>
                </Row>
              </CardHeader>
              <TableContacts
                data={contactsData}
                onSelect={onSelectActiveContact}
                selectedIds={selectedIds}
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
      <Modal
        isShow={isShowModalDelete}
        title="Вы уверены?!"
        text="Удалить выбранные контакты?"
        onAgree={handleDeleteContact}
        onCancel={() => setIsShowModalDelete(false)}
      />
    </>
  );
};

export default Contacts;
