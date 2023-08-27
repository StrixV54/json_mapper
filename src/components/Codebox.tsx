import CodeFlask from "codeflask";
import { useEffect } from "react";

export default function Codebox({ codeValue, primaryText, setPrimaryText }) {
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
    flask.onUpdate((code) => setPrimaryText(JSON.parse(code)));
  }, [codeValue]);

  return <div id="codebox"></div>;
}
