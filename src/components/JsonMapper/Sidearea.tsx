import { ChangeEvent, MouseEventHandler, RefObject, useRef } from "react";

interface props {
  secondaryText: string;
  setSecondaryText: (input: string) => void;
  isCodeEmpty: boolean;
  mapData: MouseEventHandler<HTMLButtonElement>;
  resetData: MouseEventHandler<HTMLButtonElement>;
  undoData: MouseEventHandler<HTMLButtonElement>;
}

export default function Sidearea({
  secondaryText,
  setSecondaryText,
  mapData,
  resetData,
  undoData,
  isCodeEmpty,
}: props) {
  const key: RefObject<HTMLInputElement> = useRef(null);
  const value: RefObject<HTMLInputElement> = useRef(null);
  const list = Object.keys(secondaryText == "" ? "{}" : secondaryText);
  // console.log(list);
  const inputList = secondaryText;

  const submitInput = () => {
    const { value: keyString } = key.current!;
    const { value: valueString } = value.current!;
    if (keyString && valueString) {
      // console.log(secondaryText);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let updateJson: any = secondaryText;
      if (typeof secondaryText !== "object" && secondaryText === "") {
        updateJson = {
          [keyString]: valueString,
        };
      } else {
        updateJson[keyString] = valueString;
      }
      // console.log(updateJson);
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
      // console.log("first");
      delete updateJson[item];
    } else {
      delete JSON.parse(updateJson)[item];
    }
    // console.log(JSON.stringify(updateJson));
    if (JSON.stringify(updateJson) == "{}") {
      setSecondaryText("");
    } else {
      setSecondaryText(updateJson);
    }
  };

  // console.log(JSON.stringify(secondaryText));

  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(secondaryText, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dataConfig.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const configUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target!.result;
        try {
          const jsonData = JSON.parse(content as string);
          console.log("JSON data:", jsonData);
          // console.log(typeof jsonData);
          setSecondaryText(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="config-line">
          <button onClick={undoData}>UNDO</button>
          <button onClick={resetData}>RESET</button>
          <input
            type="file"
            accept=".json"
            onChange={configUpload}
            className="import-btn"
            id="import-input"
          />
          <label className="import-btn-label" htmlFor="import-input">
            Import Config
          </label>
          <button onClick={downloadConfig} className="export-btn">
            Export this config
          </button>
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
          <button onClick={mapData} disabled={isCodeEmpty}>
            MAP
          </button>
        </div>
      </div>
    </>
  );
}
