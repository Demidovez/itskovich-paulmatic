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
import {
  selectAllSequences,
  clearSelectedIds,
} from "store/slices/sequencesSlice";
import ActionSequencesBar from "components/ActionSequencesBar/ActionSequencesBar";
import { useLazyDeleteSequencesQuery } from "store/api/sequences";

const Sequences = () => {
  const dispatch = useDispatch();
  const [isShowCreator, setIsShowCreator] = useState(false);

  const { isSelectedAll, selectedIds } = useSelector(
    (state) => state.sequences
  );

  const setAllSequences = () => dispatch(selectAllSequences(!isSelectedAll));

  const createSequence = () => {
    setIsShowCreator(true);
  };

  const doneCreateSequence = () => {
    setIsShowCreator(false);
  };

  const [deleteSequences] = useLazyDeleteSequencesQuery();

  const onDeleteSequences = () => {
    isSelectedAll && setAllSequences();
    selectedIds.length && dispatch(clearSelectedIds());

    deleteSequences(selectedIds);
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
          <Row className="p-4 flex-fill">
            <div className="col col-2">
              <SequencesFolders />
            </div>
            <div className="col col-10 pl-0 pr-0 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between">
                <div className="ml-4">
                  <Checkbox
                    label="Все"
                    scale={1.25}
                    checked={isSelectedAll}
                    onChange={setAllSequences}
                  />
                </div>

                <div className="d-flex align-items-center">
                  <ActionSequencesBar
                    onDelete={onDeleteSequences}
                    disabled={
                      !isSelectedAll && (selectedIds || []).length === 0
                    }
                  />
                  <SequencesSort />
                  <SequencesStatusesSelector />
                  <SequencesSearchBar />
                </div>
              </div>
              <SequencesTable
                isSelectedAll={isSelectedAll}
                selectedIds={selectedIds}
              />
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
