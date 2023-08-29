import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";

interface props {
  primaryText: string;
  setPrimaryText: (input: string) => void;
}

function Codearea({ primaryText, setPrimaryText }: props) {
  // const options = {
  //   mode: "javascript", // Set the CodeMirror mode
  //   theme: "material", // Set the CodeMirror theme
  //   lineNumbers: true, // Show line numbers
  // };

  // const code = 'console.log("Hello, world!");'; // Initial code content
  // console.log(JSON.stringify(primaryText).toString());

  return (
    <CodeMirror
      className="Codearea"
      width="100%"
      value={
        primaryText === ""
          ? primaryText
          : JSON.stringify(primaryText, undefined, 4).toString()
      }
      theme={vscodeDark}
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
        tabSize: 2,
      }}
      extensions={[langs.json()]}
      onChange={(value, viewUpdate) => {
        console.log(viewUpdate);
        console.log("value:", value);
        try {
          setPrimaryText(JSON.parse(value));
        } catch (error) {
          console.log("Check your Json, Clear LocalStorage to fix it up\n", error);
        }
      }}
    />
  );
}

export default Codearea;
