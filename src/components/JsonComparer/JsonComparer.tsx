import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import Codearea from "../JsonMapper/Codearea";
// import { GoAlertFill } from "react-icons/go";

function JsonComparer() {
  const [isShowDiff, setIsShowDiff] = useState<boolean>(false);
  const [leftCodeTest, setLeftCodeTest] = useState<string>("");
  const [rightCodeTest, setRightCodeTest] = useState<string>("");

  const sortJsonCode = (jsonObject: string) => {
    const jsonArray = Object.entries(jsonObject);
    jsonArray.sort((a, b) => a[0].localeCompare(b[0]));
    const sortedObject = Object.fromEntries(jsonArray);
    return sortedObject as unknown as string;
  };

  const sortJsonCodeAndSet = (
    jsonObject: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCodeTest: (input: any) => void
  ) => {
    const jsonArray = Object.entries(jsonObject);
    jsonArray.sort((a, b) => a[0].localeCompare(b[0]));
    jsonArray.map((item) => {
      if (item && item[1]) {
        if (typeof item[1] === "object") {
          item[1] = sortJsonCode(item[1]);
        }
      }
      return item;
    });
    const sortedObject = Object.fromEntries(jsonArray);
    setCodeTest(sortedObject);
  };

  const isCodeAreaEmpty: boolean = leftCodeTest === "" && rightCodeTest === "";

  const showDiff = () => {
    // console.log(leftCodeTest, " - ", rightCodeTest);
    if (!isCodeAreaEmpty) {
      sortJsonCodeAndSet(leftCodeTest, setLeftCodeTest);
      sortJsonCodeAndSet(rightCodeTest, setRightCodeTest);
      setIsShowDiff((prev) => !prev);
    }
  };

  return (
    <div className="jsoncomparer-section">
      <div>
        <button onClick={showDiff} disabled={isCodeAreaEmpty}>
          {isShowDiff ? "Reset" : "Compare"}
        </button>
      </div>
      <div className={`codearea-container ${isShowDiff ? "tableshow" : ""}`}>
        {isShowDiff ? (
          <ReactDiffViewer
            // className=""
            oldValue={JSON.stringify(leftCodeTest, undefined, 2)}
            newValue={JSON.stringify(rightCodeTest, undefined, 2)}
            splitView={true}
            disableWordDiff={true}
            useDarkTheme={true}
            showDiffOnly={false}
          />
        ) : (
          <>
            <Codearea
              primaryText={leftCodeTest}
              setPrimaryText={setLeftCodeTest}
            />
            <Codearea
              primaryText={rightCodeTest}
              setPrimaryText={setRightCodeTest}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default JsonComparer;
