import CareerTest from "./pages/CareerTest";
import SimpleQuiz from "./pages/SimpleQuiz";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import { useEffect } from "react";

const routes = [
  {
    path: "/career-test",
    element: <CareerTest />,
  },
  {
    path: "/simple-quiz/:id",
    element: <SimpleQuiz />,
  },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      navigate("/career-test");
    }
  }, [location]);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
