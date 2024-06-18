import { useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";

const columns = [
  { key: "name", label: "Realistic - Người thực tế " },
  { key: "column1", label: "1" },
  { key: "column2", label: "2" },
  { key: "column3", label: "3" },
  { key: "column4", label: "4" },
  { key: "column5", label: "5" },
];

const textArray = [
  "Có tính tự lập",
  "Có đầu óc suy nghĩ thực tế",
  "Dễ thích nghi với môi trường mới",
  "Điều khiển các máy móc, thiết bị",
  "Làm tốt các công việc thủ công như gấp giấy, cắt, dán, đan, móc",
  "Thích tiếp xúc với thiên nhiên, động, thực vật",
  "Thích làm công việc thực hành, tay chân",
  "Thích làm những công việc thực tế",
  "Thích làm việc ngoài trời",
];

const data = [
  {
    id: 1,
    name: textArray[0],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 2,
    name: textArray[1],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 3,
    name: textArray[2],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 4,
    name: textArray[3],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 5,
    name: textArray[4],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 6,
    name: textArray[5],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 7,
    name: textArray[6],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 8,
    name: textArray[7],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
  {
    id: 9,
    name: textArray[8],
    column1: "1",
    column2: "2",
    column3: "3",
    column4: "4",
    column5: "5",
  },
];

const tableName = ["A", "B", "C", "D", "E", "F"];

const listTable = [...new Array(6)].map((_, index) => ({
  id: index,
  name: `Table ${tableName[index]}`,
  data: [...data].sort(() => Math.random() - 0.5),
}));

const Screen3 = ({ onChangeScreen, setSelectData }) => {
  const [tableIndex, setTableIndex] = useState(0);

  const onContinue = () => {
    if (tableIndex === listTable.length - 1) {
      onChangeScreen(4);
    } else {
      setTableIndex(tableIndex + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-2">
      <div className={"md:w-[70vw] w-[100%] md:max-w-[1600px] relative"}>
        {listTable.map((table, index) => {
          return (
            <div
              key={table.id}
              className={`${index === tableIndex ? "block" : "hidden"}`}
            >
              <div className={`text-2xl font-bold text-left self-start my-2`}>
                {table.name}
              </div>
              <Table
                columns={columns}
                data={table.data}
                tableId={table.id}
                onSelect={setSelectData}
              />
            </div>
          );
        })}
        <div
          className="absolute bottom-0 w-[14vw] max-md:hidden"
          style={{
            right: "-15vw",
          }}
        >
          <ScoreDescriptions />
        </div>
      </div>
      <div className="md:hidden self-start">
        <ScoreDescriptions />
      </div>
      <Button className={"mt-10"} onClick={onContinue}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default Screen3;

const ScoreDescriptions = () => {
  const descriptions = [
    { id: 1, text: "Chưa bao giờ đúng: 0 điểm" },
    { id: 2, text: "Đúng trong một vài trường hợp: 1 điểm" },
    { id: 3, text: "Đúng trong khoảng ½ trường hợp: 2 điểm" },
    { id: 4, text: "Đúng trong đa số các trường hợp: 3 điểm" },
    { id: 5, text: "Đúng trong tất cả trường hợp: 4 điểm" },
  ];

  return (
    <section className="text-xs italic text-neutral-600">
      {descriptions.map((description) => (
        <p key={description.id}>
          ({description.id}) {description.text}
        </p>
      ))}
    </section>
  );
};
