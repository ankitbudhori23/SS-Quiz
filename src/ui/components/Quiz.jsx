import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { OptionList } from "./OptionList";
import { formatTime } from "../utils/formatTime";
import { Result } from "./Result";

const TIME_LIMIT = 20; // 1 minute per question - 60 for 1 min

export const Quiz = ({ data,showans=false, cls, sub }) => {
  const [quizQuestions, setquizQuestions] = useState(data);
  const timerRef = useRef;

  const showAnswers = showans; //true for show right answer
  const [timePassed, setTimePassed] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [results, setResults] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    secondsUsed: 0,
  });
  const { question, option1, option2, option3, option4 } =
    quizQuestions[activeQuestion];

  const [options, setoptions] = useState([option1, option2, option3, option4]);
  const numberOfQuestions = quizQuestions.length;

  const setupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimePassed((prevTimePassed) =>
        prevTimePassed > TIME_LIMIT ? TIME_LIMIT : prevTimePassed + 1
      );
    }, 1000);
  };

  useEffect(() => {
    if (quizFinished) return;

    setupTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizFinished]);

  useEffect(() => {
    if (quizFinished) return;

    if (timePassed > TIME_LIMIT) {
      // The time limit has been reached for this question
      // So the answerr will be considered wrong

      // Update results
      if (selectedAnswerIndex === -1) {
        setResults((prev) => ({
          ...prev,
          secondsUsed: prev.secondsUsed + TIME_LIMIT,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
      }

      handleNextQuestion();
      // Restart timer
      setTimePassed(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePassed]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handleNextQuestion = () => {
    // Reset selected answer
    setSelectedAnswerIndex(-1);
    // Check if quiz finished
    if (activeQuestion + 1 >= quizQuestions.length) {
      // console.log("Quiz finished!");
      setQuizFinished(true);
      return;
    }

    const { option1, option2, option3, option4 } =
      quizQuestions[activeQuestion + 1];
    setoptions(shuffle([option1, option2, option3, option4]));

    // Set next question
    setActiveQuestion((prev) => prev + 1);
    // Reset timer
    setupTimer();
    setTimePassed(0);
  };

  const handleSelectAnswer = (answerIndex) => {
    //  Stop timer
    clearInterval(timerRef.current);
    setSelectedAnswerIndex(answerIndex);
    // Check if answer is correct
    const selectedAnswer = options[answerIndex];
    const correctAnswer = quizQuestions[activeQuestion].option1;

    if (correctAnswer === selectedAnswer) {
      // console.log("Correct answer!");
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        correctAnswers: prev.correctAnswers + 1,
      }));

      setIsCorrectAnswer(true);
    } else {
      // console.log("Wrong answer!");
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      setIsCorrectAnswer(false);
    }
    !showAnswers && setTimeout(() => {
      handleNextQuestion();
    },1000)
    

  };

  if (quizFinished) {
    return <Result results={results} totalQuestions={quizQuestions.length} />;
  }

  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#008b8b",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#ffffff",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="w-full h-full flex justify-center"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col text-black font-bold text-[35px] text-center w-full min-h-[100vh] p-5">
        <h1 className="font-bold text-base text-[#008b8b] capitalize">
          Quiz for class-{cls}, subject-{sub}
        </h1>
        <div className="mt-6 rounded-2xl border border-brand-light-gray px-7 py-4 w-full mb-1">
          <h3 className="text-black font-medium text-sm">
            Question {activeQuestion + 1} / {numberOfQuestions}
          </h3>

          <div
            key={activeQuestion}
            className="flex justify-center items-center w-full mt-[18px]"
          >
            {/* Start time */}
            <span className="text-brand-mountain-mist text-xs font-normal">
              {formatTime(timePassed)}
            </span>

            {/* Bar */}
            <div className="relative flex-1 h-3 bg-[#F0F0F0] mx-1 rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#008b8b] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(timePassed / TIME_LIMIT) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            {/* End time */}
            <span className="text-brand-mountain-mist text-xs font-normal">
              {formatTime(TIME_LIMIT)}
            </span>
          </div>

          <h4 className="text-brand-midnight font-large md:text-[20px] md:mb-[40px] text-base mt-[34px]">
            {question}
          </h4>
        </div>

        <OptionList
          activeQuestion={quizQuestions[activeQuestion]}
          options={options}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={handleSelectAnswer}
          isCorrectAnswer={isCorrectAnswer}
          showAnswer={showAnswers}
        />

         {showAnswers && <div className="mt-auto mb-10 w-full z-10 bg-green-400">
          <Button
            disabled={selectedAnswerIndex === -1}
            block
            size="small"
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        </div> 
        }
      </div>
    </motion.div>
  );
};
