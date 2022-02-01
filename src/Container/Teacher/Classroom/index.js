import React, { useState, useEffect } from 'react'
import ArrowDownImg from "../../../assets/images/arrow_down.svg"
import plusIcon from "../../../assets/images/plus.svg"
import checkRight from "../../../assets/images/check_right.svg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClassroom } from '../../../Redux/action/Classroom'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { getTeacherClassrooms } from '../../../Redux/action/Teacher'
import CreateClassroom from './Create'
import DeleteClassroom from './Delete'
const Classrooms = (props) => {
    const { setLoading } = props;
    const role = useSelector(state => state.auth.user.user_type)
    const [isActive, setIsActive] = useState(false)
    const [isDotsActive, setDotIsActive] = useState(false)
    const [dropdownState, setdropdownState] = useState(1);
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)
    const [classroomData, setClassroomData] = useState([])
    const [deleteData, setDeleteData] = useState({})


    const toggleDropdownList = (index) => {
        setdropdownState(index);
    }

    const dispatch = useDispatch()

    const getClassroom = async () => {
        setLoading(true)
        await dispatch(role === "TEACHER"
            ? getTeacherClassrooms()
            : getAllClassroom()
            )
            .then(
                response => {
                    setLoading(false)
                    setClassroomData(response.data)
                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getClassroom();
        dispatch({ type: "CLEAN_TEACHER_LESSONS"})
    }, [])


    return (

        <>

            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Classroom Management System</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid addclass-header">
                        <div className="grid-">
                            <div className="page--sub-title">
                                <ul>
                                    <li><span>Classroom</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid--">
                            <div className="addclass--ct">
                                {role === "TEACHER"  && (
                                    <div className="addclass--room-button">
                                        <div className="drop--down">
                                            <button className="leval--btn" onClick={() => setIsActive(!isActive)}>
                                                <span>Level</span> <span className="button--icon">
                                                    <img src={ArrowDownImg} alt="" />
                                                </span>
                                            </button>
                                            {isActive && (
                                                <div className="dropdown--item">
                                                    <div className="dropdown--list">
                                                        <ul>
                                                            <li
                                                                className={dropdownState === 1
                                                                    ? "active---list"
                                                                    : ""}
                                                                onClick={() => toggleDropdownList(1)} >
                                                                <img src={checkRight} alt="" /><span> Level</span>
                                                            </li>
                                                            <li
                                                                className={dropdownState === 2
                                                                    ? "active---list"
                                                                    : ""}
                                                                onClick={() => toggleDropdownList(2)}>
                                                                <img src={checkRight} alt="" /><span> Create date</span>
                                                            </li>
                                                            <li
                                                                className={dropdownState === 3
                                                                    ? "active---list"
                                                                    : ""}
                                                                onClick={() => toggleDropdownList(3)}>
                                                                <img src={checkRight} alt="" /><span> End Date</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="dropdown--arrow">
                                                        <img
                                                            src={require("../../../assets/images/arrow_down.svg").default}
                                                            alt="" />
                                                        <img
                                                            src={require("../../../assets/images/arrow_down.svg").default}
                                                            alt="" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <button className="addclasroom--btn" onClick={() => setCreatePopUp(true)}>
                                            <span>Add Classroom</span> <span className="button--icon">
                                                <img src={plusIcon} alt="" /></span>
                                        </button>
                                        {createPopUp &&
                                            <CreateClassroom
                                                setCreatePopUp={setCreatePopUp}
                                                getClassroom={getClassroom}
                                            />
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="classrooms">
                                {
                                    classroomData && classroomData.length > 0 ? (
                                        classroomData.map((item, index) => (
                                            <div className="class--name--wrapper" key={index}>
                                                <div className="class--name">
                                                    <Link
                                                        className="class--number" to={{
                                                            pathname: `classroom/${item.class_code}`,
                                                            state: {
                                                                classroom: item.class_name,
                                                                id: item.id,
                                                                classCode: item.class_code,

                                                            }
                                                        }}
                                                    >
                                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{item.class_name}</h3>
                                                    </Link>
                                                    <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                        <img src={require("../../../assets/images/3dots.svg").default} />
                                                        <div className="dots--drop--down">
                                                            <div className="dropdown--item">
                                                                <div className="dropdown--list">
                                                                    <ul>
                                                                        {/* <li ><span> Rename</span></li> */}
                                                                        <li
                                                                            onClick={() => {
                                                                                setDeletePopUp(true)
                                                                                setDeleteData({
                                                                                    classCode: item.class_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Delete classroom</span></li>
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
                                            height: "300px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gridColumn: "span 2"
                                        }}>
                                            <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Data found</h2>
                                        </div>)
                                }
                                {deletePopUp && <DeleteClassroom getClassroom={getClassroom} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(Classrooms);
