import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";

export default function SimpleQuiz() {
  const [screen, setScreen] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return (
          <Info onChangeScreen={onChangeScreen.bind(null, 2)} language="en" />
        );
      case 2:
        return (
          <Screen2
            onChangeScreen={onChangeScreen.bind(null, 3)}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
        );
      case 3:
        return <Screen3 selectedItem={selectedItem} />;
    }
  };

  return (
    <ScreenContainer>
      <div className={"font-bold text-2xl text-center"}>CAREER QUIZZ</div>
      {renderScreen(screen)}
    </ScreenContainer>
  );
}
