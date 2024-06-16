import Button from "../../components/Button";
import Container from "../../components/Container";

const Step = ({ stepNumber, description }) => (
  <p className="mt-10 md:mt-10 md:max-w-full">
    <span className="font-bold">Bước {stepNumber}:</span> {description}
  </p>
);

const Screen1 = ({ onChangeScreen }) => {
  const steps = [
    "Cho điểm từng nội dung của 6 bảng, mỗi nội dung cho điểm ở 5 mức độ đng: (1) Chưa bao giờ đng: 0 điểm; (2) đng trong một vài trường hợp: 1 điểm; (3) đng trong khoảng ½ trường hợp: 2 điểm; (4) đng trong đa số các trường hợp: 3 điểm; (5) đng trong tất cả trường hợp: 4 điểm",
    "Cộng điểm của từng bảng, xác định bảng có điểm số cao nhất.",
    "Tra sở thích, ngành nghề phù hợp theo bảng cùng tên ở trang số 2",
  ];

  return (
    <section className="flex flex-col px-5 items-center w-full">
      <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
        TRẮC NGHIỆM NGHỀ NGHIỆP
      </h1>
      <Container>
        <section className="w-full">
          <br />
          {steps.map((description, idx) => (
            <Step key={idx} stepNumber={idx + 1} description={description} />
          ))}
        </section>
        <Button className={"my-10"} onClick={() => onChangeScreen(2)}>
          Bắt đầu
        </Button>
        <p className="self-center mt-3 text-center text-neutral-400">
          Thời gian hoàn thành ước tính: 5 pht
        </p>
        <footer className="self-center mt-10 mb-5 text-xs text-center text-black">
          <span className="font-bold">Lưu ý: </span>Cho điểm cao nhất đối với
          câu phù hợp nhất
        </footer>
      </Container>
    </section>
  );
};

export default Screen1;
