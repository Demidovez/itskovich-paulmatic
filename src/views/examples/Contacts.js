import { Card, CardHeader, Container, Row, Col, Spinner } from "reactstrap";
import TableContacts from "../../components/TableContacts/TableContacts";
import FormContacts from "../../components/FormContacts/FormContacts";
import SearchContacts from "../../components/SearchContacts/SearchContacts";
import UploadContacts from "../../components/UploadContacts/UploadContacts";
import { useGetContactsQuery } from "../../store/api/contacts";
import { useEffect } from "react";

const Contacts = () => {
  const { data: contacts, isLoading } = useGetContactsQuery();

  return (
    <>
      <Container fluid>
        <Row>
          <div className="col col-8 d-flex align-items-center">
            <h1 className="mt-4 mb-4 mr-3">Контакты</h1>
            {isLoading && <Spinner color="primary" />}
          </div>
        </Row>
        <Row>
          <div className="col col-8 mb-5">
            <Card className="shadow">
              <CardHeader className="border-0 ">
                <Row>
                  <Col md={6}>
                    <SearchContacts />
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <UploadContacts />
                  </Col>
                </Row>
              </CardHeader>
              <TableContacts data={contacts} />
            </Card>
          </div>
          <div className="col col-4">
            <FormContacts className="sticky-top" style={{ top: 20 }} />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
