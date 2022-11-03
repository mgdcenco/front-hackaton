import React, { useContext,useState, useEffect } from "react";
import Button from "../Button/Button";
import Usercard from "../Usercard/Usercard";
import "./main.css";
import NewCourseModal from "../NewCourseModal/NewCourseModal";
import { UserContext } from "../../context/UserContext";
import CoursesList from "../CourseList/CoursesList";
import { getLatestCourses, getMostValuedProfileCourses } from "../../utils/apiConfig";

function Main({user}) {
  const { showNewCourseModal, setShowNewCourseModal, strUser } = useContext(UserContext);
  const loggedUser = strUser ? JSON.parse(strUser) : " ";

  const [latestCourses, setLatestCourses] = useState([]);
  const [mostValuedCourses, setMostvaluedCourses] = useState([]);

  const fetchLastCourses = async () => {
  const { data } = await getLatestCourses(user.email);
  await setLatestCourses(data);
  };
  
  const fetchMostValuedCourses = async () => {
    const { data } = await getMostValuedProfileCourses(user.email);
    await setMostvaluedCourses(data);
    };

  const handleModal = () => setShowNewCourseModal(true);
 
  useEffect(() => {
      try{
        fetchLastCourses();
        fetchMostValuedCourses();
      }catch(err){
        console.log(err);
      }
  }, [user]);

  console.log(user);

  return (
    <>
     {
        user.email === loggedUser.email ? <div className="main-background" style={{backgroundImage: `url(${loggedUser.imagen_fondo})`}} ></div> : <div className="main-background" style={{backgroundImage: `url(${user.profile_background})`}} ></div>
      
      }
    <div className="main">
       
      <div className="main-header">
        <Usercard user={user}/>
        {
          user.email === loggedUser.email ?
        <Button description="New Course" handleModal={handleModal} />
          : ""
        }
      </div>
      {showNewCourseModal ? <NewCourseModal fetchLastCourses={fetchLastCourses} fetchMostValuedCourses={fetchMostValuedCourses}/> : ""}
      <CoursesList array={mostValuedCourses} titulo={user.email === loggedUser.email ? "Tus recetas mas valoradas" : "Most valued courses"}/> 
    </div>
    </>
    
  );
}

export default Main;
