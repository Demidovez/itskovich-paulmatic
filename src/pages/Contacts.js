import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  Spinner,
} from "reactstrap";
import TableContacts from "components/TableContacts/TableContacts";
import CreateContactsSelector from "components/CreateContactsSelector/CreateContactsSelector";
import {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactsMutation,
  useLazyTryExportQuery,
} from "../store/api/contacts";
import { useEffect, useState } from "react";
import ActionContactsBar from "components/ActionContactsBar/ActionContactsBar";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedIds } from "store/slices/contactsSlice";
import ModalYouSure from "components/ModalYouSure/ModalYouSure";
import { setCurrentContactPage } from "store/slices/contactsSlice";
import Pagination from "components/Pagination/Pagination";
import { searchValueContactPage } from "store/slices/contactsSlice";
import { setCache } from "store/slices/tablesSlice";
import SearchBarContacts from "components/SearchBarContacts/SearchBarContacts";
import ModalContactForm from "components/ModalContactForm/ModalContactForm";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";
import ModalAddToSequence from "components/ModalAddToSequence/ModalAddToSequence";
import { useLazyAddContactsToSequenceQuery } from "store/api/sequences";
import { setLoaderStatus } from "store/slices/commonSlice";
import Loader from "components/Loader/Loader";
import useLoader from "hooks/useLoader";
import { toast } from "react-toastify";
import { getServerUrl } from "store/api/server";

const COUNT_ON_PAGE = 100;

const tourSteps = [
  {
    selector: "#nav_item_contacts",
    content:
      "На этой странице находятся все Ваши контакты. Контактам можно рассылать автоматические и/или мануальные письма, писать в месенджеры и т.д.",
  },
  {
    selector: "#createContactToggler",
    content: "Добавляйте контакты вручную, или загрузить их из файла CSV",
  },
  {
    selector: "#contactActionsToggler",
    content:
      "Добавляйте выделенные галочками контакты в автоматизированные последовательности",
  },
  {
    selector: ".search-tour",
    content:
      "Ищите контакты по имени, должности, комании или другим параметрам",
  },
];

const Contacts = () => {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const dispatch = useDispatch();
  const { selectedIds, currentPage, searchValue } = useSelector(
    (state) => state.contacts
  );

  const cacheTables = useSelector((state) => state.tables.cache);

  const [searchContacts, { data: contactsData, isLoading }] =
    useLazyGetContactsQuery();

  useEffect(() => {
    contactsData &&
      dispatch(setCache({ table: "contacts", data: contactsData }));
  }, [contactsData]);

  const isLoadingContacts = useSelector(
    (state) => state.common.loader.pages.contacts.isLoadingContacts
  );

  useEffect(() => {
    isLoadingContacts &&
      dispatch(
        setLoaderStatus({
          page: "contacts",
          part: "isLoadingContacts",
          value: isLoading,
        })
      );
  }, [isLoading, isLoadingContacts]);

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
  const [isShowModalAddToSequence, setIsShowModalAddToSequence] =
    useState(false);

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

  const handleDeleteContact = () => {
    setIsShowModalDelete(false);
    deleteContactsByID(selectedIds);
    onResetForm();
    dispatch(clearSelectedIds());
  };

  const onSetCurrentPage = (page) => {
    dispatch(setCurrentContactPage(page));
  };

  const [sendToSequence] = useLazyAddContactsToSequenceQuery();

  const [isShowLoader] = useLoader(isLoadingContacts);

  const [tryExport, { data: exportResponse, isFetching, error, isError }] =
    useLazyTryExportQuery();

  const exportContacts = () => {
    tryExport();
    dispatch(clearSelectedIds());
  };

  useEffect(() => {
    if (!isFetching && exportResponse) {
      if (exportResponse.result) {
        const linkSource = getServerUrl("getFile?key=") + exportResponse.result;
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);

        downloadLink.target = "_blank";
        downloadLink.download = "sssss";
        downloadLink.href = linkSource;
        downloadLink.click();
        downloadLink.remove();
      } else {
        toast.error("Ошибка экспорта");
      }
    }
  }, [exportResponse, isFetching]);

  useEffect(() => {
    if (error && isError) {
      toast.error("Ошибка экспорта");
    }
  }, [error, isError]);

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column overflow-hidden height-fill"
      >
        {isShowLoader ? <Loader className="mt-7" /> : null}
        <Row
          className="flex-fill pt-4 h-100"
          style={{ display: isShowLoader ? "none" : "flex" }}
        >
          <div className="col d-flex h-100">
            <Card
              className="shadow overflow-hidden w-100 mb-3 "
              style={{ maxHeight: "100%" }}
            >
              <CardHeader className="border-0 " style={{ flex: "0 0 auto" }}>
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
                    {isFetching ? (
                      <Spinner size="sm" color="primary" className="mr-3" />
                    ) : null}

                    <ActionContactsBar
                      disabled={selectedIds.length === 0}
                      onDelete={() => setIsShowModalDelete(true)}
                      onAddToSequence={() => setIsShowModalAddToSequence(true)}
                      onExport={exportContacts}
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

              <CardFooter
                className="d-flex justify-content-between align-items-center"
                style={{ flex: "0 0 auto" }}
              >
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
      <ModalYouSure
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
      <ModalAddToSequence
        isShow={isShowModalAddToSequence}
        clearSelectedIds={() => dispatch(clearSelectedIds())}
        onSubmit={(sequence) =>
          sendToSequence({
            ids: selectedIds,
            sequence,
          })
        }
        onCancel={() => setIsShowModalAddToSequence(false)}
      />
      <InteractiveTour steps={tourSteps} name="contacts" />
    </>
  );
};

export default Contacts;
