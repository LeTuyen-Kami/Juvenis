import { useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const MultipleChoice = ({ question, options, id, currentChoice, selectedItem, setSelectedItem }) => {
console.log('options',options,question)

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
            onClick={() => setSelectedItem({ id, answer: option })}
            key={index}
            className={
              `font-semibold rounded-full bg-[#98B8DB] mb-2 px-8 py-3 text-white hover:bg-[#024EA2] active:outline outline-blue-500 shadow-lg cursor-pointer ${
                selectedItem?.answer === option ? "bg-[#024EA2]" : ""
              }`
            }
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const Screen3 = ({ selectedItem: _selectedItem, data,setUserChoice }) => {
  const [currentChoice, setCurrentChoice] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});

  const category = data?.find(item=>{
    return item.id === _selectedItem.id
  })

  const listChoice = category?.content?.list_question?.map((item,index)=>{
    return {
      id: index,
      question: item.question,
      list_answer: item.list_answer.split("|")?.map(item=>item.trim())
    }
  });


  const onPressContinue = () => {
    const choice = listChoice[currentChoice];
    setUserChoice(prev=>{
      return [...prev,{
        ...choice,
        userSelection: selectedItem?.answer || ""
      }]
    })
    setSelectedItem({});
    console.log("onPressContinue");
    setCurrentChoice(prev=>{
      if (prev === listChoice.length - 1) {
        return prev;
      }
      return prev + 1;
    });

  };

  return (
    <div className={"mb-10"}>
      <div className={"text-center text-xl font-semibold"}>{_selectedItem.title || ""}</div>
      <div className={"flex flex-col items-center"}>
        <div className={"self-start px-[15vw]"}>{_selectedItem.title || ""}</div>
        <div className={"self-start px-[15vw] text-base text-[#024EA2]"}>
          Question {currentChoice + 1} of {listChoice.length}
        </div>

        <Container className={"mt-2"}>
          {listChoice.map((choice,index) => (
            <MultipleChoice
              key={choice.id}
              question={choice.question}
              options={choice.list_answer}
              id={index}
              currentChoice={currentChoice}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
          <Button
            onClick={onPressContinue}
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
