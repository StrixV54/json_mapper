import { Link } from "react-router-dom";
import Logo from "../assets/json-logo1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface props {
  isFullmode: boolean;
  setIsFullmode: (input: boolean) => void;
}

function Header({ isFullmode, setIsFullmode }: props) {
  return (
    <div className={`topbar ${isFullmode ? "topbar-fullmode" : ""}`}>
      <div className="header-container">
        <div className={`logo ${isFullmode ? "logo-ani" : ""}`}>
          <LazyLoadImage alt="Logo" className="json-logo" src={Logo} />
          {/* <img src={Logo} className="json-logo" /> */}
          PLAY WITH JSON
          <p className="para">
            This Project aims to make it easier to work with JSONs. Like you
            want picklist values to replace with their respective value or maybe
            just want to compare between JSONs.
          </p>
        </div>
        <div className="route-select">
          <Link
            className="mapper-btn"
            to="/jsonmapper"
            onClick={() => setIsFullmode(false)}
          >
            Json Mapper
          </Link>
          <Link
            className="jsoncomparer-btn"
            to="/jsoncomparer"
            onClick={() => setIsFullmode(false)}
          >
            Json Comparer
          </Link>
        </div>
        <div></div>
      </div>
      {/* <div className="switch">DarkMode</div> */}
    </div>
  );
}

export default Header;
