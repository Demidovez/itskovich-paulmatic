import Checkbox from "components/Checkbox/Checkbox";
import Pagination from "components/Pagination/Pagination";
import TasksTable from "components/TasksTable/TasksTable";
import TasksBarStatsByStatus from "components/TasksBarStatsByStatus/TasksBarStatsByStatus";
import TasksBarStatsByType from "components/TasksBarStatsByType/TasksBarStatsByType";
import TaskSort from "components/TaskSort/TaskSort";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Card, CardHeader, Col, Button } from "reactstrap";
import { selectAllTasks } from "store/slices/tasksSlice";
import SequencesSort from "components/SequencesSort/SequencesSort";
import SequencesStatusesSelector from "components/SequencesStatusesSelector/SequencesStatusesSelector";
import SequencesFolders from "components/SequencesFolders/SequencesFolders";
import { MdOutlineSearch } from "react-icons/md";
import SequencesTable from "components/SequencesTable/SequencesTable";
import SequencesSearchBar from "components/SequencesSearchBar/SequencesSearchBar";
import ModalCreateSequence from "components/ModalCreateSequence/ModalCreateSequence";

const Sequences = () => {
  const dispatch = useDispatch();
  const [isTest, setIsTest] = useState(true);
  const [isShowCreator, setIsShowCreator] = useState(false);

  const createSequence = () => {
    setIsShowCreator(true);
  };

  const doneCreateSequence = () => {
    setIsShowCreator(false);
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column overflow-hidden height-fill pb-3"
      >
        <Row className="">
          <div className="col d-flex align-items-center justify-content-between">
            <h1 className="mt-4 mb-4 mr-3 d-flex align-items-center">
              Последовательности
              <div className="d-flex pt-2 pl-3">
                <label className="custom-toggle">
                  <input
                    type="checkbox"
                    checked={isTest}
                    onChange={() => setIsTest(!isTest)}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
                <span
                  style={{ fontSize: "12px", padding: "3px 5px", opacity: 0.7 }}
                >
                  [тест]
                </span>
              </div>
            </h1>
            <Button
              className="btn-icon btn-3"
              color="success"
              type="button"
              onClick={createSequence}
            >
              <span className="btn-inner--icon">
                <i className="fa fa-plus" aria-hidden="true"></i>
              </span>
              <span className="btn-inner--text">Создать</span>
            </Button>
          </div>
        </Row>

        <Card className="shadow flex-fill overflow-hidden">
          <Row className="p-4">
            <div className="col col-2">
              <SequencesFolders isTest={isTest} />
            </div>
            <div className="col col-10 pl-5">
              <div className="d-flex align-items-center justify-content-between">
                <div className="ml-4">
                  <Checkbox
                    label="Все"
                    scale={1.25}
                    // checked={isSelectedAll}
                    // onChange={onSelectAllTasks}
                  />
                </div>

                <div className="d-flex align-items-center">
                  <SequencesSort />
                  <SequencesStatusesSelector />
                  <SequencesSearchBar />
                </div>
              </div>
              <SequencesTable />
            </div>
          </Row>
        </Card>
      </Container>
      <ModalCreateSequence
        isShow={isShowCreator}
        onClose={doneCreateSequence}
      />
    </>
  );
};

export default Sequences;
