import { useLayoutEffect, useState } from "react";
// import CodeFlask from "./CodeFlask";
import Codebox from "./Codebox";
import Sidearea from "./Sidearea";

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

  const mapData = () => {
    let data: string = primaryText;
    if (data.toString() !== undoText.toString()) {
      // console.log("undo");
      localStorage.setItem("previous", data);
      setUndoText(data);
    }
    try {
      const map: string = secondaryText;
      const isDigit = (input: string) => /^\d+$/.test(input);
      data = JSON.stringify(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(map).forEach((item: any) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        error.toString().includes(`Expected property name or '}'`)
          ? "Json Error"
          : error
      );
    }
  };

  const resetData = () => {
    setPrimaryText("");
    setSecondaryText("");
    setCodeValue((prev) => prev + 1);
  };

  const undoData = () => {
    if (undoText) {
      localStorage.setItem("current", JSON.stringify(undoText));
      setPrimaryText(undoText);
      setCodeValue((prev) => prev + 1);
    }
  };

  return (
    <div className="section">
      <Codebox
        codeValue={codeValue}
        primaryText={primaryText}
        setPrimaryText={setPrimaryText}
      />
      <Sidearea
        secondaryText={secondaryText}
        setSecondaryText={setSecondaryText}
        resetData={resetData}
        undoData={undoData}
        mapData={mapData}
      />
    </div>
  );
}

export default Section;
