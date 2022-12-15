import { DAYS } from "components/SequencePageSchedule/SequencePageSchedule";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as IconChecked } from "../../assets/img/icons/common/checked_big.svg";
import "./SequencePageLaunch.scss";

const SequencePageLaunch = ({ isShow, onChange }) => {
  const pagesData = useSelector((state) => state.sequenceMaster.pages);
  const model = useSelector((state) => state.sequenceMaster.data.Spec.Model);
  const Types = useSelector((state) => state.common.Tasks.Types);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(
      Object.entries(pagesData).map(([key, page]) => {
        let description = "";

        if (key === "Steps") {
          const stepsCount = model.Steps.length;
          const types = Object.entries(
            model.Steps.reduce((acc, type) => {
              return { ...acc, [type.Type]: (acc[type.Type] || 0) + 1 };
            }, {})
          ).map(
            ([key, count]) =>
              `${count} ${
                (Types[key] || { Creds: { Title: key } }).Creds.Title
              }`
          );

          description = () => (
            <span>
              Ваша последовательность состоит из {stepsCount} шага(ов) (
              {types.map((type, index) => (
                <Fragment key={index}>
                  {index !== 0 ? ", " : ""}
                  <strong>{type}</strong>
                </Fragment>
              ))}
              )
            </span>
          );
        } else if (key === "Schedule") {
          const days = Object.values(DAYS).map((day) => day.labelOf);

          const activeDays = model.Schedule.map((day, index) =>
            day.length > 0 ? days[index] : undefined
          ).filter((day) => !!day);

          description = () => (
            <span>
              {activeDays.length ? (
                <>
                  Сообщения будут отправлены в
                  {activeDays.map((day, index) => (
                    <Fragment key={index}>
                      {index !== 0 ? ", " : " "}
                      <strong>{day}</strong>
                    </Fragment>
                  ))}
                </>
              ) : (
                "Расписание не сформировано"
              )}
            </span>
          );
        } else if (key === "People") {
          description = () => (
            <span>
              В последовательность{" "}
              {model.ContactIds.length > 0
                ? `добавлено ${model.ContactIds.length} контактов`
                : "не добавлены контакты"}
            </span>
          );
        } else if (key === "Duration") {
          description = () => (
            <span>Приблизительная продолжительность 1 день</span>
          );
        }

        return {
          ...page,
          description,
        };
      })
    );
  }, [JSON.stringify(pagesData), isShow]);

  return (
    <>
      {isShow ? (
        <div className="sequence-page-launch-component modal-body d-flex flex-column overflow-auto ml--0 mr--0 pl-0 pr-0 justify-content-center1">
          {pages.map((page, index) => (
            <div
              key={index}
              className="d-flex page-launch"
              style={page.isDone ? null : { opacity: 0.6 }}
            >
              <div className="d-flex align-items-center pl-3 pr-3">
                <IconChecked
                  style={{ height: 60, width: 60 }}
                  fill={page.isDone ? "#5e72e4" : "gray"}
                />
              </div>
              <div>
                <h4>{page.label}</h4>
                <p className="mb-0">{page.description()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SequencePageLaunch;
