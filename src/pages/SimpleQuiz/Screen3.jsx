import { useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const MultipleChoice = ({
  question,
  options,
  id,
  currentChoice,
  selectedItem,
  setSelectedItem,
  correctAnswerIndex,
}) => {
  const isCorrect = selectedItem?.index === correctAnswerIndex;

  const isSelected = !!selectedItem?.answer;

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
          {options[correctAnswerIndex]}
        </span>
        ”.
      </div>
    );
  };

  return (
    <div
      className={`text-base font-semibold mt-10 ${
        currentChoice === id ? "" : "hidden"
      }`}
    >
      <div className={" text-base"}>{question}</div>
      <div className={"mt-5"}>
        {renderStatus()}
        {options.map((option, index) => (
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
    </div>
  );
};

const Screen3 = ({
  selectedItem: _selectedItem,
  data,
  setUserChoice,
  userChoice,
  onPressSubmit,
}) => {
  const [currentChoice, setCurrentChoice] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [choiceListIndex, setChoiceListIndex] = useState([]);
  const [canSelect, setCanSelect] = useState(true);

  console.log(_selectedItem);

  const category = data?.find((item) => {
    return item.id === _selectedItem.id;
  });

  const listChoice = category?.content?.list_question?.map((item, index) => {
    return {
      id: index,
      question: item.question,
      list_answer: item.list_answer.split("|")?.map((item) => item.trim()),
      correct_answer: +item.correct_answer - 1 || 0,
    };
  });

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
    if (currentChoice === listChoice.length - 1) {
      onPressSubmit();
    }
  };

  const onPressContinue = () => {
    //check if user choice then return
    if (!selectedItem.answer) {
      return;
    }

    if (currentChoice === listChoice.length - 1) {
      return;
    }

    console.log("chouce", choiceListIndex);

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
              correctAnswerIndex={choice.correct_answer}
              id={index}
              currentChoice={currentChoice}
              selectedItem={selectedItem}
              setSelectedItem={onPressItem}
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
              display:
                currentChoice === listChoice.length - 1 ? "none" : "block",
            }}
          >
            {/* {currentChoice === listChoice.length - 1 ? "Done" : "Continue"} */}
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen3;
