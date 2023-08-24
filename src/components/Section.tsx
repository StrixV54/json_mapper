import { useEffect, useState } from "react";
// import CodeFlask from "./CodeFlask";
import CodeFlask from "codeflask";

function Section() {
  const [codeValue, setCodeValue] = useState("");
  const [undoText, setUndoText] = useState("");
  const [primaryText, setPrimaryText] = useState(" ");
  const [secondaryText, setSecondaryText] = useState([]);

  // if (newProps.code !== this.codeFlask.getCode()) {
  //   this.codeFlask.updateCode(newProps.code);
  // }
  // console.log(primaryText);

  useEffect(() => {
    console.log("first");
    const flask = new CodeFlask("#codebox", {
      language: "js",
      lineNumbers: true,
      handleTabs: true,
      defaultTheme: false,
    });
    flask.updateCode(primaryText);
    // flask.updateCode(primaryText);
    flask.onUpdate((code) => setPrimaryText(code));
  }, []);

  const mapdata = () => {
    // let data = primaryText;
    // data !== undoText && setUndoText(data);
    // try {
    //   let map = JSON.parse(secondaryText);
    //   // let map = secondaryText;
    //   // data = JSON.stringify(data);
    //   console.log(data, " ", map);
    //   // map.map((item) => console.log(item));
    //   Object.keys(map).forEach((item) => {
    //     console.log(item);
    //     data = data.includes(item) ? data.replace(item, map[item]) : data;
    //   });
    //   console.log("---", data, " ", map);
    //   setPrimaryText(data);
    // } catch (err) {
    //   console.log(
    //     err.toString().includes(`Expected property name or '}'`)
    //       ? "Json Error"
    //       : err
    //   );
    //   }
  };

  return (
    <div className="section">
      <div id="codebox" />
      {/* <div className="input-textbox">
        <textarea
          className="text-area"
          value={primaryText}
          onChange={(e) => setPrimaryText(e.target.value)}
        ></textarea>
      </div> */}
      <div className="sidebar">
        <textarea
          className="text-area"
          value={secondaryText}
          onChange={(e) => setSecondaryText(e.target.value)}
        ></textarea>
        <div>
          <button onClick={() => setPrimaryText("")}> RESET </button>
          <button onClick={() => setPrimaryText(undoText)}> UNDO </button>
          <button onClick={mapdata}> MAP </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
