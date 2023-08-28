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
  const list = Object.keys(secondaryText);
  const inputList = secondaryText;

  const submitInput = () => {
    const { value: keyString } = key.current!;
    const { value: valueString } = value.current!;
    if (keyString && valueString) {
      // console.log(secondaryText);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateJson: any = secondaryText;
      // console.log(updateJson);
      updateJson[keyString] = valueString;
      localStorage.setItem("secondary", JSON.stringify(updateJson));
      setSecondaryText(JSON.parse(JSON.stringify(updateJson)));
      key.current!.value = "";
      value.current!.value = "";
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
                  <button className="showtext-removebtn"> x </button>
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
