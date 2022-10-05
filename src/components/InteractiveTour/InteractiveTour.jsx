import { useEffect, useState } from "react";
import Tour from "reactour";

const InteractiveTour = ({ name = "none", steps }) => {
  const [isStartTour, setIsStartTour] = useState(false);

  useEffect(() => {
    const tours = JSON.parse(localStorage.getItem("tours")) || {};
    if (tours[name] === "closed") {
      setIsStartTour(false);
    } else {
      setIsStartTour(true);
    }
  }, []);

  const closeTour = () => {
    const tours = JSON.parse(localStorage.getItem("tours")) || {};

    localStorage.setItem(
      "tours",
      JSON.stringify({ ...tours, [name]: "closed" })
    );

    setIsStartTour(false);
  };

  return (
    <>
      {steps ? (
        <Tour
          steps={steps}
          isOpen={isStartTour}
          onRequestClose={closeTour}
          rounded={5}
          accentColor={"#5e72e4"}
          className="tour-modal"
        />
      ) : null}
    </>
  );
};

export default InteractiveTour;
