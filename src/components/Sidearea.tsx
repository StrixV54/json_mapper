import { RefObject, useRef } from "react";

interface props {
  secondaryText: string;
  setSecondaryText: (input: string) => void;
  mapData: React.MouseEventHandler<HTMLButtonElement>;
  resetData: React.MouseEventHandler<HTMLButtonElement>;
  undoData: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Sidearea({
  secondaryText,
  setSecondaryText,
  mapData,
  resetData,
  undoData,
}: props) {
  const key: RefObject<HTMLInputElement> = useRef(null);
  const value: RefObject<HTMLInputElement> = useRef(null);
  console.log(secondaryText.length);
  const list = Object.keys(
    typeof secondaryText === "object"
      ? secondaryText
      : secondaryText.length > 1
      ? JSON.parse(secondaryText)
      : ""
  );
  console.log(list);
  const inputList = secondaryText;

  const submitInput = () => {
    const { value: keyString } = key.current!;
    const { value: valueString } = value.current!;
    if (keyString && valueString) {
      // console.log(typeof secondaryText);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let updateJson: any = secondaryText;
      if (typeof secondaryText !== "object" && secondaryText == " ") {
        // console.log(keyString);
        updateJson = {
          [keyString]: valueString,
        };
      } else {
        updateJson[keyString] = valueString;
      }
      // console.log(updateJson);
      localStorage.setItem("secondary", JSON.stringify(updateJson));
      setSecondaryText(JSON.parse(JSON.stringify(updateJson)));
      key.current!.value = "";
      value.current!.value = "";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const removeItem = (item: any) => {
    // console.log("first");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateJson: any = secondaryText;
    console.log(updateJson);
    if (typeof updateJson === "object") {
      console.log("first");
      delete updateJson[item];
    } else {
      delete JSON.parse(updateJson)[item];
    }
    // console.log(JSON.stringify(updateJson));
    if (JSON.stringify(updateJson) == "{}") {
      // console.log(updateJson);
      localStorage.setItem("secondary", JSON.stringify(" "));
      setSecondaryText("");
    } else {
      // console.log(updateJson);
      localStorage.setItem("secondary", JSON.stringify(updateJson));
      setSecondaryText(updateJson);
    }
  };

  // console.log(JSON.stringify(secondaryText));

  return (
    <>
      <div className="sidebar">
        <div className="config-line">
          <button className="import-btn">Import Config</button>
          <button className="export-btn">Export this config</button>
        </div>
        <h4
          style={{
            color: "#d4d4d4",
            padding: "11px 0",
            fontFamily: "Inter",
            fontSize: "13px",
          }}
        >
          @ Replaces the key with the value in the given codebox
        </h4>
        <div className="input-section">
          <input className="sidebar-input1" placeholder="Key" ref={key}></input>
          <div>{"->"}</div>
          <input
            className="sidebar-input2"
            placeholder="Value"
            ref={value}
          ></input>
          <button className="sidebar-btn" onClick={submitInput}>
            Add
          </button>
        </div>
        <div className="viewbox">
          {secondaryText &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            list.map((item: any, id: number) => {
              return (
                <div className="divbar" key={id}>
                  <span className="showtext">{`${item}  ------>  ${inputList[item]}`}</span>
                  <button
                    className="showtext-removebtn"
                    onClick={() => removeItem(item)}
                  >
                    {" "}
                    x{" "}
                  </button>
                </div>
              );
            })}
        </div>
        <div className="btn-container">
          <button onClick={resetData}>RESET</button>
          <button onClick={undoData}>UNDO</button>
          <button onClick={mapData}>MAP</button>
        </div>
      </div>
    </>
  );
}
