import { useEffect, useState } from "react";
// import CodeFlask from "./CodeFlask";
import Codebox from "./Codebox";
import Textarea from "./Textarea";
import CodeFlask from "codeflask";

function Section() {
  const [codeValue, setCodeValue] = useState<number>(0);
  const [undoText, setUndoText] = useState<string>(" ");
  const [primaryText, setPrimaryText] = useState<string>(
    '{"key":"lol","ger":123}'
  );
  const [secondaryText, setSecondaryText] = useState<string>('{"123":"23212"}');

  // if (newProps.code !== this.codeFlask.getCode()) {
  //   this.codeFlask.updateCode(newProps.code);
  // }
  // console.log(primaryText);

  // console.log(undoText);

  const mapdata = () => {
    let data: string = primaryText;
    console.log(data, "  -- ", undoText);
    // if (data.toString() !== undoText.toString()) return;
    data.toString() !== undoText.toString() && setUndoText(data);
    try {
      let map = JSON.parse(secondaryText);
      // let map = secondaryText;
      data = JSON.stringify(primaryText);
      // console.log(data, " ", map);
      // map.map((item) => console.log(item));
      Object.keys(map).forEach((item) => {
        // console.log(typeof item);
        // const [key, value] = map[item];
        data = data.includes(item) ? data.replace(item, map[item]) : data;
      });
      console.log("---", data, " ", map);
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
        <h4 style={{ color: "#d4d4d4" }}>
          Replaces the keys with the values in codebox
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
        <div>
          <button
            onClick={() => {
              setPrimaryText(" ");
              setCodeValue((prev) => prev + 1);
            }}
          >
            RESET
          </button>
          <button
            onClick={() => {
              // console.log(undoText);
              setPrimaryText(undoText);
              setCodeValue((prev) => prev + 1);
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
