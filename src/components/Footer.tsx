import { FaReact, FaSass } from "react-icons/fa";

// interface props {
//   isFullmode: boolean;
// }
//function Footer({isFullmode}: props)

function Footer(props: { isFullmode: boolean }) {
  return (
    <div
      className={`bottombar ${props.isFullmode ? "bottombar-fullmode" : ""}`}
    >
      <div className="techstack">
        Created with
        <FaReact className="ficon" /> React,
        <img
          src="https://kazzkiq.github.io/CodeFlask/logo.svg"
          alt="Codeflask"
        />
        CodeFlask.js,
        <FaSass className="ficon" /> SCSS
      </div>
      <span>
        Made with <b>&hearts;</b> by Strix
      </span>
    </div>
  );
}

export default Footer;
