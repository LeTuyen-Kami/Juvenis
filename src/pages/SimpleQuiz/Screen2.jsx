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

const Screen2 = ({ onChangeScreen, selectedItem, onSelectItem,data }) => {
  return (
    <div className={"mb-10"}>
      <div className={"text-center text-xl font-semibold"}>{selectedItem?.title || ""}</div>
      <div className={"mt-10 flex flex-wrap gap-4 px-[10vw] justify-center"}>
        {data?.map((item, index) => {
          return (
            <Item
              selected={selectedItem?.id === item?.id}
              item={item}
              onClick={onSelectItem}
              key={index}
            />
          );
        })}
      </div>
      <div className={"flex justify-center mt-10"}>
        <Button onClick={()=>{
          if (selectedItem) {
            onChangeScreen()
          }
        }}>Continue</Button>
      </div>
    </div>
  );
};

export default Screen2;
