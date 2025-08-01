import { useId, useRef } from "react";
import { ReferenceDot } from "recharts";
import { createPortal } from "react-dom";

function Arrow({
  height,
  start,
  end,
  secondarrow = false,
  unfinished = false,
  color,
}) {
  /*console.log(
    "Arrow component rendered with start:",
    start,
    "end:",
    end,
    "height:",
    height
  );*/
  const startRef = useRef();
  const endRef = useRef();
  return (
    <g className="arrow">
      <ReferenceDot
        x={start}
        y={height} // you need to implement this function
        r={1}
        fill={"red"}
        stroke={"red"}
        isAnimationActive={false}
        shape={<circle ref={startRef} visibility="hidden" />}
      />
      <ReferenceDot
        x={end}
        y={height} // you need to implement this function
        r={1}
        fill={"red"}
        stroke={"red"}
        isAnimationActive={false}
        shape={<circle ref={endRef} visibility="hidden" />}
      />
      {startRef.current?.getBoundingClientRect &&
        endRef.current?.getBoundingClientRect &&
        createPortal(
          <ArrowInPortal
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
            y={
              endRef.current.getBoundingClientRect().y +
              window.scrollY +
              endRef.current.getBoundingClientRect().height / 2
            }
            label={
              (secondarrow ? "+" : "") +
              (unfinished ? " >" : "") +
              Math.round(end - start) +
              "y"
            }
            color={secondarrow ? color : "#B12C00"}
            unfinished={unfinished}
          />,
          document.body
        )}
    </g>
  );
}

function ArrowInPortal({
  startX,
  endX,
  y,
  label,
  color,
  textColor = "#333",
  unfinished,
}) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: startX + 1,
          top: y - 21,
          width: endX - startX - 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "26px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: textColor,
            flexGrow: 1,
            position: "relative",
            top: "3px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            height: "5px",
            border: `2px solid ${color}`,
            borderBottomWidth: "1px",
            borderTop: "none",
            borderRightWidth: unfinished ? 0 : "2px",
            width: "100%",
            flexGrow: 0,
          }}
        ></div>
        <div
          style={{
            height: "5px",
            border: `2px solid ${color}`,
            borderTopWidth: "1px",
            borderBottom: "none",
            borderRightWidth: unfinished ? 0 : "2px",
            width: "100%",
            flexGrow: 0,
          }}
        ></div>
      </div>
      {unfinished && (
        <>
          <div
            style={{
              position: "absolute",
              left: endX - 9,
              top: y - 6,
              width: 8,
              height: 8,
              borderColor: color,
            }}
            className="arrow-end"
          ></div>
          <img
            src="images/animated-dots.webp"
            style={{
              position: "absolute",
              left: endX + 5,
              top: y - 11,
              height: 20,
              borderColor: color,
            }}
          />
        </>
      )}
    </>
  );
}

export default Arrow;
