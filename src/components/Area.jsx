import { useId, useRef } from "react";
import { ReferenceDot } from "recharts";
import { createPortal } from "react-dom";

function Area({ startX, endX, startY, endY, color, opacity }) {
  /*console.log(
    "Area component rendered with startX:",
    startX,
    "endX:",
    endX,
    "startY:",
    startY,
    "endY:",
    endY,
    "color:",
    color,
    "opacity:",
    opacity
  );*/
  const startRef = useRef();
  const endRef = useRef();
  return (
    <g className="area">
      <ReferenceDot
        x={startX}
        y={startY} // you need to implement this function
        r={1}
        fill={"red"}
        stroke={"red"}
        isAnimationActive={false}
        shape={<circle ref={startRef} visibility="hidden" />}
      />
      <ReferenceDot
        x={endX}
        y={endY} // you need to implement this function
        r={1}
        fill={"red"}
        stroke={"red"}
        isAnimationActive={false}
        shape={<circle ref={endRef} visibility="hidden" />}
      />
      {startRef.current?.getBoundingClientRect &&
        endRef.current?.getBoundingClientRect &&
        createPortal(
          <AreaInPortal
            startX={
              startRef.current.getBoundingClientRect().x +
              window.scrollX +
              startRef.current.getBoundingClientRect().width / 2
            }
            endX={
              endRef.current.getBoundingClientRect().x +
              window.scrollX +
              endRef.current.getBoundingClientRect().width / 2
            }
            startY={
              endRef.current.getBoundingClientRect().y +
              window.scrollY +
              endRef.current.getBoundingClientRect().height / 2
            }
            endY={
              startRef.current.getBoundingClientRect().y +
              window.scrollY +
              startRef.current.getBoundingClientRect().height / 2
            }
            color={color}
            opacity={opacity} 
          />,
          document.body
        )}
    </g>
  );
}

function AreaInPortal({ startX, endX, startY, endY, color, opacity }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: startX,
          top: startY,
          width: endX - startX,
          height: endY - startY,
          backgroundColor: color,
          opacity: opacity,
          zIndex: -1,
        }}
      ></div>
    </>
  );
}

export default Area;
