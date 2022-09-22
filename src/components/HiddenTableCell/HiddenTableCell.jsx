import { useState } from "react";
import { Button, Spinner } from "reactstrap";

const HiddenTableCell = ({ value }) => {
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
    <td className="p-0">
      {value && !isShow ? (
        <Button
          onClick={onShow}
          size="sm"
          style={{ width: 100 }}
          color="primary"
        >
          {isLoading ? <Spinner size="sm" /> : "Получить"}
        </Button>
      ) : null}
      {isShow && value}
    </td>
  );
};

export default HiddenTableCell;
