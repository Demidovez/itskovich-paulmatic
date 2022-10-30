import { useState } from "react";
import { Button, Spinner } from "reactstrap";

const HiddenTableCell = ({ value, style }) => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onShow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsShow(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <td className="p-0 text-nowrap" style={style}>
      {value && !isShow ? (
        <Button
          onClick={onShow}
          size="sm"
          style={{ width: 100 }}
          color="primary"
          className="ml-2 mr-2 mt-3 mb-3 btn-outline-primary"
        >
          {isLoading ? <Spinner size="sm" /> : "Получить"}
        </Button>
      ) : null}
      {isShow && <div className="pt-3 pb-3">{value}</div>}
    </td>
  );
};

export default HiddenTableCell;
