import CodeFlask from "codeflask";
import { useEffect } from "react";

interface props {
  codeValue: number;
  primaryText: string;
  setPrimaryText: (input: string) => void;
}

export default function Codebox({
  codeValue,
  primaryText,
  setPrimaryText,
}: props) {
  useEffect(() => {
    // console.log("first");
    const flask = new CodeFlask("#codebox", {
      language: "js",
      lineNumbers: true,
      handleTabs: true,
      defaultTheme: false,
    });
    // if (primaryText !== flask.getCode()) {
    //   flask.updateCode(primaryText);
    // }
    // let code = JSON.stringify(primaryText);
    // code = JSON.parse(code);
    flask.updateCode(
      primaryText === "" ? " " : JSON.stringify(primaryText, undefined, 4)
    );
    // flask.updateCode(primaryText);
    flask.onUpdate((code) => {
      if (primaryText !== "") {
        localStorage.setItem("current", code);
        setPrimaryText(JSON.parse(code));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeValue]);

  return <div id="codebox"></div>;
}
