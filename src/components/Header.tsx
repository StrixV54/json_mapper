import { useState } from "react";
import Logo from "../assets/json-logo.png";

function Header({ isFullmode, setIsFullmode }) {
  return (
    <div className={`topbar ${isFullmode ? "topbar-fullmode" : ""}`}>
      <div className="header-container">
        <div className={`logo ${isFullmode ? "logo-ani" : ""}`}>
          <img src={Logo} className="json-logo" />
          PLAY WITH JSON{" "}
          <p className="para">
            This Projects aims to make it easier to work with JSONs which have
            picklist values to which you want to replace with respective value
            or maybe just changing from JSON to String or vice versa.
          </p>
        </div>
        <div className="route-select">
          <button className="mapper-btn" onClick={() => setIsFullmode(false)}>
            Json Mapper
          </button>
          <button className="jsonstring-btn">Json to String</button>
        </div>
        <div></div>
      </div>
      {/* <div className="switch">DarkMode</div> */}
    </div>
  );
}

export default Header;
