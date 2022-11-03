import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "../components/CourseList/CoursesList";
import "./home.css";
import { getMostValuedCourses, getDiscountCourses } from "../utils/apiConfig";
import searchLogo from "../assets/search.svg";
import Button from "../components/Button/Button";

function Home() {
  const [mostValuedCourses, setMostvaluedCourses] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);

  const fetchMostValuedCourses = async () => {
    const { data } = await getMostValuedCourses();
    setMostvaluedCourses(data);
  };

  const fetchDiscountCourses = async () => {
    const { data } = await getDiscountCourses();
    setDiscountCourses(data);
  };

  useEffect(() => {
    try {
      fetchMostValuedCourses();
      // fetchDiscountCourses();
      console.log(mostValuedCourses);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-banner-container">
        <div className="home-banner-filter"></div>
        <div className="home-banner-content">
          <div className="home-banner-text">
            <h1>Recetas con tus ingredientes</h1>
            <p>
              Abre la heladera, ingresa tus ingredientes en el sitio y descubre
              miles de recetas para ti.
            </p>
          </div>
          <Button description="Click Aquí para buscar tu receta"/>
        </div>
      </div>
      <div className="home-courses">
        <CoursesList
          titulo="Las recetas mas valoradas"
          array={mostValuedCourses}
          descripcion="Accede a las recetas mas valoradas de nuestra app y encuentra inspiración a la hora de cocinar"
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
