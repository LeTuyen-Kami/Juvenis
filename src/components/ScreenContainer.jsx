import Header from "./Header";

const ScreenContainer = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ScreenContainer;
