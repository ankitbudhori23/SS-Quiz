import { CheckCircle } from "../icons/CheckCircle";
import { importantToKnow } from "../content/content";
import { Button } from "./Button";

export const Intro = ({ onGetStartedClick }) => {
  return (
    <div className="px-5 py-8 flex-1 w-full lg:max-w-4xl mx-auto flex flex-col overflow-hidden min-h-[100vh]">
      <div className="w-full flex flex-col flex-1 items-center z-10">
        <a href="https://www.studifysuccess.com/"><h1 className="text-[#008b8b] font-bold text-[40px] sm:text-4xl">
          studifysuccess
        </h1></a>

        <h3 className="text-black font-bold text-2xl mt-[51.55px] sm:text-3xl">
          Things to know before you start:
        </h3>

        <div className="flex flex-col items-start mt-6 sm:mt-10 space-y-5">
          {importantToKnow.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle />
              <p className="text-sm text-brand-storm-dust font-normal sm:text-xl text-[#424242]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full z-10 bg-[#008b8b]"
        block
        size={"medium"}
        onClick={onGetStartedClick}
      >{`Let's Get Started`}</Button>
    </div>
  );
};
