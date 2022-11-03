import axios from "axios";
const baseCoursesURL = "http://192.168.1.52:3000/api/v1/recetas/listarEnInicio"
const baseUsersURL = "http://localhost:3000/user"

//http://192.168.1.52:3000/api/v1/recetas/random

//Courses - Site

export const getCourses = () => axios.get(baseCoursesURL); // GET all 
export const getOneCourse = (id) => axios.get(`${baseCoursesURL}/${id}`); // GET one 
export const getMostValuedCourses = () => axios.get(`${baseCoursesURL}`); // GET most valued
export const getDiscountCourses = () => axios.get(`${baseCoursesURL}?price=11&_sort=rating&_order=desc,asc&_limit=10`); // GET most valued

//Courses - Profile 

export const createNewCourse = (data) => axios.post(baseCoursesURL, data); // POST New Course
export const getLatestCourses = (email) => axios.get(`${baseCoursesURL}?owner.email=${email}&_sort=date&_order=desc`); // GET latest
export const getMostValuedProfileCourses = (email) => axios.get(`${baseCoursesURL}?owner.email=${email}&_sort=rating&_order=desc,asc&_limit=5`);

//User

export const loginUser = (email) => axios.get(`${baseUsersURL}?email=${email}`);
export const createNewUser = (data) => axios.post(baseUsersURL, data);
export const getUser = (id) => axios.get(`${baseUsersURL}/${id}`);

