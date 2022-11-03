import "./course-list.css";
import { Link, useLocation } from "react-router-dom";
import {stars} from "../../utils/rating-stars"

const CoursesList = ({ array, titulo, descripcion }) => {
  const location = useLocation();

  return (
    <div className="courses-list">
      <div className="courses-list-title-description">
        <h4>{titulo}</h4>
        <p>{descripcion}</p>
      </div>
      <div className="course-card-list">
        {array
          ? array.map((course, i) => {
              return (
                <div key={i} className="course-card">
                  <div className="course-card-image">
                    {course.imagen.length > 0 ? (
                      <img src={course.imagen[0]} />
                    ) : (
                      <img src="https://kknd26.ru/images/no_photo.png" />
                    )}
                  </div>
                  <div className="course-card-body">
                    <div className="course-rate">{stars(course)}</div>
                    <Link to={`/recetas/${course.id}`} key={course.descripcion}>
                      <div className="course-title">
                        <h4>{course.titulo}</h4>
                      </div>
                    </Link>
                    {location.pathname !== "/profile" ? (
                      <>
                        <Link
                          to={`recetas/${course.id}`}
                          key={course.descripcion}
                        >
                          <div className="course-description">
                            <p>{course.descripcion.slice(0, 80)}...</p>
                          </div>
                        </Link>

                        <div className="course-owner">
                          <Link to={`/user/${course.autor.id}`}>
                            <small className="course-owner-name">
                              Una receta de <b>{course.autor.nombre}</b>
                            </small>
                          </Link>
                          <Link to={`/user/${course.autor.id}`}>
                            <img
                              src={course.autor.imagen}
                              alt="Course Owner Image"
                              className="course-owner-image usercard_img"
                            />
                          </Link>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CoursesList;
