import { Countdown } from "./CountDown";
import { useState, useEffect } from "react";
import { Quiz } from "./Quiz";
import NotAvailable from "./NotAvailable";
import { useSearchParams } from "react-router-dom";
export const Start = () => {
  const [start, setStart] = useState(false);
  const [data, setdata] = useState([]);
    const [searchParams] = useSearchParams();
    const classs = searchParams.get("class");
    const subject = searchParams.get("subject");
    const ans = searchParams.get("showans");
  useEffect(() => {
    fetch(`https://ss-backend-xi.vercel.app/quiz/${subject}/${classs}`)
      .then((res) => res.json())
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  return !start ? (
    <Countdown
      onGoClick={() => {
        setStart(true);
      }}
    />
  ) : (
   
      data ? <Quiz data={data} showans={ans} cls={classs} sub={subject} /> : <NotAvailable cls={classs} sub={subject}/>
  );
};
