import { useEffect, useState } from "react";
import App_style from "./App_style.css";

function Card(props) {
  const {
    asin,
    productId,
    title,
    amazonLink,
    kod,
    linkDoKarty,
    nazwa,
    licznik,
    data,
    setData,
  } = props;

  const [color, setColor] = useState("");
  const [changeData, setchangeData] = useState();

  const handleClick = () => {
    if (
      amazonLink != "Amazon Link" &&
      linkDoKarty != "Link do karty towaru" &&
      amazonLink
    ) {
      window.open(amazonLink, "_blank");
      window.open(linkDoKarty, "_blank");
    }
  };

  const setFinalData = () => {
    if (data[licznik][8] === "tak") {
      setData((data[licznik][8] = "nie"));
      setchangeData((data[licznik][8] = "nie"));
      console.log("nie");
    } else if (data[licznik][8] === "nie") {
      setData((data[licznik][8] = "tak"));
      setchangeData((data[licznik][8] = "tak"));
      console.log("tak");
    } else if (data[licznik][8] === undefined) {
      setData((data[licznik][8] = "tak"));
      setchangeData((data[licznik][8] = "tak"));
      console.log("nie");
    }

    console.log(data[licznik]);

    checkColor();
  };

  const checkColor = () => {
    if (data[licznik][8] == null) setColor("white");
    if (data[licznik][8] === "tak") setColor("green");
    if (data[licznik][8] === "nie") setColor("red");
  };

  useEffect(() => {
    checkColor();
  }, []);

  return (
    // {/* <table>
    //   <tr>
    //     {" "}
    //     <td>{asin}</td>
    //     <td>{productId}</td>
    //     <td>{title}</td>
    //     <td>{amazonLink}</td>
    //     <td>{kod}</td>
    //     <td>{linkDoKarty}</td>
    //     <td>{nazwa}</td>
    //   </tr>
    // </table> */}

    <div className={`row ${color}`}>
      <div className="tuple counter">{licznik}</div>
      <div className="tuple asin">{asin}</div>
      <div className="tuple productId">{productId}</div>
      <div className="tuple title">{title}</div>
      <div className="tuple kod">{kod}</div>
      <div className="tuple nazwa">{nazwa}</div>
      <button onClick={handleClick} className="link">
        link
      </button>
      <button onClick={setFinalData} className="setData">
        ustaw
      </button>
    </div>
  );
}

export default Card;
