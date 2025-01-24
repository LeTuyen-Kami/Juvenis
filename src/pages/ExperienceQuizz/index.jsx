import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Sumary from "./Summary";
// import { data } from "./fakeData";

const data = window?.data_quiz || [];

const fieldsConfig = [
  {
    key: "name",
    label: { vi: "Họ & Tên", en: "Name" },
    placeholder: { vi: "Nhập họ và tên", en: "Enter name" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Họ và tên không được để trống",
      en: "Name is required",
    },
    colspan: 1,
  },
  {
    key: "email",
    label: { vi: "Email", en: "Email" },
    placeholder: { vi: "Nhập email", en: "Enter email" },
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessages: { vi: "Email không hợp lệ", en: "Invalid email" },
    colspan: 1,
  },
  {
    key: "phone",
    label: { vi: "Số điện thoại", en: "Phone" },
    placeholder: { vi: "Nhập số điện thoại", en: "Enter phone" },
    validation: (value) =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
    errorMessages: {
      vi: "Số điện thoại không hợp lệ",
      en: "Invalid phone number",
    },
    colspan: 1,
  },
  {
    key: "class",
    label: { vi: "Lớp", en: "Class" },
    placeholder: { vi: "Nhập lớp", en: "Enter class" },
    validation: (value) => /^\d{1,2}$/.test(value),
    errorMessages: { vi: "Lớp không hợp lệ", en: "Invalid class" },
    colspan: 1,
  },
  {
    key: "school",
    label: { vi: "Tên trường học", en: "School" },
    placeholder: { vi: "Nhập tên trường học", en: "Enter school" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Trường học không được để trống",
      en: "School is required",
    },
    colspan: 2,
  },
];

export default function ExperienceQuiz() {
  const [screen, setScreen] = useState(1);
  // const [selectedItem, setSelectedItem] = useState(data[0]);
  const selectedItem = data[0];
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
          : "";
        const correctAnswer =
          questionObj?.list_answer?.[questionObj?.correct_answer];
        const userInput =
          questionObj?.selectedItem && questionObj?.selectedItem?.userInput
            ? questionObj?.selectedItem?.userInput
            : "";

        if (!userAnswer) {
          return `Question ${questionNumber}: ${questionContent}, Input Answer: ${userInput}`;
        }

        if (!userInput) {
          return `Question ${questionNumber}: ${questionContent}, User answer: ${userAnswer}, Correct Answer: ${correctAnswer}`;
        }

        return `Question ${questionNumber}: ${questionContent}, User answer: ${userAnswer}, Correct Answer: ${correctAnswer}, Input Answer: ${userInput}`;
      })
      .join("<br>");
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
        school: `Class ${userInfo?.class} - School ${userInfo.school}`,
        result: result,
        category: 4,
      }),
    }).catch(() => {
      //
    });
    onChangeScreen(4);
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
            fields={fieldsConfig}
            language={selectedItem?.lang}
          />
        );
      case 2:
        return (
          <Screen2
            onChangeScreen={onChangeScreen.bind(null, 3)}
            data={selectedItem?.content?.description}
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
      case 4:
        return <Sumary answers={userChoice} language="en" />;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer>
      <div className={"font-bold text-2xl text-center"}>
        HEALTH SCIENCE JOB EXPLORATION{" "}
      </div>
      {renderScreen(screen)}
    </ScreenContainer>
  );
}
