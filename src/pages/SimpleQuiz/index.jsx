import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";

// const data = [
//   {
//     id: "2",
//     title: "Health Science",
//     content: {
//       list_question: [
//         {
//           group: "ETHICAL PATIENT INTERACTION",
//           question:
//             "Maddie is a certified holistic healer and has been promising her patients that her special concoction of tulip petals, coconut oil, and a ‘secret’ ingredient that she claims will cure almost any skin condition. However, after a chemist gets ahold of Maddie’s concoction and alerts customers that the ‘special’ ingredient is simply food coloring, Maddie is put out of business largely for:",
//           type: "1",
//           list_answer:
//             "active listening | data breach | medical quackery | non-verbal communication",
//           correct_answer: "2",
//         },
//         {
//           group: "ETHICAL PATIENT INTERACTION",
//           question:
//             "Chrissy is speaking with her doctor but notices that he is tapping his foot and continuously looking at his watch. What do these behaviors MOST LIKELY make Chrissy think about her doctor?",
//           type: "1",
//           list_answer:
//             "He is incredibly intelligent | He thinks she’s funny | He is very interested in what she is saying | He isn’t paying attention",
//           correct_answer: "1",
//         },
//       ],
//     },
//     category: "2",
//     lang: "en",
//   },
// ];

const data = window?.data_quiz || [];

export default function SimpleQuiz() {
  const [screen, setScreen] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userChoice, setUserChoice] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const onPressSubmit = () => {
    fetch("https://juvenismaxime.com/wp-json/jm-quiz/client-result", {
      method: "POST",
      body: JSON.stringify({
        full_name: userInfo.name,
        email: userInfo.email,
        phone_number: userInfo.phone,
        year_of_birth: userInfo.birthYear,
        school: userInfo.school,
        result: userChoice,
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
