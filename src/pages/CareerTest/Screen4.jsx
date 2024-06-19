import Container from "../../components/Container";


const data = window?.data_quiz || []

const Point = ({ title, value }) => {
  return (
    <div
      className={
        "text-base font-normal flex items-center flex-col mt-4 uppercase"
      }
    >
      {title}
      <div className={"p-4 shadow px-10 rounded mt-4"}>{value}</div>
    </div>
  );
};

const Screen4 = ({ selectData }) => {
  const calculatePoint = () => {
    const totalArray = Object.keys(selectData).map((key) => {
      const item = selectData[key];
      const itemArray = Object.values(item).map((item) => +item).filter(i=>i);
      const total = itemArray.reduce((acc, curr) => {
        return acc + (+curr - 1);
      } , 0);
      return {
        id: key,
        title: item.name,
        value: total,
      };
    });
    return totalArray;
  };

  const calulatedPoint = calculatePoint();

  const result = () => {
    const biggestTable = calulatedPoint.sort((a, b) => b.value - a.value)[0];
    const result = data?.find((table) => table.id === biggestTable.id);
    return result?.content?.result;
  }

  console.log(calulatedPoint,selectData);

  return (
    <section className="flex flex-col px-5 items-center w-full mb-10">
      <div className={"self-start px-[10vw] mt-10 w-full"}>
        <h1 className="font-semibold text-2xl">KẾT QUẢ</h1>
        <p className={"font-bold text-base mt-4"}>Số điểm của bạn là:</p>
        <div className="flex md:flex-row gap-5 justify-between w-full flex-wrap">
          {/* {[...Array(6)]
            .map((_, idx) => ({
              title: tableName[idx],
              value: calulatedPoint[tableName[idx]],
            }))
            .map((item, index) => (
              <Point key={index} {...item} />
            ))} */}
            {
              calulatedPoint.map((item, index) => (
                <Point key={index} title={item.title} value={item?.value} />
              ))
            }
        </div>
      </div>

      <Container>
        <div dangerouslySetInnerHTML={{__html: result()}} className="pt-10"></div>
          
{/* 

        <div className={"font-bold text-lg mt-10"}>{data.title}</div>
        <div className={"text-base mt-6"}>
          <span className={"font-semibold"}>
            Người thuộc nhóm sở thích nghề nghiệp này thường:
          </span>
          {data.ability}
        </div>
        <div className={"text-base mt-6"}>
          <span className={"font-semibold"}>
            Ngành nghề ph hợp với nhóm này bao gồm:
          </span>
          {data.careerFit}
        </div>
        <div className={"text-base font-bold mt-10"}>
          TÓM TẮT NGHỀ NGHIỆP LÝ TƯỞNG VỚI BẠN
        </div>
        <div className={"text-base"}>
          <span className={"font-semibold mt-6"}>
            Nghề mà bạn nên chọn chứa những yếu tố:
          </span>
          <ul>
            {data.careerFactor.map((item, index) => (
              <li
                key={index}
                style={{
                  listStyleType: "disc",
                }}
                className={"ml-5"}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={"text-base mt-6"}>
          <span className={"font-semibold"}>
            Bạn nên tránh những nghề có những yếu tố:
          </span>
          <ul>
            {data.unCareerFactor.map((item, index) => (
              <li
                key={index}
                className={"ml-5"}
                style={{
                  listStyleType: "disc",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
       */}

      </Container>
    </section>
  );
};

export default Screen4;
