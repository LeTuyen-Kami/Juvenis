import { Route, Routes } from "react-router-dom";
import CareerTest from "./pages/CareerTest";
import SimpleQuiz from "./pages/SimpleQuiz";
import CareerStudyCase from "./pages/CareerStudyCase";
import ExperienceQuizz from "./pages/ExperienceQuizz";

import "./App.css";
import FAQ from "./pages/FAQ";
import QuizTime from "./pages/QuizTime";

// const routes = [
//   {
//     path: "/",
//     element: <CareerTest />,
//   },
//   {
//     path: "/simple-quiz/:id",
//     element: <SimpleQuiz />,
//   },
// ];

function App() {
  // return <CareerTest />;
  // return <SimpleQuiz />;
  // return <CareerStudyCase />;
  // return <FAQ />;
  // return <ExperienceQuizz />;
  return <QuizTime />;
  // return (
  //   <Routes>
  //     {routes.map((route, index) => (
  //       <Route key={index} path={route.path} element={route.element} />
  //     ))}
  //   </Routes>
  // );
}

export default App;
