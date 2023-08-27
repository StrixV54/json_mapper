import { useRef } from "react";

export default function Sidearea({ secondaryText, setSecondaryText }) {
  const key = useRef(null);
  const value = useRef(null);
  // console.log(typeof secondaryText);
  // console.log(
  //   "list ",
  //   typeof secondaryText === "string"
  //     ? JSON.parse(secondaryText)
  //     : secondaryText
  // );
  const list = Object.keys(secondaryText);
  const inputList = secondaryText;

  const submitInput = () => {
    const keyString = key.current.value;
    const valueString = value.current.value;
    if (keyString && valueString) {
      // console.log(secondaryText);
      let updateJson = secondaryText;
      // console.log(updateJson);
      updateJson[keyString] = valueString;
      localStorage.setItem("secondary", JSON.stringify(updateJson));
      setSecondaryText(JSON.parse(JSON.stringify(updateJson)));
      key.current.value = "";
      value.current.value = "";
    }
  };

  // console.log(JSON.stringify(secondaryText));

  return (
    <>
      <div className="input-section">
        <input className="sidebar-input1" placeholder="Key" ref={key}></input>
        <div>{"->"}</div>
        <input
          className="sidebar-input2"
          placeholder="Value"
          ref={value}
        ></input>
        <button className="sidebar-btn" onClick={submitInput}>
          Add
        </button>
      </div>
      <div className="viewbox">
        {secondaryText &&
          list.map((item, id) => {
            return (
              <div className="divbar" key={id}>
                {/* {console.log(item, " ---> ", inputList[item])} */}
                <span className="showtext">{`${item}  ------>  ${inputList[item]}`}</span>
                <button className="showtext-removebtn"> x </button>
              </div>
            );
          })}
      </div>
      {/* <textarea
        className="text-area"
        value={secondaryText}
        onChange={(e) => {
          localStorage.setItem("secondary", JSON.stringify(e.target.value));
          setSecondaryText(e.target.value);
        }}
      ></textarea> */}
    </>
  );
}
