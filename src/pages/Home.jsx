import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "../components/CourseList/CoursesList";
import "./home.css";
import { getMostValuedCourses, getDiscountCourses } from "../utils/apiConfig";

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
      fetchDiscountCourses();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Navbar links={["Categories", "Projects", "Plus", "Blog", "Bliss Live"]} />
      <div className="home-banner-container">
        <div className="home-banner-content">
          <h1>Bliss is a community for amazing people</h1>
          <p>
            Learn from expert professionals and join the largest online
            community for learners.
          </p>
        </div>
      </div>
      <div className="home-courses">
        <CoursesList title="Trending Courses" array={mostValuedCourses} description="Get access to the best online courses for creatives. Interact with the top professionals and discover the creative world's best-kept secrets."/>
        <CoursesList title="Courses From $10.99!" array={discountCourses} description="Learn with the best for only $10.99 or even FREE"/>
      </div>
      <Footer />
    </>
  );
}

export default Home;
