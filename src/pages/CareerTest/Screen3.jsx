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

const descriptions = {
  vi: [
    { id: 1, text: "Chưa bao giờ đúng: 0 điểm" },
    { id: 2, text: "Đúng trong một vài trường hợp: 1 điểm" },
    { id: 3, text: "Đúng trong khoảng ½ trường hợp: 2 điểm" },
    { id: 4, text: "Đúng trong đa số các trường hợp: 3 điểm" },
    { id: 5, text: "Đúng trong tất cả trường hợp: 4 điểm" },
  ],
  en:[
    { id: 1, text: "Never True: 0 points" },
    { id: 2, text: "True in some cases: 1 point" },
    { id: 3, text: "True in about half the cases: 2 points" },
    { id: 4, text: "True in most cases: 3 points" },
    { id: 5, text: "True in most cases: 3 points" },
  ],
}

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

const Screen3 = ({ onChangeScreen, setSelectData, data, lang, selectData }) => {
  const [tableIndex, setTableIndex] = useState(0);

  const enable =
    Object.keys(selectData?.[data?.[tableIndex]?.id] || {})?.length - 1 ===
    data?.[tableIndex]?.content?.list_question?.length;

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
                {table.title}
              </div>
              <Table
                name={table?.title}
                columns={columns.map((column) => {
                  if (column.key === "name") {
                    return {
                      ...column,
                      label: table?.content?.description,
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
          <ScoreDescriptions lang={lang} />
        </div>
      </div>
      <div className="md:hidden self-start">
        <ScoreDescriptions lang={lang} />
      </div>
      <Button
        className={`mt-10 ${enable ? "bg-blue-500 mb-4" : "bg-gray-500 mb-4"}`}
        disabled={!enable}
        onClick={onContinue}
      >
        {txt[lang].continue}
      </Button>
    </div>
  );
};

export default Screen3;

const ScoreDescriptions = ({ lang }) => {


  const desc = descriptions[lang];


  return (
    <section className="text-xs italic text-neutral-600">
      {desc.map((description) => (
        <p key={description.id}>
          ({description.id}) {description.text}
        </p>
      ))}
    </section>
  );
};
