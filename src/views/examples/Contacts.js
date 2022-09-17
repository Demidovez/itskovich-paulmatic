import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import TableContacts from "../../components/TableContacts/TableContacts";
import FormContacts from "../../components/FormContacts/FormContacts";
import SearchContacts from "../../components/SearchContacts/SearchContacts";
import UploadContacts from "../../components/UploadContacts/UploadContacts";

const Contacts = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <div className="col col-8">
            <h1 className="mt-4 mb-4">Контакты</h1>
          </div>
        </Row>
        <Row>
          <div className="col col-8">
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
              <TableContacts />
            </Card>
          </div>
          <div className="col col-4">
            <FormContacts />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
