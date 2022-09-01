import { useState } from "react";
import axios from "axios";
export default function Voca(props) {
  const [isVisible, setiIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(props.isDone);
  const [info, setInfo] = useState(props);

  const toggleKor = function () {
    console.log(isVisible);
    setiIsVisible(!isVisible);
  };
  //컴퍼넌트 단위로 모든게 움직인다.
  const toggleDone = () => {
    console.log(props);
    axios
      .put(`https://prk-vocaapp.herokuapp.com/voca/${props.id}`, {
        isDone: !isDone,
      })
      .then((res) => {
        console.log(res);
        if (res.data.update === "OK") {
          setIsDone(!isDone);
        }
      });
  };

  const deleteVoca = () => {
    if (window.confirm("다외웠나요?")) {
      //console.log("delete");
      axios.delete(`https://prk-vocaapp.herokuapp.com/voca/${props.id}`).then((res) => {
        console.log(data);
        if (res.data.delete === "ok") {
          setInfo({ id: -1 });
        }
      });
    }
  };

  if (info.id === -1) {
    return null;
  }

  return (
    <li className={isDone ? "done" : ""} data-idx={props.id}>
      <div className="check">
        <label className="checkBox">
          <input type="checkBox" onChange={toggleDone} />
          <span className="label"></span>
        </label>
      </div>
      <div className="eng word">{props.eng}</div>
      <div className="kor word">{isVisible && props.kor}</div>
      <div className="btns">
        <button className="btn hidden" onClick={toggleKor}>
          Hidden
        </button>
        <button className="btn del" onClick={deleteVoca}>
          Del
        </button>
      </div>
    </li>
  );
}
