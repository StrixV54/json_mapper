import { useState } from "react";

function Header({ isFullmode, setIsFullmode }) {
  return (
    <div className={`topbar ${isFullmode ? "topbar-fullmode" : ""}`}>
      <div className="header-container">
        <div className={`logo ${isFullmode ? "logo-ani" : ""}`}>
          PLAY WITH JSON
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
