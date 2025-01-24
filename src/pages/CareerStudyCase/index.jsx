import { useState } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

// TRANSPORTATION & LOGISTICS
// HOSPITALITY & TOURISM
// DDDD
// AAAA
// CCCC
// BBBB

const data = [
  {
    title: "heheheh",
    content: {
      question: "What is the name of the company?",
      correct_answer: "Google",
    },
  },
  {
    title: "hahahah",
    content: {
      question: "What is the name of the company?",
      correct_answer: "Google",
    },
  },
];

// const data = window?.data_quiz || [];

const CareerStudyCase = () => {
  const [screen, setScreen] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState({
    id: null,
    item: null,
  });

  const onChangeScreen = (_screen) => {
    setScreen(_screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <Screen1
            onChangeScreen={onChangeScreen.bind(null, 2)}
            data={data}
            selectedCareer={selectedCareer}
            setSelectedCareer={setSelectedCareer}
          />
        );
      case 2:
        return (
          <Screen2 selectedCareer={selectedCareer} data={selectedCareer} />
        );
      default:
        return null;
    }
  };

  return <ScreenContainer>{renderScreen()}</ScreenContainer>;
};

export default CareerStudyCase;
