import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";

export const Countdown = ({ onGoClick }) => {
  const countdown = useCountdown(5);

  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#008b8b",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#008b8b",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="w-full h-full flex justify-center items-center px-5"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-white font-bold text-[32px] min-h-[100vh] py-10">
        <h1>studifysuccess</h1>
        <p className="mt-[116px]">Your quiz starts in</p>
        <div className="flex justify-center items-center mt-[38px] rounded-full border-8 border-white w-[196px] h-[196px] bg-transparent">
          {countdown !== 0 ? (
            <span className="text-[118px]">{countdown}</span>
          ) : (
            <span className="text-[88px] cursor-pointer" onClick={onGoClick}>
              GO
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
