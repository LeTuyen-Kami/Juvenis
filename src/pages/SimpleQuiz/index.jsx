import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";

const data = window?.data_quiz || [];

export default function SimpleQuiz() {
  const [screen, setScreen] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userChoice, setUserChoice] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  function formatQuestions(questions) {
    return questions
      ?.map?.((questionObj, index) => {
        const questionNumber = index + 1;
        const questionContent = questionObj?.question;
        const userAnswer = questionObj?.selectedItem
          ? questionObj?.selectedItem?.answer
          : "N/A";
        const correctAnswer =
          questionObj?.list_answer?.[questionObj?.correct_answer];
        const userInput =
          questionObj?.selectedItem && questionObj?.selectedItem?.userInput
            ? questionObj?.selectedItem?.userInput
            : "N/A";

        return `Question ${questionNumber}: ${questionContent}, User answer: ${userAnswer}, Correct Answer: ${correctAnswer}, Input Answer: ${userInput}`;
      })
      .join("\n");
  }

  const onPressSubmit = () => {
    const result = formatQuestions(userChoice);

    fetch("https://juvenismaxime.com/wp-json/jm-quiz/client-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: userInfo.name,
        email: userInfo.email,
        phone_number: userInfo.phone,
        year_of_birth: userInfo.birthYear,
        school: userInfo.school,
        result: result,
        category: 2,
      }),
    }).catch(() => {
      //
    });
  };

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return (
          <Info
            showTitle={false}
            onPressContinue={(info) => {
              onChangeScreen(2);
              setUserInfo(info);
            }}
            language="en"
          />
        );
      case 2:
        return (
          <Screen2
            onChangeScreen={onChangeScreen.bind(null, 3)}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            data={data}
          />
        );
      case 3:
        return (
          <Screen3
            selectedItem={selectedItem}
            data={data}
            setUserChoice={setUserChoice}
            userChoice={userChoice}
            onPressSubmit={onPressSubmit}
            onChangeScreen={onChangeScreen.bind(null, 2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenContainer>
      <div className={"font-bold text-2xl text-center"}>CAREER QUIZZ</div>
      {renderScreen(screen)}
    </ScreenContainer>
  );
}
