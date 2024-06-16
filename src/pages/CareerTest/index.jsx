import { useState } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

const CareerTest = () => {
  const [screen, setScreen] = useState(1);

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return <Screen1 onChangeScreen={onChangeScreen} />;
      case 2:
        return <Screen2 onChangeScreen={onChangeScreen} />;
      case 3:
        return <Screen3 onChangeScreen={onChangeScreen} />;
      case 4:
        return <Screen4 onChangeScreen={onChangeScreen} />;
    }
  };

  return <ScreenContainer>{renderScreen()}</ScreenContainer>;
};

export default CareerTest;
