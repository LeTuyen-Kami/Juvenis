import { useState, useEffect, useRef } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import QuizScreen from "./QuizScreen";
import { data as defaultData } from "./fakeData";
import CompletionScreen from "./CompletionScreen";
import { toast, ToastContainer } from "react-toastify";
const data = window?.data_quiz || defaultData;

const checkDevtoolsOpen = () => {
  if (window.devtools) {
    return true;
  }

  const start = performance.now();
  //eslint-disable-next-line
  debugger;
  const end = performance.now();
  return end - start > 1000;
};

const MAXVIOLATIONS = 4;

const fieldsConfig = [
  {
    key: "name",
    label: { vi: "Họ & Tên", en: "Name" },
    placeholder: { vi: "Nhập họ và tên", en: "Enter name" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Họ và tên không được để trống",
      en: "Name is required",
    },
    colspan: 1,
  },
  {
    key: "email",
    label: { vi: "Email", en: "Email" },
    placeholder: { vi: "Nhập email", en: "Enter email" },
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessages: { vi: "Email không hợp lệ", en: "Invalid email" },
    colspan: 1,
  },
  {
    key: "phone",
    label: { vi: "Số điện thoại", en: "Phone" },
    placeholder: { vi: "Nhập số điện thoại", en: "Enter phone" },
    validation: (value) =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
    errorMessages: {
      vi: "Số điện thoại không hợp lệ",
      en: "Invalid phone number",
    },
    colspan: 1,
  },
  {
    key: "class",
    label: { vi: "Lớp", en: "Class" },
    placeholder: { vi: "Nhập lớp", en: "Enter class" },
    validation: (value) => value.length > 0,
    errorMessages: { vi: "Lớp không hợp lệ", en: "Invalid class" },
    colspan: 1,
  },
  {
    key: "school",
    label: { vi: "Tên trường học", en: "School" },
    placeholder: { vi: "Nhập tên trường học", en: "Enter school" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Trường học không được để trống",
      en: "School is required",
    },
    colspan: 1,
  },
  {
    key: "career",
    label: {
      vi: "Lĩnh vực nghề nghiệp bạn muốn tìm hiểu",
      en: "Career you would like to explore",
    },
    placeholder: {
      vi: "Nhập lĩnh vực nghề nghiệp",
      en: "Enter career you would like to explore",
    },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Lĩnh vực nghề nghiệp không được để trống",
      en: "Career you would like to explore is required",
    },
    colspan: 1,
  },
];

