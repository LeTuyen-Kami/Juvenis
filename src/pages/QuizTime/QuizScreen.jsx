import React, { useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { extractImage } from "../../utils";

const QUESTION_TYPE = {
  TEXT: 4,
  MULTIPLE_CHOICE: 3,
};

const QuestionItem = ({
  question,
  options,
  type,
  id,
  currentQuestion,
  selectedItem,
  setSelectedItem,
  onBlur,
}) => {
  const [text, setText] = useState("");

  const renderQuestion = () => {
    const _question = extractImage(question);
    return (
      <div className={"flex flex-col items-center text-base"}>
        {_question?.map((item, index) => {
          if (item?.type === "img") {
            return (
              <img
                key={index}
                src={item?.value}
                className={"my-4 w-[400px] max-md:max-w-70vw]"}
              />
            );
          }
          return item?.value;
        })}
      </div>
    );
  };

  const renderAnswer = () => {
    if (type === QUESTION_TYPE.TEXT) {
      return (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={
            "p-2 mt-5 w-full rounded-lg border-gray-300 border-1 focus:outline-1 focus:outline-blue-500 min-h-[100px]"
          }
          placeholder={"Enter your answer here..."}
          onBlur={() =>
            onBlur({
              id,
              answer: "",
              userInput: text,
            })
          }
        />
      );
    }

    return (
      <div className={"mt-5"}>
        {options?.map((option, index) => (
          <div
            onClick={() => setSelectedItem({ id, answer: option, index })}
            key={index}
            className={`font-semibold rounded-full bg-[#98B8DB] mb-2 px-8 py-3 text-white hover:bg-sky-700 active:outline outline-blue-500 shadow-lg cursor-pointer ${
              selectedItem?.index === index ? "bg-sky-700" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`text-base font-semibold mt-10 ${
        currentQuestion === id ? "" : "hidden"
      }`}
    >
      {renderQuestion()}
      {renderAnswer()}
    </div>
  );
};

const QuizScreen = ({
  data,
  setUserChoice,
  userChoice,
  onPressSubmit,
  timeLeft,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});

  const sections = data?.reduce((acc, question) => {
    if (!acc[question.group]) {
      acc[question.group] = [];
    }
    acc[question.group].push(question);
    return acc;
  }, {});

  // Flatten sections into an array for navigation
  const flattenedQuestions = Object.entries(sections)
    .reduce((acc, [section, questions]) => {
      if (!questions || questions.length === 0) return acc;
      return [
        ...acc,
        ...questions.map((q) => ({ ...q, sectionName: section })),
      ];
    }, [])
    ?.map((i, idx) => {
      return {
        ...i,
        id: idx,
      };
    });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onPressContinue = () => {
    if (currentQuestion === flattenedQuestions.length - 1) {
      onPressSubmit();
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    setSelectedItem({});
  };

  const currentSection = flattenedQuestions[currentQuestion]?.sectionName;
  const questionsInCurrentSection = sections[currentSection]?.length || 0;
  const currentQuestionInSection =
    flattenedQuestions
      .filter((q) => q.sectionName === currentSection)
      .findIndex((q) => q.id === flattenedQuestions[currentQuestion]?.id) + 1 ||
    0;

  return (
    <div className={"mb-10"}>
      <div className={"text-xl font-bold text-center text-red-600"}>
        Time Remaining: {formatTime(timeLeft)}
      </div>
      <div className={"flex flex-col items-center"}>
        <div
          className={
            "self-start mb-2 text-xl font-semibold text-blue-600 px-[15vw]"
          }
        >
          {currentSection}
        </div>
        <div className={"self-start px-[15vw] text-base text-[#024EA2]"}>
          Question {currentQuestionInSection} of {questionsInCurrentSection}{" "}
          {currentSection && `(${currentSection})`}
        </div>

        <Container className={"mt-2"}>
          {flattenedQuestions.map((question, index) => (
            <QuestionItem
              key={question.id || index}
              question={question.question}
              options={question.list_answer?.split("|")?.map((i) => i?.trim())}
              type={question.type}
              id={index}
              currentQuestion={currentQuestion}
              selectedItem={selectedItem}
              setSelectedItem={(item) => {
                setSelectedItem(item);
                setUserChoice((prev) => {
                  const existingIndex = prev.findIndex(
                    (choice) => choice.id === question.id
                  );
                  if (existingIndex !== -1) {
                    // Replace existing choice
                    const newChoices = [...prev];
                    newChoices[existingIndex] = {
                      ...question,
                      selectedItem: item,
                    };
                    return newChoices;
                  }
                  // Add new choice
                  return [
                    ...prev,
                    {
                      ...question,
                      selectedItem: item,
                    },
                  ];
                });
              }}
              onBlur={(item) => {
                setUserChoice((prev) => {
                  const existingIndex = prev.findIndex(
                    (choice) => choice.id === question.id
                  );
                  if (existingIndex !== -1) {
                    // Replace existing choice
                    const newChoices = [...prev];
                    newChoices[existingIndex] = {
                      ...question,
                      selectedItem: item,
                    };
                    return newChoices;
                  }
                  // Add new choice
                  return [
                    ...prev,
                    {
                      ...question,
                      selectedItem: item,
                    },
                  ];
                });
              }}
            />
          ))}
        </Container>
        <Button
          onClick={onPressContinue}
          className={
            "mt-8 text-2xl font-bold text-blue-600 bg-indigo-50 shadow-lg disabled:grayscale hover:enabled:bg-indigo-300"
          }
          style={{
            color: "#024EA2",
          }}
          //   disabled={
          //     currentQuestion === flattenedQuestions.length - 1
          //       ? false
          //       : !(
          //           userChoice?.[currentQuestion]?.selectedItem?.answer ||
          //           userChoice?.[currentQuestion]?.selectedItem?.userInput
          //         )
          //   }
        >
          {currentQuestion === flattenedQuestions.length - 1
            ? "Finish"
            : "Continue"}
        </Button>
      </div>
    </div>
  );
};

const MemoizedQuizScreen = React.memo(QuizScreen);
export default MemoizedQuizScreen;
