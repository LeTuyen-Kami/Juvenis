import Button from "../../components/Button";

const Screen1 = ({
  onChangeScreen,
  data,
  selectedCareer,
  setSelectedCareer,
}) => {
  const enabled = selectedCareer?.item;

  const handleClick = (item, id) => {
    setSelectedCareer({ id, item });
  };

  return (
    <div
      className={
        "flex gap-x-6 gap-y-10 items-center mt-20 max-md:mt-10 flex-col"
      }
    >
      <div
        className={
          "max-w-[650px] flex flex-wrap gap-x-6 gap-y-10 justify-center"
        }
      >
        {data.map((item, index) => {
          return (
            <Item
              key={index}
              name={item?.title}
              onClick={() => handleClick(item, index)}
              isSelected={selectedCareer.id === index}
            />
          );
        })}
      </div>
      <Button onClick={onChangeScreen} disabled={!enabled}>
        Continue
      </Button>
    </div>
  );
};

const Item = ({ name, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={` text-lg font-bold flex items-center justify-center  rounded-[30px] p-10 text-center w-[300px] hover:bg-indigo-100 cursor-pointer focus:outline-1 active:bg-indigo-400 active:text-white ${
        isSelected
          ? "bg-indigo-500 text-white hover:text-black"
          : "bg-indigo-50 text-black"
      }`}
    >
      {name}
    </div>
  );
};

export default Screen1;
