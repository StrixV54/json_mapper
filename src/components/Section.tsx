import { useState } from "react";

function Section() {
  const [codeValue, setCodeValue] = useState("");
  const [undoText, setUndoText] = useState("");
  const [primaryText, setPrimaryText] = useState("");
  const [secondaryText, setSecondaryText] = useState([]);

  const mapdata = () => {
    let data = primaryText;
    data !== undoText && setUndoText(data);
    try {
      let map = JSON.parse(secondaryText);
      // let map = secondaryText;
      // data = JSON.stringify(data);
      console.log(data, " ", map);
      // map.map((item) => console.log(item));
      Object.keys(map).forEach((item) => {
        console.log(item);
        data = data.includes(item) ? data.replace(item, map[item]) : data;
      });
      console.log("---", data, " ", map);
      setPrimaryText(data);
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
      <div className="input-textbox">
        <textarea
          className="text-area"
          value={primaryText}
          onChange={(e) => setPrimaryText(e.target.value)}
        ></textarea>
      </div>
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
