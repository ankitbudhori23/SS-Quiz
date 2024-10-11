import { Tick, Close } from "../icons/index";

const correctAnswerBadge = (
  <div className="bg-brand-paris-green text-white px-3 py-2 flex items-center justify-center space-x-2 rounded-[53px]">
    <Tick />
    <p className="text-xs font-jakarta font-medium">Correct answer</p>
  </div>
);

const wrongAnswerBadge = (
  <div className="bg-brand-danger text-white px-3 py-2 flex items-center justify-center space-x-2 rounded-[53px]">
    <Close />
    <p className="text-xs font-jakarta font-medium">Your answer</p>
  </div>
);

export const OptionList = ({
  options,
  selectedAnswerIndex,
  onAnswerSelected,
  isCorrectAnswer,
  activeQuestion,
  showAnswer,
}) => {
  const correctAnswerIndex = options.findIndex(
    (option) => option === activeQuestion.option1,
  );

  const renderSelectedOptionBadge = (idx) => {
    if (selectedAnswerIndex === -1) {
      return null;
    }

    if (selectedAnswerIndex === idx) {
      return (
        <div className="absolute top-[50%] -translate-y-1/2 right-2 z-10">
          {isCorrectAnswer ? correctAnswerBadge : wrongAnswerBadge}
        </div>
      );
    }
  };

  const renderCorrectBadge = (idx) => {
    if (selectedAnswerIndex === -1) {
      return null;
    }

    if (correctAnswerIndex === idx) {
      return (
        <div className="absolute top-[50%] -translate-y-1/2 right-2 z-10">
          {correctAnswerBadge}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-start space-y-3">
      {options?.map((option, idx) => (
        <div
          key={idx}
          className={`relative font-jakarta flex items-center space-x-2 rounded-xl border px-6 py-4 w-full cursor-pointer select-none
          ${idx === selectedAnswerIndex ? "bg-[#008b8b6d]" : "border-brand-black"}`}
          onClick={() => {
            if (selectedAnswerIndex !== -1) {
              return;
            }
            onAnswerSelected(idx);
          }}
        >
          <p className="text-brand-midnight font-normal text-base">{option}</p>
          {showAnswer && renderSelectedOptionBadge(idx)}
          {showAnswer && renderCorrectBadge(idx)}
        </div>
      ))}
    </div>
  );
};
