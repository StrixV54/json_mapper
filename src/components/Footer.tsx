function Footer({ isFullmode, setIsFullmode }) {
  return (
    <div className={`bottombar ${isFullmode ? "bottombar-fullmode" : ""}`}>
      <span>Footer</span>
    </div>
  );
}

export default Footer;
