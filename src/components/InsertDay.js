import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

//axios get / post 가지고 값을 가지고 온다.

export default function InsertDay() {
  //   let day = 0;
  const [days, setDays] = useState([]); //useState(기본값을 넣어서 사용한다.)
  //빈배열이 있을 때 무한 루프로 안빠지게 하는 모듈
  useEffect(() => {
    axios.get("http://127.0.0.1:8099/days").then((res) => {
      setDays(res.data);
    });
  }, []);
  const navigate = useNavigate();
  const insertDay = () => {
    // axios 가지고 json-server에 데이터 밀어넣기
    //
    //setDays(days + 1);
    //값을 추가할 때는 post
    axios.post("http://127.0.0.1:8099/day/add", { day: days.length + 1 }).then((res) => {
      if (res.data.insert === "ok") {
        alert("day가 추가되었습니다.");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="container dayBox">
        <h2 className="title">insert day</h2>
        <p className="current">
          current day :{" "}
          <strong>
            <span className="day">{days.length}</span>
            <span className="unit">day</span>
          </strong>
        </p>
        <div className="btns">
          <button className="btn" onClick={insertDay}>
            add day
          </button>
        </div>
      </div>
    </>
  );
}