async function fetchQuizResults(quizType, lang) {
  try {
    const response = await fetch(
      `https://juvenismaxime.com/wp-json/jm-quiz/get-quiz-result?type=${quizType}&lang=${lang}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const _data = await response.json();
    return _data;
  } catch (error) {
    console.error("Error fetching quiz results:", error);
  }
}

const toSlug = (str) => {
  return str.toLowerCase().replace(/ /g, "-");
};

// Gọi API với loại quiz là "Personality"

export default function QuizTime() {
  const [screen, setScreen] = useState(1);
  const [userChoice, setUserChoice] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [violations, setViolations] = useState(0);
  const [isWarned, setIsWarned] = useState(false);
  const intervalId = useRef(null);
  const [quizData, setQuizData] = useState([]);
  const [showSkipBtn, setShowSkipBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
    const slug = urlParams.get("slug");
    const _showSkip = urlParams.get("showSkipBtn");

    if (_showSkip === "true") {
      setShowSkipBtn(true);
    }

    setIsLoading(true);
    fetchQuizResults(5, "en")
      .then((results) => {
        const _data = results?.length > 0 ? results : data;

        // Filter data based on id from URL or get first item

        const filteredData = id
          ? _data.find((item) => item.id == id)
          : slug
          ? _data.find((item) => toSlug(item.title) == slug)
          : _data[0];

        const finalData = filteredData
          ? filteredData
          : _data?.[0]
          ? _data[0]
          : data?.[0];

        setQuizData(finalData);

        setTimeLeft((finalData?.content?.time_limit || 60) * 60 || 3600);
      })
      .catch(() => {
        setIsError(true);
        toast.error("Something went wrong, please try again later!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (screen === 2) {
      // Detect tab switching
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setViolations((prev) => prev + 1);
          toast.error(
            "Warning: Switching tabs is not allowed during the quiz!"
          );
        }
      };

      // Prevent copy/paste
      const handleCopyPaste = (e) => {
        e.preventDefault();
        setViolations((prev) => prev + 1);
        toast.error("Warning: Copy/Paste is not allowed during the quiz!");
      };

      // Prevent browser navigation
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("copy", handleCopyPaste);
      document.addEventListener("paste", handleCopyPaste);
      window.addEventListener("beforeunload", handleBeforeUnload);

      intervalId.current = setInterval(() => {
        if (checkDevtoolsOpen()) {
          setViolations(MAXVIOLATIONS);
          toast.error("Warning: Devtools are open during the quiz!");
          if (intervalId.current) {
            clearInterval(intervalId.current);
          }
        }
      }, 1000);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        document.removeEventListener("copy", handleCopyPaste);
        document.removeEventListener("paste", handleCopyPaste);
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      };
    }
  }, [screen]);

  // Auto-submit after multiple violations
  useEffect(() => {
    if (violations >= MAXVIOLATIONS) {
      handleTimeUp();
      return;
    }

    if (violations >= MAXVIOLATIONS - 1 && !isWarned) {
      setIsWarned(true);
      alert(
        "Final warning: The quiz will be automatically submitted after the next violation."
      );
    }
  }, [violations]);

  useEffect(() => {
    if (screen === 2 && timeLeft >= 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [screen, timeLeft]);

  const handleTimeUp = () => {
    onPressSubmit();
    setScreen(3);
  };

  function formatQuestions(questions) {
    return questions
      ?.map?.((questionObj, index) => {
        const questionNumber = index + 1;
        const questionContent = questionObj?.question;
        const userAnswer = questionObj?.selectedItem
          ? questionObj?.selectedItem?.answer
          : "";
        const correctAnswer = questionObj?.list_answer
          ?.split("|")
          ?.map((i) => i?.trim())?.[questionObj?.correct_answer];
        const userInput =
          questionObj?.selectedItem && questionObj?.selectedItem?.userInput
            ? questionObj?.selectedItem?.userInput
            : "";

        if (!userAnswer) {
          return `Question ${questionNumber}: ${questionContent}, Input Answer: ${userInput}`;
        }

        return `Question ${questionNumber}: ${questionContent}, User answer: ${userAnswer}`;
      })
      .join("<br>");
  }

  const onPressSubmit = () => {
    const result = formatQuestions(userChoice);

    fetch("https://juvenismaxime.com/wp-json/jm-quiz/client-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: userInfo.name,
        email: userInfo.email,
        phone_number: userInfo.phone,
        year_of_birth: "",
        school: `class ${userInfo.class} - school ${userInfo.school} - career ${userInfo.career}`,
        result: result,
        category: quizData?.category || 5,
      }),
    }).catch(() => {
      //
    });
  };

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return (
          <Info
            showTitle={false}
            isLoading={isLoading}
            onPressContinue={(info) => {
              setScreen(2);
              setUserInfo(info);
            }}
            fields={fieldsConfig}
            language={quizData?.lang || "en"}
          />
        );
      case 2:
        return (
          <QuizScreen
            data={quizData?.content?.list_question || []}
            setUserChoice={setUserChoice}
            userChoice={userChoice}
            onPressSubmit={() => {
              onPressSubmit();
              setScreen(3);
            }}
            timeLeft={timeLeft}
          />
        );
      case 3:
        return <CompletionScreen userChoice={userChoice} />;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer>
      <div className={"text-2xl font-bold text-center"}>
        {quizData?.title || "Placement Test"}
      </div>
      {renderScreen(screen)}
      {showSkipBtn && (
        <button
          className="fixed right-4 bottom-4 px-4 py-2 text-white bg-red-500 rounded"
          onClick={() => setTimeLeft(0)}
        >
          Skip Time
        </button>
      )}
      <ToastContainer />
    </ScreenContainer>
  );
}
