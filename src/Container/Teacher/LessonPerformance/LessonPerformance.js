import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import ArrowDownImg from "../../../assets/images/arrow_down.svg"
import plusIcon from "../../../assets/images/plus.svg"
import StudentsList from './Students'
import LessonList from "./Lesson";
import { renameClassroom } from '../../../Redux/action/Teacher'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { toast } from 'react-toastify'
import ClassRoomCode from '../../../Components/ClassRoomCode'
import CreateStudent from './Create'



const LessonPerformance = (props) => {
    const { setLoading } = props
    const dispatch = useDispatch()
    const history = useHistory();
    const params = useParams()
    const [isActive, setIsActive] = useState(false)
    const [dropdownState, setdropdownState] = useState(1);
    const [editName, setEditName] = useState(false)
    const [className, setClassName] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)

    let nameElement = null;

    const toggleDropdownList = (index) => {
        setdropdownState(index);
    }

    useEffect(() => {

    }, [className])



    const handlerRenameClassroom = async (e) => {
        await dispatch(renameClassroom({ class_name: e }, history.location.state.id))
            .then(
                response => {
                    toast.success(response.message)
                },
                error => {
                    console.log(error.response.data);
                }
            )
            .catch(
                error => console.log(error)
            )
    }

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
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/classroom" style={{ color: "#000", textDecoration: "none" }}>
                                            <span>Classroom</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                       
                                       
                                        <span
                                            style={{ padding: "0.25rem 0.5rem" }}
                                            ref={(element) => {
                                                nameElement = element
                                                if (nameElement) {
                                                    nameElement.focus();
                                                }
                                            }}
                                            contentEditable={`${editName}`}
                                            suppressContentEditableWarning={true}
                                            autoFocus={true}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setEditName(false)
                                                    if (e.target.innerHTML !== history.location.state.classroom) {
                                                        handlerRenameClassroom(e.target.innerHTML)
                                                    }
                                                }
                                            }}
                                            onBlur={e => {
                                                setEditName(false);
                                                if (e.target.innerHTML !== history.location.state.classroom) {
                                                    handlerRenameClassroom(e.target.innerHTML)
                                                }
                                                setClassName(e.target.innerText)
                                            }}
                                        >
                                            {className ? className : history.location.state.classroom}
                                        </span>


                                        
                                        {editName ? (
                                            <button
                                                className="btn-edit save-btn"
                                                onClick={() => {
                                                    setEditName(false);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-edit"
                                                onClick={() => {
                                                    setEditName(true);
                                                }}>
                                                <img className="edit-class" src={require("../../../assets/images/pancel_icon.svg").default} style={{ width: 20 }} alt="" />
                                            </button>
                                        )}
                                    </li>
                                </ul>
                                <button className="codeBtn" onClick={() => setIsOpen(true)}>See Class Code</button>

                            </div>
                        </div>
                    </div>
                    <ClassRoomCode data={params.id} isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className="grid">
                        <div className="grid---">
                            <div className="lesson--performance-container">
                                <div className="lesson--performances">
                                    <div className="page--title-sub">
                                        <h2>Lesson performance</h2>
                                    </div>
                                    <LessonList />
                                </div>
                                <div className="lesson--students">
                                    <div className="lesson--students-header">
                                        <div className="page--title-sub">
                                            <h2>Students</h2>
                                        </div>
                                        <div className="addclass--ct">
                                            <div className="addclass--room-button">
                                                <div className="drop--down">
                                                    <button className="leval--btn" onClick={e => setIsActive(!isActive)}><span>Name</span> <span className="button--icon"><img src={ArrowDownImg} alt="" /></span></button>
                                                    {isActive && (
                                                        <div className="dropdown--item">
                                                            <div className="dropdown--list">
                                                                <ul>
                                                                    <li className={dropdownState === 1 ? "active---list" : ""} onClick={() => toggleDropdownList(1)} ><img src={require("../../../assets/images/check_right.svg").default} alt="" /><span> Name</span></li>
                                                                    <li className={dropdownState === 2 ? "active---list" : ""} onClick={() => toggleDropdownList(2)}><span><img src={require("../../../assets/images/check_right.svg").default} alt="" /> Student ID</span></li>
                                                                </ul>
                                                            </div>
                                                            <div className="dropdown--arrow">
                                                                <img src={require("../../../assets/images/arrow_down.svg").default} alt="" />
                                                                <img src={require("../../../assets/images/arrow_down.svg").default} alt="" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <button className="addclasroom--btn addstudent-btn" onClick={() => setCreatePopUp(true)} >
                                                    <span className="button--icon">
                                                        <img src={plusIcon} alt="" /></span>
                                                </button>
                                               
                                               {createPopUp && <CreateStudent
                                                    setCreatePopUp={setCreatePopUp}
                                                //  getClassroom={getClassroom}
                                                />
                                               }

                                            </div>
                                        </div>
                                    </div>
                                    <StudentsList />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(LessonPerformance);
