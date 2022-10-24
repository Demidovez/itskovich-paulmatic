import { Container, Row, Col } from "reactstrap";
import DashBoardStatistics from "components/DashBoardStatistics/DashBoardStatistics.js";
import FullCalendar from "components/FullCalendar/FullCalendar";
import DashBoardTabs from "components/DashBoardTabs/DashBoardTabs";
import InteractiveTour from "components/InteractiveTour/InteractiveTour";
import { useSelector } from "react-redux";
import DashboardSequencesTable from "components/DashboardSequencesTable/DashboardSequencesTable";
import DashboardTypesInteractions from "components/DashboardTypesInteractions/DashboardTypesInteractions";
import DashboardSales from "components/DashboardSales/DashboardSales";
import { useLazyGetDashboardStatsQuery } from "store/api/dashboard";
import { useEffect } from "react";

const tourSteps = [
  {
    selector: "#nav_item_index",
    content:
      "Страница Дашборд покажет текущие ваши показатели и ваших сотрудников.",
  },
  {
    selector: ".dashboard-tabs-component .tabs",
    content: "Просматривайте статистику сотрудников",
  },
  {
    selector: "#first-stat",
    content: "Основные показатели",
  },
  {
    selector: "#sequences",
    content: "Ваши последовательности",
  },
  {
    selector: "#types",
    content: "Все типы взаимодействий",
  },
  {
    selector: ".fullcalendar-component",
    content: "Календарь задач",
  },
  {
    selector: "#sales-value",
    content: "Показатели продаж",
  },
];

const Dashboard = () => {
  const currentAccountId = useSelector((state) => state.common.Account.id);
  const activeAccountId = useSelector(
    (state) => state.dashboard.activeAccountId
  );
  const isNeedSetEmailServer = useSelector(
    (state) => state.common.isNeedSetEmailServer
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
