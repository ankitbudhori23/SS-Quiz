import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";

import confettiAnimation from "../assests/animations/confetti.json";
import { DonutChart } from "./DonutChart";

export const Result = ({ results, totalQuestions }) => {
  const { correctAnswers, wrongAnswers, secondsUsed } = results;

  const handleRetry = () => {
    // Restart quiz
    window.location.reload();
  };

  return (
    <motion.div
      key={"result"}
      variants={{
        initial: {
          background: "#008b8b",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#07afaf",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="w-full h-[100vh] flex justify-center p-5"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col text-black font-bold text-[32px] text-center w-full h-full">

        <div className="mt-6 flex-1 bg-white border border-brand-light-gray rounded-2xl flex flex-col items-center py-7 px-2 ">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            autoplay={true}
            style={{ width: "170px", height: "170px" }}
          />
          <h3 className="text-brand-midnight text-[32px] font-medium leading-9 mt-4">
            Congratulations!
          </h3>
          <p className="text-brand-midnight text-xl font-normal mt-2">
            You scored
          </p>
          <span className="text-brand-midnight font-medium text-[40px]">
            {`${correctAnswers}/${totalQuestions}`}
          </span>
          <p className="text-brand-midnight text-sm font-normal mt-1">
            correct answers
          </p>

          {/* Charts */}
          <div className="flex items-center mt-4 space-x-4">
            <DonutChart
              className="w-36 h-36"
              total={60 * totalQuestions}
              used={secondsUsed}
              type={"time"}
              data={[
                {
                  label: "Time Used",
                  value: secondsUsed,
                  color: "#374CB7",
                },
                {
                  label: "Time Left",
                  value: 60 * totalQuestions - secondsUsed,
                  color: "#F0F0F0",
                },
              ]}
            />

            <DonutChart
              className="w-36 h-36"
              type={"questions"}
              total={totalQuestions}
              used={correctAnswers}
              data={[
                {
                  label: "Correct",
                  value: correctAnswers,
                  color: "#008b8b",
                },
                {
                  label: "Wrong",
                  value: wrongAnswers,
                  color: "#FF6A66",
                },
              ]}
            />
          </div>
        </div>

        {/* Retry Button */}
        <div className="mt-auto flex ">   
          <Button
            intent={"secondary"}
            size="small"
            block
            className="mt-6 mr-2"
            onClick={handleRetry}
          >
            Try Again
          </Button>
          <Button
            intent={"secondary"}
            size="small"
            block
            className="mt-6 ml-2"
            onClick={() => window.location.href = "https://studifysuccess.com/"}
          >
            Go Home
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
