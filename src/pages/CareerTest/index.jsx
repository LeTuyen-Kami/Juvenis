import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

const data = window?.data_quiz || [];

const CareerTest = () => {
  const [screen, setScreen] = useState(1);
  const [selectData, setSelectData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const stringResult = (_data) => {
    return Object.keys(_data)
      .map((key) => {
        let point = 0;
        const table = data.find((item) => item.id === key);
        const question = table?.content?.list_question
          ?.map((item, index) => {
            const currentPoint = +_data?.[key]?.[index] - 1 || 0
            point += currentPoint;
            return `${item} (${currentPoint});`;
          })
          .join(" ");

        return `${table?.title} : ${question} => Total Point: ${point}`;
      })
      .join("\n\n");
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
