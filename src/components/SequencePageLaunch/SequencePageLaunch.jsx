import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as IconChecked } from "../../assets/img/icons/common/checked_big.svg";
import "./SequencePageLaunch.scss";

const SequencePageLaunch = ({ onChange }) => {
  const dispatch = useDispatch();

  const pagesData = useSelector((state) => state.sequenceMaster.pages);
  const model = useSelector((state) => state.sequenceMaster.data.Model);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(
      Object.entries(pagesData).map(([key, page]) => {
        let description = "";

        if (key === "Steps") {
          description =
            "Ваша последовательность состоит из 7 шагов (1 email, 2 whatsapp, 1 telegram, 3 manual email)";
        } else if (key === "Schedule") {
          description =
            "Письма будут отправлены в Понедельник, Среду и Субботу";
        } else if (key === "People") {
          description = `В последовательность ${
            model.ContactIds.length > 0
              ? `добавлено ${model.ContactIds.length} контактов`
              : "не добавлены контакты"
          }`;
        } else if (key === "Duration") {
          description = "Приблизительная продолжительность 1 день";
        }

        return {
          ...page,
          description,
        };
      })
    );
  }, [JSON.stringify(pagesData)]);

  return (
    <div className="sequence-page-launch-component modal-body d-flex flex-column overflow-auto ml--0 mr--0 pl-0 pr-0 justify-content-center1">
      {pages.map((page, index) => (
        <div
          key={index}
          className="d-flex page-launch"
          style={page.isDone ? null : { opacity: 0.6 }}
        >
          <div className="d-flex align-items-center pl-3 pr-3">
            <IconChecked
              style={{ height: 25, width: 25 }}
              fill={page.isDone ? "#5e72e4" : "gray"}
            />
          </div>
          <div>
            <h4>{page.label}</h4>
            <p className="mb-0">{page.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SequencePageLaunch;
