import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import "../forms-modal.css";
import { createNewCourse } from "../../utils/apiConfig";

function NewCourseModal({fetchLastCourses, fetchMostValuedCourses}) {
  const { setShowNewCourseModal, strUser } = useContext(UserContext);
  const user = strUser ? JSON.parse(strUser) : "";

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    about: "",
    duration: 0,
    price: 0,
    rating: 0,
    images: [],
    date: Date.now(),
    owner: {
      email: user.email,
      name: user.name,
      image: user.profile_image
    }
  });
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const imgInput = useRef(null);

  const handleClickOutside = (e) => {
    if (e.target.className === "modal-background") {
      setShowNewCourseModal(false);
    }
  };

  const loadImage = (e) => {
    e.preventDefault();
    const imageUrl = imgInput.current.value;
    setImagesLoaded([...imagesLoaded, imageUrl]);
    setNewCourse({ ...newCourse, images: [...newCourse.images, imageUrl] });
    imgInput.current.value = "";
  };

  const createCourse = async () => {
    const { title, description, about, duration, price, rating, images } =
      newCourse;
    if (
      title.length != "" &&
      description.length != "" &&
      about.length != "" &&
      duration != 0 &&
      price != 0
    ) {
      try {
        const res = await createNewCourse(newCourse);
        if (res.status === 201) {
          setShowNewCourseModal(false);
          fetchLastCourses()
          fetchMostValuedCourses()
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h4>New Course</h4>
          <div className="modal-header-buttons">
            <Button description="Create" handleModal={createCourse} />
          </div>
        </div>
        <div className="modal-form-container">
          <form action="" className="modal-form">
            <input
              type="text"
              name="course-title"
              id=""
              placeholder="Course Title"
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />
            <input
              type="text"
              name="course-description"
              id=""
              placeholder="Course Description"
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />
            <textarea
              name="course-content"
              id=""
              cols="30"
              rows="10"
              placeholder="Tell your new students about the course"
              onChange={(e) =>
                setNewCourse({ ...newCourse, about: e.target.value })
              }
            ></textarea>
            <input
              type="number"
              name="course-duration"
              id=""
              placeholder="Course Duration"
              onChange={(e) =>
                setNewCourse({ ...newCourse, duration: e.target.value })
              }
            />
            <input
              type="number"
              name="course-price"
              id=""
              placeholder="Course Price"
              onChange={(e) =>
                setNewCourse({ ...newCourse, price: e.target.value })
              }
            />
            <div className="modal-images">
              <input
                type="text"
                name="course-img"
                id=""
                placeholder="Url images from the web"
                ref={imgInput}
              />
              <button onClick={loadImage} className="button">
                Load img
              </button>
            </div>
          </form>
        </div>
        {
          <div className="modal-images">
            {imagesLoaded.map((image) => {
              return <img src={image} key={image} />;
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default NewCourseModal;
