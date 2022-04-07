import React, { useState, useEffect } from 'react';
import plusIcon from "../../../assets/images/plus.svg";
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { getCourseList } from "../../../Redux/action/SchoolAdmin";
import IsLoadingHOC from '../../../Components/IsLoadingHOC';
import AssignPopup from './AssignPopup';


const SchoolAdminCourses = (props) => {
    const { setLoading } = props;
    const [isDotsActive, setDotIsActive] = useState(false)
    const [assignPopUp, setAssignPopUp] = useState(false)
    const [coursesData, setCoursesData] = useState([])
    const [assignData, setAssignData] = useState({})
    const school_code = useSelector(state =>state.course.school_code)
    const dispatch = useDispatch()
   

    const getCoursesList = async () => {
        setLoading(true)
        await dispatch(getCourseList({school_code}))
            .then(
                response => {
                    setLoading(false)
                    const filterData = response.data.filter(item => item.course.length > 0)
                    setCoursesData(filterData)
                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getCoursesList();
        dispatch({ type: "REMOVE_COURSE_ID"})
    }, [])

    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Course Management System</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid addclass-header">
                        <div className="grid-">
                            <div className="page--sub-title">
                                <ul>
                                    <li><span>Courses</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid--">
                            <div className="addclass--ct">
                                <div className="addclass--room-button">
                                    <Link to = "add-new-class"  style={{ color: "#000", textDecoration: "none" }} >
                                    <button className="addclasroom--btn" >
                                        <span>Create New Class</span> <span className="button--icon">
                                            <img src={plusIcon} alt="" /></span>
                                    </button>
                                    </Link>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="classrooms">
                                {
                                    coursesData && coursesData.length > 0 ? (
                                        coursesData.map((item, index) => (
                                            <div className="class--name--wrapper" key={index}>
                                                <div className="class--name">
                                                    <Link to = "#"
                                                        className="class--number"
                                                    >
                                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{item.course[0].course_name}</h3>
                                                    </Link>
                                                    <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                        <img src={require("../../../assets/images/3dots.svg").default} />
                                                        <div className="dots--drop--down">
                                                            <div className="dropdown--item">
                                                                <div className="dropdown--list">
                                                                    <ul>
                                                                        <li
                                                                            onClick={() => {
                                                                                setAssignPopUp(true)
                                                                                setAssignData({
                                                                                    course_code: item.course_code,
                                                                                    id: item.course_id
                                                                                })
                                                                            }}
                                                                        ><span> Assign Course</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) :
                                        (<div style={{
                                            height: "200px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gridColumn: "span 2"
                                        }}>
                                            <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Data found</h2>
                                        </div>)
                                }
                                {assignPopUp && <AssignPopup setAssignPopUp={setAssignPopUp} getCoursesList={getCoursesList} assignData={assignData} />} 
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(SchoolAdminCourses);
