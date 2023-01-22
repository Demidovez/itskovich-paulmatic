import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, Col, Container, Row } from 'reactstrap';

import Checkbox from '~src/components/Checkbox/Checkbox';
import InteractiveTour from '~src/components/InteractiveTour/InteractiveTour';
import Loader from '~src/components/Loader/Loader';
import Pagination from '~src/components/Pagination/Pagination';
import TasksBarStatsByStatus from '~src/components/TasksBarStatsByStatus/TasksBarStatsByStatus';
import TasksBarStatsByType from '~src/components/TasksBarStatsByType/TasksBarStatsByType';
import TaskSort from '~src/components/TaskSort/TaskSort';
import TasksTable from '~src/components/TasksTable/TasksTable';
import useLoader from '~src/hooks/useLoader';
import { selectAllTasks } from '~src/store/slices/tasksSlice';

const tourSteps = [
  {
    selector: '#nav_item_tasks',
    content:
      'На этой странице вы можете выполнять задачи, чтобы продвигать неавтоматические шаги последовательности',
  },
];

const Tasks = () => {
  const dispatch = useDispatch();

  const isSelectedAll = useSelector((state) => state.tasks.isSelectedAll);

  const onSelectAllTasks = () => dispatch(selectAllTasks(!isSelectedAll));

  const { isLoadingStatistics, isLoadingTasks } = useSelector(
    (state) => state.common.loader.pages.tasks,
  );

  const [isShowLoader] = useLoader(isLoadingStatistics || isLoadingTasks);

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column overflow-hidden height-fill pb-3"
      >
        <Row className="pt-3 pb-3">
          <div className="col col-2 d-flex align-items-center">
            <h1 className="mt-3 mb-3 mr-3">Задачи</h1>
          </div>
          <div
            className={`col col-10 ${
              isShowLoader ? 'd-none' : 'd-flex'
            } align-items-center justify-content-end`}
          >
            <TasksBarStatsByStatus />
            <TasksBarStatsByType />
          </div>
        </Row>

        <Card className="shadow flex-fill overflow-hidden">
          {isShowLoader ? <Loader className="mt-7" /> : null}
          <div
            style={{ display: isShowLoader ? 'none' : 'flex' }}
            className="h-100 overflow-hidden flex-column"
          >
            <CardHeader className="border-0">
              <Row className="d-flex align-items-center">
                <Col
                  md={6}
                  className="d-flex justify-content-start align-items-center"
                >
                  <Checkbox
                    label="Все"
                    scale={1.25}
                    checked={isSelectedAll}
                    onChange={onSelectAllTasks}
                  />
                </Col>
                {/* <Col md={6} className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-history pr-2"
                      style={{ fontSize: 20, opacity: 0.6 }}
                    ></i>
                    <TaskSort />
                  </div>
                </Col> */}
              </Row>
            </CardHeader>
            <TasksTable />
          </div>
        </Card>
        <InteractiveTour steps={tourSteps} name="tasks" />
      </Container>
    </>
  );
};

export default Tasks;
