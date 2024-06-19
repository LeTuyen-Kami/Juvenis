import Button from "../../components/Button";
import Container from "../../components/Container";

const txt = {
  en: {
    start: "Start",
    continue: "Continue",
    time: "Time to complete: 5 minutes",
    noteText: "Choose the highest score for the best match",
    note: "Note",
    title: "CAREER TEST",
    step: "Step",
    steps: [
      "Assess each content of 6 tables, each content scores 5 points: (1) Never correct: 0 points; (2) Correct in a few cases: 1 point; (3) Correct in half cases: 2 points; (4) Correct in most cases: 3 points; (5) Correct in all cases: 4 points",
      "Add up the scores of each table, determine the table with the highest score.",
      "Traits, interests, and fields of work suitable for the table name on page 2",
    ],
  },
  vi: {
    start: "Bắt đầu",
    continue: "Tiếp tục",
    time: "Thời gian hoàn thành: 5 pht",
    noteText: "Chọn điểm cao nhất đối với câu ph hợp nhất",
    note: "Lưu ý",
    title: "TRẮC NGHIỆM NGHỀ NGHIỆP",
    step: "Bước",
    steps: [
      "Cho điểm từng nội dung của 6 bảng, mỗi nội dung cho điểm ở 5 mức độ đúng: (1) Chưa bao giờ đúng: 0 điểm; (2) đúng trong một vài trường hợp: 1 điểm; (3) đúng trong khoảng ½ trường hợp: 2 điểm; (4) đúng trong đa số các trường hợp: 3 điểm; (5) đúng trong tất cả trường hợp: 4 điểm",
      "Cộng điểm của từng bảng, xác định bảng có điểm số cao nhất.",
      "Tra sở thích, ngành nghề phù hợp theo bảng cùng tên ở trang số 2",
    ],
  },
};

const Step = ({ stepNumber, description, lang }) => (
  <p className="mt-10 md:mt-10 md:max-w-full">
    <span className="font-bold">
      {txt[lang].step} {stepNumber}:
    </span>{" "}
    {description}
  </p>
);

const Screen1 = ({ onChangeScreen, lang = "en" }) => {
  const steps = txt[lang].steps;

  return (
    <section className="flex flex-col px-5 items-center w-full">
      <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
        {txt[lang].title}
      </h1>
      <Container className={"mb-10"}>
        <section className="w-full">
          <br />
          {steps.map((description, idx) => (
            <Step
              key={idx}
              stepNumber={idx + 1}
              description={description}
              lang={lang}
            />
          ))}
        </section>
        <Button className={"my-10"} onClick={() => onChangeScreen(2)}>
          {txt[lang].continue}
        </Button>
        <p className="self-center mt-3 text-center text-neutral-400">
          {txt[lang].time}
        </p>
        <footer className="self-center mt-10 mb-5 text-xs text-center text-black">
          <span className="font-bold">{txt[lang].note} : </span>
          {txt[lang].noteText}
        </footer>
      </Container>
    </section>
  );
};

export default Screen1;
