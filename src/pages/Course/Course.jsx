import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { getOneCourse, getUser } from "../../utils/apiConfig";
import { Link, useLocation } from "react-router-dom";
import "./course.css";
import audioIcon from "../../assets/audio.svg";
import subtitlesIcon from "../../assets/subtitles.svg";
import { stars } from "../../utils/rating-stars";
import DotLoader from "react-spinners/DotLoader";
import { UserContext } from "../../context/UserContext";
import Usercard from "../../components/Usercard/Usercard";

function Course() {
  const location = useLocation();
  const course_id = location.pathname.split("/")[2];

  const [course, setCourse] = useState();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading ]= useState(true);

  const { theme } =
    useContext(UserContext);

  const handleLoading = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1200);
  }

  const fetchCourse = async () => {
    try {
      const { data } = await getOneCourse(course_id);
      await setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (course) => {
    if (course) {
      try {
        const { data } = await getUser(course.owner.id);
        await setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchUser(course);
  }, [course]);

  return (
    <Layout>
      <div className="course-page-container">
        {course ? (
          <>
            <div className="course-page-info">
              <div className="course-page-header">
                <h2>{course.title}</h2>
                <div className="course-rate">{stars(course)}</div>
                <p>
                  A course by{" "}
                  <Link to={`/user/${course.owner.id}`}>
                    <b>{user.name}</b>
                  </Link>
                </p>
              </div>
              <div className="course-page-lenguage">
                <img src={audioIcon} alt="Available Audio Icon" />
                <p>Audio: English</p>
                <img src={subtitlesIcon} alt="Available Subtitles Icon" />
                <p>
                  Spanish, English, Portuguese, German, French, Italian, Polish,
                  Dutch
                </p>
              </div>
              <div className="course-page-trailer">
                <div className="course-page-trailer-header">Information</div>
                <img src={course.images[0]} alt="Course Cover" />
                <div className="course-page-trailer-footer">
                  + Add to wishlist
                </div>
              </div>
              <div className="course-page-about">
                <h2>{course.description}</h2>
                <p>{course.about}</p>
              </div>
              {
                isLoading ?
                <div className="course-page-loading-container">
                <DotLoader color={theme === "dark" ? "#fff" : "#20222C"} />
              </div>
              : ""
              }
              <div className="course-page-imgs-carousel">
                  
                {course.images.map((img, i) => {
                  return i != 0 ? (
                    <img
                      src={img}
                      alt="Carousel img"
                      key={i}
                      style={{display: isLoading ? "none" : "block"}}
                      onLoad={()=> handleLoading()}
                    />                    
                  ) : (
                    ""
                  );
                })}
              </div>
              <Usercard user={user}/>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export default Course;
