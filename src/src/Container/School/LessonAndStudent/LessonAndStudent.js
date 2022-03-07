import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useParams ,useLocation } from 'react-router-dom'
import ArrowDownImg from "../../../assets/images/arrow_down.svg"
import StudentsList from './Students'
import LessonList from "./Lesson";
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import ClassRoomCode from '../../../Components/ClassRoomCode'


const LessonAndStudent = (props) => {
    const { setLoading } = props
    const dispatch = useDispatch()
    const history = useHistory();
    const location = useLocation()
    const params = useParams()
    const [isActive, setIsActive] = useState(false)
    const [dropdownState, setdropdownState] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)

    const {user_id , classroom} = location.state ? location.state : {}

  
    const toggleDropdownList = (index) => {
        setdropdownState(index);
    }

    useEffect(() => {

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
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/" style={{ color: "#000", textDecoration: "none" }}>
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                        <Link to={`/adminDetails/${user_id}`} style={{ color: "#000", textDecoration: "none" }}>
                                        <span >
                                            {classroom}
                                        </span>
                                        </Link>
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

export default IsLoadingHOC(LessonAndStudent);
