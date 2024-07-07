const PlusMinus = ({ isOpen }) => {
  return (
    <div
      className={`circle-plus ${
        isOpen ? "opened" : "closed"
      } size-9 bg-green-100 rounded-lg border border-green-500`}
    >
      <div className="horizontal bg-green-500 rounded-lg"></div>
      <div className="vertical bg-green-500 rounded-lg"></div>
    </div>
  );
};

export default PlusMinus;
