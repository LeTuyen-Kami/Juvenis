import Button from "../../components/Button";

const Item = ({ item, onClick, selected }) => {
  return (
    <div
      onClick={() => onClick(item)}
      className={`flex items-center justify-center hover:bg-blue-200 active:outline cursor-pointer p-10 bg-blue-100 rounded-3xl outline-blue-800 shadow-lg font-medium max-md:w-full ${
        selected ? "bg-blue-800 text-white" : ""
      }`}
    >
      {item.title}
    </div>
  );
};

const listItemName = [
  "INFORMATION TECHNOLOGY",
  "FINANCE",
  "BUSINESS MANAGEMENT",
  "MARKETING & SALES",
  "LAW",
  "HUMAN SERVICES",
  "HEALTH SCIENCE",
  "ARCHITECTURE & CONSTRUCTION",
  "TRANSPORTATION & LOGISTICS",
  "EDUCATION & TRAINING",
  "HOSPITALITY & TOURISM",
];

const Screen2 = ({ onChangeScreen, selectedItem, onSelectItem }) => {
  return (
    <div className={"mb-10"}>
      <div className={"text-center text-xl font-semibold"}>Health Science</div>
      <div className={"mt-10 flex flex-wrap gap-4 px-[10vw] justify-center"}>
        {listItemName.map((item, index) => {
          return (
            <Item
              selected={selectedItem?.id === index}
              item={{ title: item, id: index }}
              onClick={onSelectItem}
              key={index}
            />
          );
        })}
      </div>
      <div className={"flex justify-center mt-10"}>
        <Button onClick={onChangeScreen}>Continue</Button>
      </div>
    </div>
  );
};

export default Screen2;
