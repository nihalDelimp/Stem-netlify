import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import IsLoadingHOC from '../../Components/IsLoadingHOC'
import Modal from '../../Components/Modal'
import { getModuleData } from '../../Redux/action/App'
import { getAllLesson, getCharacters, getIntro } from '../../Redux/action/Student'
import { IsloggedinHOC } from '../../Components/IsLoggedinHOC'
import PopupModel from './popupModel'
import lock_icon from "../../assets/images/lock_icon2.png"


const Dashboard = (props) => {
    const { getModuleData, name, setLoading } = props
    const modal = useSelector(state => state.app)
    const role = useSelector(state => state.auth.user.user_type)
    const [, setModalOpen] = useState(true)
    const dispatch = useDispatch();

    const [lessonData, setLessonData] = useState([])
    const [lockedModel, setLockedModel] = useState(false)
    const [unlockedWeek, SetUnlockedWeek] = useState(0)

    const getModuleIntro = async () => {
        await dispatch(getIntro())
    }
    const getCharacterList = async () => {
        await dispatch(getCharacters())
    }

    useEffect(() => {
        if (role === "STUDENT") {
            setLoading(true)
            getCharacterList()
            getModuleIntro()
            dispatch(getAllLesson())
                .then(
                    response => {
                        setLessonData(response.data ? response.data : [])
                        setLoading(false)
                        dispatch({ type: "SET_CLASS_CODE_SUCCESS", payload: response.data[0].course_code })
                        response.data && response.data.map(item => {
                            if (!item.lesson_locked) {
                                SetUnlockedWeek(item.week_number)
                                dispatch({ type: "SET_ACTIVE_WEEK_NUMBER", payload: item.week_number })
                            }

                        })
                    },
                    () => {
                        setLessonData([])
                        setLoading(false)
                    }
                )
                .catch(
                    error => console.log(error)
                )
        }
    }, [])

    return (
        <>
            {modal.current.isModalOpen
                ? <Modal setModalOpen={setModalOpen} />
                : ""}
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="card card--welcome">
                            <div className="card--body">
                                <h2>{`Welcome back! ${name}`}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="grid--">
                        <div className="grid--header">
                            <h2>This week’s modules</h2>
                            <button className="btn btn--circle option">
                                {/* <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.7083 12.8333C13.4562 12.8333 11.5638 11.3461 11.0273 9.33333H2.41667V7H11.0273C11.5638 4.98723 13.4562 3.5 15.7083 3.5C18.3777 3.5 20.5417 5.58934 20.5417 8.16667C20.5417 10.744 18.3777 12.8333 15.7083 12.8333ZM22.9583 7H26.5833V9.33333H22.9583V7ZM9.66667 24.5C7.41453 24.5 5.52216 23.0128 4.98561 21H2.41667V18.6667H4.98561C5.52216 16.6539 7.41453 15.1667 9.66667 15.1667C12.336 15.1667 14.5 17.256 14.5 19.8333C14.5 22.4107 12.336 24.5 9.66667 24.5ZM16.9167 21H26.5833V18.6667H16.9167V21ZM12.0833 19.8333C12.0833 21.122 11.0014 22.1667 9.66667 22.1667C8.33198 22.1667 7.25 21.122 7.25 19.8333C7.25 18.5447 8.33198 17.5 9.66667 17.5C11.0014 17.5 12.0833 18.5447 12.0833 19.8333ZM18.125 8.16667C18.125 9.45533 17.043 10.5 15.7083 10.5C14.3736 10.5 13.2917 9.45533 13.2917 8.16667C13.2917 6.878 14.3736 5.83333 15.7083 5.83333C17.043 5.83333 18.125 6.878 18.125 8.16667Z" fill="#414141" />
                                </svg> */}
                            </button>
                        </div>
                        <div className="grid--body">
                            <div className="module--group">
                                {lessonData.length !== 0 ? (
                                    lessonData.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={{
                                                pathname: item.week_number <= unlockedWeek ? `/intro/${item.course_code}` : "",
                                            }}
                                            onClick={() => {
                                                item.week_number <= unlockedWeek ?
                                                    getModuleData({
                                                        isModalOpen: true,
                                                        weekNumber: item.week_number,
                                                        courseId: item.id,
                                                        lessonLocked: item.lesson_locked,
                                                        activeStep: item.week_number === 1 ? undefined : "leaderboard",
                                                        currentStepIndex: 0,
                                                        // class_code: item.class_code,
                                                        class_code: item.course_code,  
                                                    })
                                                    :
                                                    setLockedModel(true)
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.01,
                                                }}
                                                className="module--item"
                                                style={{
                                                    backgroundColor: `${!item.lesson_locked
                                                        ? `${(item.id % 2)
                                                            ? "#F6C940"
                                                            : "#F6C940"}`
                                                        : `#979494`}`
                                                }}
                                            >     
                                               { item.week_number > unlockedWeek && <div 
                                                 style={{
                                                 textAlign : "end",
                                                 margin: "-8px"}} >
                                                 <img src= {lock_icon}   />
                                                 </div>}
                                                <span className="text--outline">
                                                    Module {index + 1}
                                                </span>
                                                {/* <button className="btn btn--circle option">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>
                                                </button> */}
                                                <h5 className="module--title">{item.course_name}</h5>
                                            </motion.div>
                                        </Link>
                                    ))
                                ) : (
                                    <div style={{
                                        height: "300px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gridColumn: "span 2"
                                    }}>
                                        <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No modules found</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* <div className="grid- overview">
                        <div className="grid--header">
                            <h2>Budget overview</h2>
                        </div>
                        <div className="grid--body">
                            <div className="card card--overview">
                                <div className="card--body">
                                    <div className="graph--card"></div>
                                    <h3>Recent activities</h3>
                                    <ul className="list--group">
                                        <li className="list--item">
                                            <p>Rennovated headquarter office</p>
                                            <span className="list--tag">200K</span>
                                        </li>
                                        <li className="list--item">
                                            <p>Recuitment of software developer</p>
                                            <span className="list--tag">50K</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
            {lockedModel && <PopupModel setLockedModel={setLockedModel} />}
        </>
    )
}

const mapStateToProps = state => {
    const { user } = state.auth
    return user
}


export default connect(mapStateToProps,
    { getModuleData })
    (IsLoadingHOC(IsloggedinHOC(Dashboard)))

