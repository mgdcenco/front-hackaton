import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/App.css";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Courses from "./pages/Courses";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes"
import User from "./pages/User";
import Course from "./pages/Course/Course";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isLogged, setIsLogged] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);  
  const [recetaModal, setRecetaModal] = useState(false);  
  const strUser = localStorage.getItem("user");

  useEffect(() => {
    try {
      if (strUser) {
        setIsLogged(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLogged]);

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
        showNewCourseModal,
        setShowNewCourseModal,
        showLoginModal,
        setShowLoginModal,
        isLogged,
        setIsLogged,
        strUser,
        recetaModal,
        setRecetaModal
      }}
    >
      <div className="App" id={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/recetas" element={<Courses />} />
            </Route> 
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/recetas/:id" element={<Course />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
