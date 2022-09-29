const AvatarSymbols = ({ name, className = "" }) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        background: "#5da85d",
        color: "white",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      {name
        .toUpperCase()
        .split(" ")
        .map((word) => word[0])
        .join("")}
    </div>
  );
};

export default AvatarSymbols;
