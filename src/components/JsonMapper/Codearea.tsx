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
      className="codearea"
      width="100%"
      height="100%"
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange={(value, _viewUpdate) => {
        try {
          if (value === "") setPrimaryText("");
          else setPrimaryText(JSON.parse(value));
        } catch (error) {
          console.log(
            "Check and Fix your Json, Clear your LocalStorage if app breaks\n",
            error
          );
        }
      }}
    />
  );
}

export default Codearea;
