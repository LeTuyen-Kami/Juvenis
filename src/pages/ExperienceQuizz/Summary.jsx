const Summary = ({ answers, language = "vi" }) => {
  // Tính số câu trả lời đúng
  const correctAnswersCount = answers.reduce(
    (count, answer) =>
      answer.selectedItem?.index === answer.correct_answer ? count + 1 : count,
    0
  );

  // Nội dung đa ngôn ngữ
  const translations = {
    en: {
      title: "Summary of Your Answers",
      result: "You answered",
      outOf: "out of",
      correctly: "questions correctly.",
      thanks: "Thanks for your participation!",
    },
    vi: {
      title: "Tóm tắt câu trả lời của bạn",
      result: "Bạn đã trả lời đúng",
      outOf: "trên tổng số",
      correctly: "câu hỏi.",
      thanks: "Cảm ơn bạn đã tham gia!",
    },
  };

  const t = translations[language];

  return (
    <div className={"mb-10 px-[10vw] flex flex-col gap-2 items-center"}>
      <div className={"text-xl font-semibold"}>{t.title}</div>
      <div className={"text-lg"}>
        {t.result}{" "}
        <span className={"font-bold text-green-600"}>
          {correctAnswersCount}
        </span>{" "}
        {t.outOf} <span className={"font-bold"}>{answers.length}</span>{" "}
        {t.correctly}
      </div>
      <div>{t.thanks}</div>
    </div>
  );
};

export default Summary;
