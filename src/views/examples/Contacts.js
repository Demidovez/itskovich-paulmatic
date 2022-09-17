import { Card, CardHeader, Container, Row } from "reactstrap";
import TableContacts from "../../components/TableContacts/TableContacts";
import FormContacts from "../../components/FormContacts/FormContacts";
import SearchContacts from "../../components/SearchContacts/SearchContacts";
import UploadContacts from "../../components/UploadContacts/UploadContacts";

const Contacts = () => {
  return (
    <>
      <Container className="mt-16" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <SearchContacts />
                <UploadContacts />
              </CardHeader>
              <TableContacts />
            </Card>
          </div>
          <div className="col">
            <FormContacts />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
