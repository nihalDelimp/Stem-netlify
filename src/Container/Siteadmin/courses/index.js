import React, { useState, useEffect } from 'react';
import plusIcon from "../../../assets/images/plus.svg";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCourseList } from "../../../Redux/action/coursePlatform";
import IsLoadingHOC from '../../../Components/IsLoadingHOC';
import { IsloggedinHOC } from '../../../Components/IsLoggedinHOC'
import CreateCourse from './Create';
import DeleteCourse from './Delete';
import EditCourse from './EditCourse';
import AssignPopup from './AssignPopup';


const Courses = (props) => {
    const { setLoading } = props;
    const [isDotsActive, setDotIsActive] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)
    const [editPopUp, setEditPopUp] = useState(false)
    const [assignPopUp, setAssignPopUp] = useState(false)
    const [coursesData, setCoursesData] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const [editData, setEditData] = useState({})
    const [assignData, setAssignData] = useState({})
    const dispatch = useDispatch()

    const getCoursesList = async () => {
        setLoading(true)
        await dispatch(getCourseList())
            .then(
                response => {
                    setLoading(false)
                    setCoursesData(response.data)
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
        dispatch({ type: "REMOVE_COURSE_ID" })
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
                                    <button className="addclasroom--btn" onClick={() => setCreatePopUp(true)}>
                                        <span>Add Course</span> <span className="button--icon">
                                            <img src={plusIcon} alt="" /></span>
                                    </button>
                                    {createPopUp &&
                                        <CreateCourse
                                            setCreatePopUp={setCreatePopUp}
                                            getCoursesList={getCoursesList} />}
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
                                                    <Link
                                                        className="class--number"
                                                        to={`/courses/${item.course_code}`}
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "SAVE_COURSE_ID",
                                                                payload: item.id
                                                            })
                                                        }}
                                                    >
                                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{item.course_name}</h3>
                                                    </Link>
                                                    <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                        <img src={require("../../../assets/images/3dots.svg").default} />
                                                        <div className="dots--drop--down">
                                                            <div className="dropdown--item">
                                                                <div className="dropdown--list">
                                                                    <ul>
                                                                        <li
                                                                            onClick={() => {
                                                                                setEditPopUp(true)
                                                                                setEditData({
                                                                                    course_code: item.course_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Edit Course</span></li>
                                                                        <li
                                                                            onClick={() => {
                                                                                setAssignPopUp(true)
                                                                                setAssignData({
                                                                                    course_code: item.course_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Assign Course</span></li>
                                                                        <li
                                                                            onClick={() => {
                                                                                setDeletePopUp(true)
                                                                                setDeleteData({
                                                                                    course_code: item.course_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Delete Course</span></li>
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
                                {deletePopUp && <DeleteCourse getCoursesList={getCoursesList} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                                {editPopUp && <EditCourse setEditPopUp={setEditPopUp} getCoursesList={getCoursesList} editData={editData} />}
                                {assignPopUp && <AssignPopup setAssignPopUp={setAssignPopUp} getCoursesList={getCoursesList} assignData={assignData} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(IsloggedinHOC(Courses));
