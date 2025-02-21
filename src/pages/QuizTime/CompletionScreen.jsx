import { useState } from "react";
import Button from "../../components/Button";
import { data } from "./fakeData";

const CompletionScreen = ({ userChoice = [] }) => {
  console.log("userChoice", userChoice);

  const [showResults, setShowResults] = useState(false);

  // Create an array of all questions from data with unique user answers
  const allQuestions = data.map((question) => {
    const userAnswers = userChoice.filter(
      (choice) => choice.id === question.id
    );
    const userAnswer = userAnswers[userAnswers.length - 1] || question;
    return {
      ...question,
      selectedItem: userAnswer.selectedItem || null,
    };
  });

  // Group questions by section
  const sections = allQuestions.reduce((acc, question) => {
    const section = question.section;
    if (!section) return acc;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(question);
    return acc;
  }, {});

  // Calculate scores for each section
  const sectionScores = Object.entries(sections).map(([section, questions]) => {
    const sectionCorrect = questions.filter((item) => {
      if (!item.selectedItem) return false;
      if (item.type === "text") return true;
      return item.selectedItem.index === item.correct_answer;
    }).length;
    const sectionTotal = questions.length;
    const sectionScore =
      sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
    return {
      section,
      correct: sectionCorrect,
      total: sectionTotal,
      score: sectionScore,
    };
  });

  const correctAnswers = allQuestions.filter((item) => {
    if (!item.selectedItem) return false;
    if (item.type === "text") return true; // Text answers are considered valid responses
    return item.selectedItem.index === item.correct_answer;
  }).length;

  const totalQuestions = data.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100) || 0;

  const questionsBySection = data.reduce((acc, question) => {
    if (!acc[question.section]) {
      acc[question.section] = [];
    }
    acc[question.section].push(question);
    return acc;
  }, {});

  return (
    <div className="py-8 mx-auto max-w-2xl text-center">
      <h2 className="mb-6 text-3xl font-bold text-blue-600">Quiz Completed!</h2>
      <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <p className="mb-4 text-xl">Thank you for completing the quiz.</p>
        <p className="mb-6 text-lg text-gray-600">
          Your responses have been submitted successfully.
        </p>
        {/* <div className="mb-6">
          <div className="mb-4 text-2xl font-semibold">
            Overall Score: {score}%
            <span className="ml-2 text-lg text-gray-500">
              ({correctAnswers}/{totalQuestions} correct)
            </span>
          </div>
          <div className="grid gap-4 mb-4">
            {sectionScores.map(({ section, correct, total, score }) => (
              <div key={section} className="p-4 bg-blue-50 rounded-lg">
                <h3 className="mb-2 text-lg font-semibold text-blue-700">
                  {section}
                </h3>
                <p className="text-blue-600">
                  Score: {score}% ({correct}/{total} correct)
                </p>
              </div>
            ))}
          </div>
        </div> */}
        {/* <Button
          onClick={() => setShowResults(!showResults)}
          className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-full transition duration-200 hover:bg-blue-600"
        >
          {showResults ? "Hide Results" : "View Results"}
        </Button> */}
      </div>

      {showResults && (
        <div className="mt-8 text-left">
          <h3 className="mb-4 text-2xl font-semibold text-center">
            Detailed Results
          </h3>
          {Object.entries(questionsBySection).map(([section, questions]) => (
            <div key={section} className="mb-8">
              <h4 className="mb-4 text-xl font-semibold text-blue-600">
                {section}
              </h4>
              {questions.map((item, index) => {
                const userAnswer = allQuestions.find((q) => q.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`mb-6 p-6 rounded-lg ${
                      item.type === "text"
                        ? "bg-blue-50 border border-blue-200"
                        : userAnswer?.selectedItem?.index ===
                          item?.correct_answer
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p className="mb-2 font-semibold">Question {index + 1}:</p>
                    <p className="mb-3">{item.question}</p>
                    <p className="text-gray-700">
                      Your Answer:{" "}
                      <span
                        className={
                          item.type === "text"
                            ? "text-blue-600 font-semibold"
                            : userAnswer?.selectedItem?.index ===
                              item?.correct_answer
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {userAnswer?.selectedItem?.answer ||
                          userAnswer?.selectedItem?.userInput ||
                          "Not answered"}
                      </span>
                    </p>
                    {item.type !== "text" &&
                      userAnswer?.selectedItem?.index !==
                        item?.correct_answer && (
                        <p className="mt-2 text-gray-700">
                          Correct Answer:{" "}
                          <span className="font-semibold text-green-600">
                            {item?.list_answer?.[item?.correct_answer]}
                          </span>
                        </p>
                      )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletionScreen;
