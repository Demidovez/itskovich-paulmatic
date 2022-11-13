import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";

const Scrollbar = ({ className = "", children, style = null }) => {
  //   const containerRef = useRef(null);

  //   useLayoutEffect(() => {
  //     const scrollbar = ScrollbarLib.init(containerRef.current, {
  //       damping: 0.075,
  //       renderByPixels: false,
  //       delegateTo: document,
  //     });

  //     return () => {
  //       scrollbar.destroy();
  //     };
  //   }, []);

  return (
    <SimpleBar
      className={className}
      style={style}
      forceVisible="y"
      autoHide={false}
    >
      {children}
    </SimpleBar>
  );
};

export default Scrollbar;
