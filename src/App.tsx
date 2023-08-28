// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.scss";

import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";

function App() {
  const [isFullmode, setIsFullmode] = useState<boolean>(true);

  return (
    <>
      <Header isFullmode={isFullmode} setIsFullmode={setIsFullmode} />
      <Section />
      <Footer isFullmode={isFullmode} />
    </>
  );
}

export default App;
