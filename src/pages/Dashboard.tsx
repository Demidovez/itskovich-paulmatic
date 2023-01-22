import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import DashboardSales from '~src/components/DashboardSales/DashboardSales';
import DashboardSequencesTable from '~src/components/DashboardSequencesTable/DashboardSequencesTable';
import DashBoardStatistics from '~src/components/DashBoardStatistics/DashBoardStatistics';
import DashBoardTabs from '~src/components/DashBoardTabs/DashBoardTabs';
import DashboardTypesInteractions from '~src/components/DashboardTypesInteractions/DashboardTypesInteractions';
import FullCalendar from '~src/components/FullCalendar/FullCalendar';
import InteractiveTour from '~src/components/InteractiveTour/InteractiveTour';
import { useLazyGetDashboardStatsQuery } from '~src/store/api/dashboard';

const tourSteps = [
  {
    selector: '#nav_item_index',
    content:
      'Страница Дашборд покажет текущие ваши показатели и ваших подчиненных.',
  },
  {
    selector: '.dashboard-tabs-component .tabs',
    content: 'Просматривайте статистику подчиненных',
  },
  {
    selector: '#commonstats',
    content: 'Основные показатели',
  },
  {
    selector: '#sequences',
    content: 'Статистика по последовательностям',
  },
  {
    selector: '#types',
    content: 'Показывает самый используемый и самый эффективный тип взаимодействия',
  },
  {
    selector: '.fullcalendar-component',
    content: 'Календарь задач',
  },
  {
    selector: '#sales-value',
    content: 'Показатели перевода в лиды',
  },
];

const Dashboard = () => {
  const currentAccountId = useSelector((state) => state.common.Account.id);
  const activeAccountId = useSelector(
    (state) => state.dashboard.activeAccountId,
  );
  const isNeedSetEmailServer = useSelector(
    (state) => state.common.isNeedSetEmailServer,
  );

  const [
    dashboardStats,
    {
      data: dashboardStatsResponse = {
        ByAccount: {},
      },
    },
  ] = useLazyGetDashboardStatsQuery();

  useEffect(() => {
    dashboardStats();
  }, []);

  return (
    <>
      <DashBoardTabs data={dashboardStatsResponse.ByAccount} />
      <DashBoardStatistics
        tasks={
          (
            dashboardStatsResponse.ByAccount[
              activeAccountId || currentAccountId
            ] || {}
          ).ByTasks
        }
        sequences={
          (
            dashboardStatsResponse.ByAccount[
              activeAccountId || currentAccountId
            ] || {}
          ).Sequences
        }
      />
      <Container className="mt-5 mb-6" fluid>
        <Row className="mb-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <DashboardSequencesTable
              sequences={
                (
                  dashboardStatsResponse.ByAccount[
                    activeAccountId || currentAccountId
                  ] || {}
                ).Sequences
              }
            />
          </Col>
          <Col xl="4">
            <DashboardTypesInteractions
              tasks={
                (
                  dashboardStatsResponse.ByAccount[
                    activeAccountId || currentAccountId
                  ] || {}
                ).ByTasks
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xl="8">
            <FullCalendar />
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <DashboardSales />
          </Col>
        </Row>
      </Container>
      <InteractiveTour
        steps={tourSteps}
        name="dashboard"
        canShow={!isNeedSetEmailServer}
      />
    </>
  );
};

export default Dashboard;
