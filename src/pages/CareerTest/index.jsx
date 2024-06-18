import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

const CareerTest = () => {
  const [screen, setScreen] = useState(1);
  const [selectData, setSelectData] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return <Screen1 onChangeScreen={onChangeScreen} />;
      case 2:
        return <Info onChangeScreen={onChangeScreen.bind(null, 3)} />;
      case 3:
        return (
          <Screen3
            onChangeScreen={onChangeScreen}
            setSelectData={setSelectData}
          />
        );
      case 4:
        return (
          <Screen4 onChangeScreen={onChangeScreen} selectData={selectData} />
        );
    }
  };

  return <ScreenContainer>{renderScreen()}</ScreenContainer>;
};

export default CareerTest;
