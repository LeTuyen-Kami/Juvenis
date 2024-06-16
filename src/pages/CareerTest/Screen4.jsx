import Container from "../../components/Container";

const data = {
  title: "BẠN THUỘC TUÝP NGƯỜI THỰC TẾ - REALISTIC",
  ability:
    "kỹ thuật, công nghệ, hệ thống; ưa thích làm việc với đồ vật, máy móc, động thực vật; thích làm các công việc ngoài trời. ",
  careerFit:
    " Các nghề về kiến trúc, an toàn lao động, nghề mộc, xây dựng, thủy sản, kỹ thuật, máy tàu thủy, lái xe, huấn luyện viên, nông – lâm nghiệp (quản lý trang trại, nhân giống cá, lâm nghiệp…), cơ khí (chế tạo máy, bảo trì và sữa chữa thiết bị, luyện kim, cơ khí ứng dụng, tự động...), điện - điện tử, địa lý - địa chất (đo đạc, vẽ bản đồ địa chính), dầu khí, hải dương học, quản lý công nghiệp... ",
  careerFactor: [
    "Công việc thể chất",
    "Công việc cơ khí",
    "Làm việc ngoài trời",
    "Làm việc với động vật",
    "Công việc thủ công",
  ],
  unCareerFactor: [
    "Khoa học và công nghệ bao gồm y học, phần mềm, máy tính, khoa học thuần ty, toán học",
    "Biểu đạt sáng tạo qua nghệ thuật như viết, vẽ, hội họa, âm nhạc, biểu diễn, cũng như nghệ thuật ẩm thực",
    "Làm việc gần gũi với mọi người, gip đỡ mọi người hoặc dạy học",
    "Lãnh đạo con người, giám sát con người, thuyết phục con người, quản l một doanh nghiệp, chính trị",
    "Công việc lặp đi lặp lại yêu cầu sự tổ chức, công việc có tính cấu trc cao, công việc có tính chi tiết cao, hầu hết các công việc hành chính và tài chính",
  ],
};

const points = [
  {
    title: "Bảng A",
    value: 10,
    description: "Bạn đạt điểm cao",
  },
  {
    title: "Bảng B",
    value: 10,
    description: "Bạn đạt điểm trung bình",
  },
  {
    title: "Bảng C",
    value: 10,
    description: "Bạn đạt điểm thấp",
  },
  {
    title: "Bảng C",
    value: 10,
    description: "Bạn đạt điểm thấp",
  },
  {
    title: "Bảng C",
    value: 10,
    description: "Bạn đạt điểm thấp",
  },
  {
    title: "Bảng C",
    value: 10,
    description: "Bạn đạt điểm thấp",
  },
];

const Point = ({ title, value, description }) => {
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

const Screen4 = () => {
  return (
    <section className="flex flex-col px-5 items-center w-full mb-10">
      <div className={"self-start px-[10vw] mt-10 w-full"}>
        <h1 className="font-semibold text-2xl">KẾT QUẢ</h1>
        <p className={"font-bold text-base mt-4"}>Số điểm của bạn là:</p>
        <div className="flex md:flex-row gap-5 justify-between w-full flex-wrap">
          {points.map((item, index) => (
            <Point key={index} {...item} />
          ))}
        </div>
      </div>

      <Container>
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
      </Container>
    </section>
  );
};

export default Screen4;
