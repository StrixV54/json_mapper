import { useEffect, useLayoutEffect, useState } from "react";
import Sidearea from "./Sidearea";
import Codearea from "./Codearea";

function Section() {
  const defaultString =
    '{"This is a Key1":"ReplaceMe","THis is a Key2":"This is a Value2"}';
  const defaultSecondary = '{"ReplaceMe":"This is a Value1"}';

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
    let previous: string = undoText;
    // console.log(data, " ", undoText);
    // console.log(JSON.stringify(data) !== JSON.stringify(undoText));
    if (JSON.stringify(data).toString() !== JSON.stringify(undoText).toString()) {
      // console.log("Undo done");
      // setUndoText(data);
      previous = data;
    }
    try {
      const map: string = secondaryText;
      const isDigit: (inp: string) => boolean = (input: string) =>
        /^\d+$/.test(input);

      data = JSON.stringify(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(map).forEach((item: any) => {
        if (data.includes(item)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (isDigit(item)) {
            data = data.includes(`"${item}"`)
              ? data.replace(new RegExp(`"${item}"`, "g"), item)
              : data;
            data = data.replace(new RegExp(item, "g"), `"${map[item]}"`);
          } else {
            data = data.replace(new RegExp(item, "g"), map[item]);
          }
        }
      });

      if (JSON.stringify(JSON.parse(data)).toString() !== JSON.stringify(previous).toString()) {
        console.log("Undo done");
        // console.log(JSON.parse(data));
        setUndoText(previous);
      }

      console.log("Mapped JSON output", data);

      setPrimaryText(JSON.parse(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("current", typeof primaryText);
    localStorage.setItem("current", JSON.stringify(primaryText));
  }, [primaryText]);

  useEffect(() => {
    // console.log("secondary", typeof secondaryText);
    localStorage.setItem("secondary", JSON.stringify(secondaryText));
  }, [secondaryText]);

  useEffect(() => {
    // console.log("previous", typeof undoText);
    localStorage.setItem("previous", JSON.stringify(undoText));
  }, [undoText]);

  const resetData = () => {
    setPrimaryText("");
    setSecondaryText("");
  };

  const undoData = () => {
    if (undoText) {
      setPrimaryText(undoText);
    }
  };

  return (
    <div className="section">
      <Codearea primaryText={primaryText} setPrimaryText={setPrimaryText} />
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
