function Header() {
  return (
    <div className="topbar">
      <div className="logo">Logo</div>
      <div className="route-select">
        <button className="mapper-btn">Json Mapper</button>
        <button className="jsonstring-btn">Json to String</button>
      </div>
      <div className="switch">DarkMode</div>
    </div>
  );
}

export default Header;
