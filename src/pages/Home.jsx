import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "../components/CourseList/CoursesList";
import "./home.css";
import { getMostValuedCourses, getDiscountCourses } from "../utils/apiConfig";
import searchLogo from "../assets/search.svg";
import Button from "../components/Button/Button";
import IngredientesModal from "../components/IngredientesModal/IngredientesModal";

function Home() {
  const [mostValuedCourses, setMostvaluedCourses] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);
  const { setRecetaModal } = useContext(UserContext);

  const fetchMostValuedCourses = async () => {
    const { data } = await getMostValuedCourses();
    console.log(data);
    setMostvaluedCourses(data);
  };

  const handleIngredientesModal = () => {
    setRecetaModal(true)
  }

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
      <IngredientesModal />
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
          <div className="home-buttons">
          <Button description="Click Aquí para buscar tu receta" handleModal={handleIngredientesModal}/>
          <Button description="Quiero tener suerte"/>
          </div>
          
        </div>
      </div>
      <div className="home-courses">
        <CoursesList
          titulo="Las recetas mas valoradas"
          array={mostValuedCourses.listaInicio}
          descripcion="Accede a las recetas mas valoradas de nuestra app y encuentra inspiración a la hora de cocinar"
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
