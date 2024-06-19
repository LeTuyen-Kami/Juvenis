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

const txt = {
  en: {
    continue: "Continue",
    submit: "Submit",
  },
  vi: {
    continue: "Tiếp tục",
    submit: "Gửi",
  },
};

const Screen3 = ({ onChangeScreen, setSelectData, data, lang }) => {
  const [tableIndex, setTableIndex] = useState(0);

  const onContinue = () => {
    if (tableIndex === data?.length - 1) {
      onChangeScreen();
    } else {
      setTableIndex(tableIndex + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-2">
      <div className={"md:w-[70vw] w-[100%] md:max-w-[1600px] relative"}>
        {data?.map((table, index) => {
          return (
            <div
              key={table.id}
              className={`${index === tableIndex ? "block" : "hidden"}`}
            >
              <div className={`text-2xl font-bold text-left self-start my-2`}>
                {table.title?.split("(")[0]}
              </div>
              <Table
                name={table.title?.split("(")[0]}
                columns={columns.map((column) => {
                  if (column.key === "name") {
                    return {
                      ...column,
                      label: table.title?.split("(")[1]?.split(")")[0],
                    };
                  }
                  return column;
                })}
                data={table?.content?.list_question?.map((question, index) => {
                  return {
                    id: index,
                    name: question,
                    column1: "1",
                    column2: "2",
                    column3: "3",
                    column4: "4",
                    column5: "5",
                  };
                })}
                tableId={table.id}
                onSelect={setSelectData}
              />
            </div>
          );
        })}
        <div
          className="absolute bottom-0 w-[15vw] max-md:hidden pr-2"
          style={{
            right: "-14vw",
          }}
        >
          <ScoreDescriptions />
        </div>
      </div>
      <div className="md:hidden self-start">
        <ScoreDescriptions />
      </div>
      <Button className={"mt-10"} onClick={onContinue}>
        {txt[lang].continue}
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
