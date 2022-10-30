import { Spinner } from "reactstrap";

const Loader = ({
  verticalAlign = "center",
  horizontalAlign = "top",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`d-flex ${
        verticalAlign === "center" ? "w-100 justify-content-center" : ""
      } ${horizontalAlign === "center" ? "align-items-center" : ""}`}
    >
      <Spinner color="primary" className={`${className}`} style={style} />
    </div>
  );
};

export default Loader;
