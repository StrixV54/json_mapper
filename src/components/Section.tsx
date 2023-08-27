import { useEffect, useLayoutEffect, useState } from "react";
// import CodeFlask from "./CodeFlask";
import Codebox from "./Codebox";
import Textarea from "./Sidearea";
import CodeFlask from "codeflask";

function Section() {
  const defaultString =
    '{"This is a Key1":"ReplaceMe","THis is a Key2":"This is a Value2"}';
  const defaultSecondary = '{"ReplaceMe":"This is a Value1"}';

  const [codeValue, setCodeValue] = useState<number>(0);
  const [undoText, setUndoText] = useState<string>(
    JSON.parse(localStorage.getItem("previous") || defaultString)
  );
  const [primaryText, setPrimaryText] = useState<string>(
    JSON.parse(localStorage.getItem("current") || defaultString)
  );
  const [secondaryText, setSecondaryText] = useState<string>(
    JSON.parse(localStorage.getItem("secondary") || defaultSecondary)
  );

  useLayoutEffect(() => {
    !localStorage.getItem("previous") &&
      localStorage.setItem("previous", defaultString);
    !localStorage.getItem("current") &&
      localStorage.setItem("current", defaultString);
    !localStorage.getItem("secondary") &&
      localStorage.setItem("secondary", defaultSecondary);
  }, []);

  const mapdata = () => {
    let data = primaryText;
    if (data.toString() !== undoText.toString()) {
      // console.log("undo");
      localStorage.setItem("previous", data);
      setUndoText(data);
    }
    try {
      const map = secondaryText;
      const isDigit = (input: string) => /^\d+$/.test(input);
      data = JSON.stringify(data);
      Object.keys(map).forEach((item) => {
        // console.log(typeof map[item]);
        data = data.includes(item)
          ? data.replace(
              new RegExp(item, "g"),
              isDigit(item) ? `\\"${map[item]}\\"` : map[item]
            )
          : data;
      });
      localStorage.setItem("current", data);
      setPrimaryText(JSON.parse(data));
      setCodeValue((prev) => prev + 1);
    } catch (err) {
      console.log(
        err.toString().includes(`Expected property name or '}'`)
          ? "Json Error"
          : err
      );
    }
  };

  return (
    <div className="section">
      <Codebox
        codeValue={codeValue}
        primaryText={primaryText}
        setPrimaryText={setPrimaryText}
      />
      {/* <div className="input-textbox">
        <textarea
          className="text-area"
          value={primaryText}
          onChange={(e) => setPrimaryText(e.target.value)}
        ></textarea>
      </div> */}
      <div className="sidebar">
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
        <Textarea
          secondaryText={secondaryText}
          setSecondaryText={setSecondaryText}
        />
        {/* <textarea
          className="text-area"
          value={secondaryText}
          onChange={(e) => setSecondaryText(e.target.value)}
        ></textarea> */}
        <div className="btn-container">
          <button
            onClick={() => {
              setPrimaryText("");
              setSecondaryText("");
              setCodeValue((prev) => prev + 1);
            }}
          >
            RESET
          </button>
          <button
            onClick={() => {
              // console.log(undoText);
              if (undoText) {
                localStorage.setItem("current", JSON.stringify(undoText));
                setPrimaryText(undoText);
                setCodeValue((prev) => prev + 1);
              }
            }}
          >
            UNDO
          </button>
          <button
            onClick={() => {
              mapdata();
            }}
          >
            MAP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
