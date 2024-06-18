import { useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const MultipleChoice = ({ question, options, id, currentChoice }) => {
  return (
    <div
      className={`text-base font-semibold mt-10 ${
        currentChoice === id ? "" : "hidden"
      }`}
    >
      <div className={" text-base"}>{question}</div>
      <div className={"mt-10"}>
        {options.map((option, index) => (
          <div
            key={index}
            className={
              "font-semibold rounded-full bg-[#98B8DB] mb-2 px-8 py-3 text-white hover:bg-[#024EA2] active:outline outline-blue-500 shadow-lg cursor-pointer"
            }
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const choice = {
  question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const listChoice = [...Array(10).keys()].map((_, index) => {
  return {
    id: index,
    question: choice.question
      .split(" ")
      .sort(() => Math.random() - 0.5)
      .join(" "),
    options: choice.options.sort(() => Math.random() - 0.5),
  };
});

const Screen3 = ({ selectedItem }) => {
  const [currentChoice, setCurrentChoice] = useState(0);

  return (
    <div className={"mb-10"}>
      <div className={"text-center text-xl font-semibold"}>Health Science</div>
      <div className={"flex flex-col items-center"}>
        <div className={"self-start px-[15vw]"}>{selectedItem.title}</div>
        <div className={"self-start px-[15vw] text-base text-[#024EA2]"}>
          Question {currentChoice + 1} of {listChoice.length}
        </div>

        <Container className={"mt-2"}>
          {listChoice.map((choice) => (
            <MultipleChoice
              key={choice.id}
              {...choice}
              currentChoice={currentChoice}
            />
          ))}
          <Button
            onClick={() => setCurrentChoice(currentChoice + 1)}
            className={"mt-8"}
          >
            Continue
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Screen3;
