import { FaReact, FaSass } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import ImgDiffViewer from "../assets/react-diffviewer.png";

interface props {
  isFullmode: boolean;
}
//function Footer(props: { isFullmode: boolean }) {
//function Footer({isFullmode}: props)

function Footer({ isFullmode }: props) {
  return (
    <div className={`bottombar ${isFullmode ? "bottombar-fullmode" : ""}`}>
      <div className="techstack">
        Created with
        <FaReact className="ficon" /> React,
        <img src="https://codemirror.net/style/logo.svg" alt="Codeflask" />
        CodeMirror,
        <img
          src={ImgDiffViewer}
          alt="React Diff Viewer"
          className="imgdiffviewer"
        />
        React Diff Viewer,
        <FaSass className="ficon" /> SCSS &nbsp;&
        <BiLogoTypescript className="ficon" /> Typescript
      </div>
      <span>
        Made with <b>&hearts;</b> by Strix
      </span>
    </div>
  );
}

export default Footer;
