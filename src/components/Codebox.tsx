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
    flask.updateCode(primaryText);
    // flask.updateCode(primaryText);
    flask.onUpdate((code) => setPrimaryText(code));
  }, [codeValue]);

  return <div id="codebox"></div>;
}
