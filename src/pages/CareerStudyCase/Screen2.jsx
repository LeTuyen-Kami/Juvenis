import { useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { extractImage } from "../../utils";

const Question = ({ question, correct_answer }) => {
  const [text, setText] = useState("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const renderQuestion = () => {
    const _question = extractImage(question);
    return (
      <div className={"text-base flex items-center flex-col"}>
        {_question?.map((item, index) => {
          if (item?.type === "img") {
            return (
              <img key={index} src={item?.value} className={"w-[50%] my-4"} />
            );
          }
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item?.value }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Container className={"py-10"}>
      {/* <div dangerouslySetInnerHTML={{ __html: question }}></div> */}
      {renderQuestion()}
      <div className={"mt-5"}>Your answer:</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 rounded-lg border-1 border-gray-300 focus:outline-1 focus:outline-blue-500 min-h-[100px] mt-1"
        placeholder={"Type your answer here"}
      ></textarea>
      <Button
        onClick={() => {
          //   if (text === correct_answer) {
          setShowCorrectAnswer(true);
          //   }
        }}
        disabled={!text}
        className={"my-4"}
        style={{
          //fontsize 16
          alignSelf: "start",
          fontSize: "16px",
        }}
      >
        Check correct answer
      </Button>
      {showCorrectAnswer && (
        <div
          className={
            "p-4 border border-blue-500 rounded-xl mb-5 bg-white text-blue-500"
          }
          dangerouslySetInnerHTML={{ __html: correct_answer }}
        ></div>
      )}
    </Container>
  );
};

const Screen2 = ({ selectedCareer, data }) => {
  return (
    <section className="flex flex-col px-5 items-center w-full mb-10">
      <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
        {selectedCareer?.name}
      </h1>
      {/* {data.map((item, index) => ( */}
      <Question
        question={data?.item?.content?.question}
        correct_answer={data?.item?.content?.correct_answer}
      />
      {/* ))} */}
    </section>
  );
};

export default Screen2;
