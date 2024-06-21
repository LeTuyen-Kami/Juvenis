import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen3 from "./Screen3";
import Screen4, { calculateResult, calculatePoint } from "./Screen4";
// import { data } from "./fakeData";
// import { data } from "./fakeData";

const data = window?.data_quiz || [];

const CareerTest = () => {
  const [screen, setScreen] = useState(1);
  const [selectData, setSelectData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const stringResult = (_data) => {
    const calulatedPoint = calculatePoint(_data);

    const sortedPoint = calulatedPoint.sort((a, b) => b.value - a.value);

    const biggestPoint = sortedPoint[0].value;

    return (
      Object.keys(_data)
        .map((key) => {
          let point = 0;
          const table = data.find((item) => item.id === key);

          const question = table?.content?.list_question
            ?.map((item, index) => {
              const currentPoint = +_data?.[key]?.[index] - 1 || 0;
              point += currentPoint;
              return `${item} (${currentPoint});`;
            })
            .join(" ");

          if (point === biggestPoint) {
            return `${table?.title} : ${question} => Total Point: ${point} (Best)`;
          }

          return `${table?.title} => Total Point: ${point}`;
        })
        .join("<br>") +
      "<br>Result:" +
      calculateResult(data, _data)
    );
  };

  const onPressSubmit = () => {
    const result = stringResult(selectData);
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
        category: 1,
      }),
    }).catch(() => {});
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <Screen1
            onChangeScreen={onChangeScreen}
            lang={data?.[0]?.lang || "en"}
          />
        );
      case 2:
        return (
          <Info
            onPressContinue={(info) => {
              onChangeScreen(3);
              setUserInfo(info);
            }}
            language={data?.[0]?.lang || "en"}
          />
        );
      case 3:
        return (
          <Screen3
            data={data}
            onChangeScreen={() => {
              onChangeScreen(4);
              onPressSubmit();
            }}
            setSelectData={setSelectData}
            selectData={selectData}
            lang={data?.[0]?.lang || "en"}
          />
        );
      case 4:
        return (
          <Screen4
            selectData={selectData}
            data={data}
            lang={data?.[0]?.lang || "en"}
          />
        );
    }
  };

  return <ScreenContainer>{renderScreen()}</ScreenContainer>;
};

export default CareerTest;
