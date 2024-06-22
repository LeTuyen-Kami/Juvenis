import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { extractImage } from "../../utils";

const MultipleChoice = ({
  question,
  options,
  type,
  id,
  currentChoice,
  selectedItem,
  setSelectedItem,
  correctAnswerIndex,
  onBlur,
}) => {
  const isCorrect = selectedItem?.index === correctAnswerIndex;
  const [text, setText] = useState("");

  const isSelected = !!selectedItem?.answer;

  // useEffect(() => {
  //   setText(selectedItem?.userInput || "");
  // }, [selectedItem]);

  const renderStatus = () => {
    if (!isSelected) {
      return <div className={"opacity-0 text-lg"}>h</div>;
    }

    if (isCorrect) {
      return (
        <div className={"text-green-600 text-lg font-normal"}>
          You are correct!
        </div>
      );
    }

    return (
      <div className={"text-red-600 text-lg font-normal italic"}>
        The correct answer is “
        <span className={"text-red-600 text-lg font-bold"}>
          {options?.[correctAnswerIndex]}
        </span>
        ”.
      </div>
    );
  };

  const renderQuestion = () => {
    const _question = extractImage(question);
    return (
      <div className={"text-base flex items-center flex-col"}>
        {_question?.map((item, index) => {
          if (item?.type === "img") {
            return (
              <img
                key={index}
                src={item?.value}
                className={"w-[400px] my-4 max-md:max-w-70vw]"}
              />
            );
          }
          return item?.value;
        })}
      </div>
    );
  };

  const renderAnswer = () => {
    if (type === "2") {
      return (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={
            "w-full p-2 rounded-lg border-1 border-gray-300 focus:outline-1 focus:outline-blue-500 mt-5 min-h-[100px]"
          }
          placeholder={"Enter your answer here..."}
          onBlur={() =>
            onBlur({
              id,
              answer: "",
              index: selectedItem?.index,
              userInput: text,
            })
          }
        />
      );
    }

    return (
      <div className={"mt-5"}>
        {renderStatus()}
        {options?.map((option, index) => (
          <div
            onClick={() => setSelectedItem({ id, answer: option, index })}
            key={index}
            className={`font-semibold rounded-full bg-[#98B8DB] mb-2 px-8 py-3 text-white hover:bg-sky-700 active:outline outline-blue-500 shadow-lg cursor-pointer ${
              selectedItem?.index === index
                ? "bg-sky-700"
                : index === correctAnswerIndex && isSelected
                ? "bg-red-500"
                : ""
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
        currentChoice === id ? "" : "hidden"
      }`}
    >
      {renderQuestion()}
      {renderAnswer()}
    </div>
  );
};

const Screen3 = ({
  selectedItem: _selectedItem,
  data,
  setUserChoice,
  userChoice,
  onPressSubmit,
  onChangeScreen,
}) => {
  const [currentChoice, setCurrentChoice] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [choiceListIndex, setChoiceListIndex] = useState([]);
  const [canSelect, setCanSelect] = useState(true);
  const [isFinish, setIsFinish] = useState(false);

  const category = data?.find((item) => {
    return item.id === _selectedItem.id;
  });

  const listChoice = category?.content?.list_question?.map((item, index) => {
    return {
      id: index,
      question: item.question,
      list_answer: item.list_answer?.split("|")?.map((item) => item.trim()),
      correct_answer: +item.correct_answer - 1 || 0,
      type: item?.type,
    };
  });

  const onBlur = (_item) => {
    setUserChoice((prev) => {
      const existingChoiceIndex = prev.findIndex(
        (item) => item?.index === currentChoice
      );
      if (existingChoiceIndex !== -1) {
        // Update existing choice
        const newChoices = [...prev];
        newChoices[existingChoiceIndex] = {
          ...prev[existingChoiceIndex],
          selectedItem: _item,
        };
        return newChoices;
      } else {
        const choice = listChoice[currentChoice];

        // Add new choice if it doesn't exist
        return [
          ...prev,
          {
            ...choice,
            index: currentChoice,
            selectedItem: _item,
          },
        ];
      }
    });
  };

  const onPressItem = (_item) => {
    console.log("onPressItem", _item, canSelect);
    if (!canSelect) {
      return;
    }
    setCanSelect(false);
    setSelectedItem(_item);

    const choice = listChoice[currentChoice];

    setUserChoice((prev) => {
      return [
        ...prev,
        {
          ...choice,
          currentChoice,
          selectedItem: _item,
        },
      ];
    });
    setChoiceListIndex((prev) => {
      return [...prev, currentChoice];
    });

    //if last item choice then submit
  };

  const onPressContinue = () => {
    //check if user choice then return

    if (listChoice[currentChoice].type !== "2" && !selectedItem?.answer) {
      return;
    }

    if (currentChoice === listChoice.length - 1 && isFinish) {
      return;
    }

    if (choiceListIndex.includes(currentChoice + 1)) {
      console.log("1");
      setCanSelect(false);
      const currentSelect = userChoice.find((item) => {
        return item.currentChoice === currentChoice + 1;
      });
      setSelectedItem(currentSelect?.selectedItem);
    } else {
      console.log("2");
      setCanSelect(true);

      setSelectedItem({});
      console.log("onPressContinue");
    }
    setCurrentChoice((prev) => {
      if (prev === listChoice.length - 1) {
        return prev;
      }
      return prev + 1;
    });
    if (currentChoice === listChoice.length - 1) {
      onPressSubmit();
      setIsFinish(true);
    }
  };

  const onPressBack = () => {
    if (currentChoice === 0) {
      return;
    }

    setCanSelect(false);
    setCurrentChoice((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
    const prevSelect = userChoice.find((item) => {
      return item.currentChoice === currentChoice - 1;
    });
    setSelectedItem(prevSelect?.selectedItem);
  };

  useEffect(() => {
    //clear userChoice
    setUserChoice([]);
  }, []);

  return (
    <div className={"mb-10"}>
      <div className={"text-center text-xl font-semibold"}>
        {_selectedItem.title || ""}
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"self-start px-[15vw]"}>
          {_selectedItem?.content?.list_question?.[currentChoice]?.group || ""}
        </div>
        <div className={"self-start px-[15vw] text-base text-[#024EA2]"}>
          Question {currentChoice + 1} of {listChoice.length}
        </div>

        <Container className={"mt-2"}>
          {listChoice.map((choice, index) => (
            <MultipleChoice
              key={choice.id}
              question={choice.question}
              options={choice.list_answer}
              type={choice?.type}
              correctAnswerIndex={choice.correct_answer}
              id={index}
              currentChoice={currentChoice}
              selectedItem={selectedItem}
              setSelectedItem={onPressItem}
              onBlur={onBlur}
            />
          ))}
        </Container>
        <div className={"flex justify-evenly mt-4 w-full"}>
          <Button
            onClick={onPressBack}
            className={
              "mt-8 shadow-lg bg-indigo-50 text-blue-600 text-2xl font-bold hover:enabled:bg-indigo-300"
            }
            style={{
              color: "#024EA2",
              display: currentChoice === 0 ? "none" : "block",
            }}
          >
            Back
          </Button>
          <Button
            onClick={onPressContinue}
            className={
              "mt-8 shadow-lg bg-indigo-50 text-blue-600 text-2xl font-bold hover:enabled:bg-indigo-300"
            }
            style={{
              color: "#024EA2",
            }}
          >
            {currentChoice === listChoice.length - 1 ? "Finish" : "Continue"}
          </Button>
        </div>
        {isFinish && (
          <Button className={"mt-5"} onClick={onChangeScreen}>
            Back to category
          </Button>
        )}
      </div>
    </div>
  );
};

export default Screen3;
