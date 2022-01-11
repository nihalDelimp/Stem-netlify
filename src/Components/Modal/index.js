import { useEffect, useState } from "react"
import Backdrop from "../Backdrop"
import initialBg from "../../assets/images/lavel-bg-7.png"
import lavelBg1 from "../../assets/images/lavel-bg-1.png"
import lavelBg2 from "../../assets/images/lavel-bg-2.png"
import lavelBg9 from "../../assets/images/lavel-bg-9.png"

import { motion } from "framer-motion"
import Intro from "../Intro"
import Character from "../Character"
import { useHistory, useLocation, useParams } from "react-router"
import { connect, useSelector } from "react-redux"
import { closeModal, getModuleData } from "../../Redux/action/App"
import Quiz from "../Quiz"
import AddGameQuestion from "../AddGameQuestion"
import AddQuizQuestions from "../AddQuizQuestion"
import LessonGames from "../LessonGames"
import QuizVideo from "../QuizVideo"
import { getStudentCharacter } from "../../Redux/action/Student"
import IsLoadingHOC from "../IsLoadingHOC"
import Leaderboard from "../Leaderboard"

const Modal = (props) => {

    const { current, closeModal, data, getModuleData, getStudentCharacter, selected, setLoading, user } = props

    const { CG_TotalIntro, CG_StepIntro, activeStep, currentStepIndex, weekNumber, CLG_Index ,CG_index , CG_length ,IsOptionOpen } = current

    const { lessonSlideDetails } = data

    const selectedChar = useSelector(state => state.app.current.selected)


    const [lessonFinished, setLessonFinished] = useState(false)
    const [characterDetail, setCharacterDetail] = useState([])
    const history = useHistory();
    const location = useLocation()
    const params = useParams()


    const config = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        }
    }


    useEffect(() => {
        if (user.user_type === "STUDENT") {
            getCharacterDetail()
        }
        getModuleData({
            route: location.pathname,
            moduleId: params.id,
            activeStep: !activeStep ? "intro" : activeStep
        })
    }, [activeStep, getModuleData, location.pathname, params.id])



    const goPreviousStep = () => {
        if (activeStep === "intro" && !selectedChar) {
            closeModal({
                isModalOpen: false,
            })
        }
        if (activeStep === "character") {
            getModuleData({
                activeStep: "intro",
                currentStepIndex: 0,
                selectedChar: undefined,
            })
        }
        if (activeStep === "intro" && selectedChar) {
            getModuleData({
                activeStep: "character",
                selected: undefined,
                selectedChar: undefined,

            })
        }
        if (activeStep === "quiz") {
            if (currentStepIndex !== 0) {
                getModuleData({
                    currentStepIndex: currentStepIndex === 0 ? 0 : currentStepIndex - 1
                })

            }
            else {
                getModuleData({
                    activeStep: "quiz-video",
                    currentStepIndex: 0,
                })
            }
        }
        if (activeStep === "quiz-video") {
            if (currentStepIndex !== 0) {
                getModuleData({
                    currentStepIndex: currentStepIndex === 0 ? 0 : currentStepIndex - 1
                })
            }
            else {
                if (weekNumber > 1) {
                    getModuleData({
                        activeStep: "leaderboard",
                        currentStepIndex: 0,
                    })
                }
                else {
                    getModuleData({
                        activeStep: "intro",
                        currentStepIndex: 0,
                    })
                }

            }

        }

        if (activeStep === "lesson-game") {

           if(CG_index !==0 ){
               if(IsOptionOpen === true){
                getModuleData({
                     IsOptionOpen : false
                })
                }
                else{
                    getModuleData({
                        CG_index: CG_index === 0 ? 0 : CG_index - 1,
                    })
               }
           }

            else if (CLG_Index !== 1) {
                getModuleData({
                    CLG_Index: CLG_Index === 1 ? 1 : CLG_Index - 1,
                    IsOptionOpen : false
                })
            }
            else {
                getModuleData({
                    activeStep: "quiz",
                    CG_length : 0
                    //  currentStepIndex: 0,
                })
            }
        }
    }

    const getCharacterDetail = async () => {
        setLoading(true)
        await getStudentCharacter()
            .then(
                response => {
                    setCharacterDetail(response.data)
                    setLoading(false)
                },
                () => {
                    setLoading(false)
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    const handlerClose = () => {
        closeModal({
            isModalOpen: false,
            currentStepIndex: 0,
        })

        switch (activeStep) {
            case "character":
            case "intro":
            case "quiz":
                return history.push("/")
            default:
                return
        }
    }

    return (
        <Backdrop >
            <motion.div
                className={`modal ${activeStep === "quiz" || activeStep === "leaderboard"
                    ? "content--center"
                    : ""}`}
                onClick={(e) => e.stopPropagation()}
                style={activeStep === "intro"
                    ? {
                        backgroundImage: `url(${!selected
                            ? initialBg
                            : lavelBg1
                            })`
                    }
                    : activeStep === "quiz"
                        ? {
                            backgroundImage: `url(${!selected
                                ? initialBg
                                : lavelBg2
                                })`
                        }
                        : activeStep === "lesson-game"
                            ? {
                                backgroundImage: `url(${lessonSlideDetails
                                    ? lessonSlideDetails.file_details
                                    : initialBg})`
                            }
                            : activeStep === "leaderboard"
                                ? {
                                    backgroundImage: `url(${lavelBg9})`
                                }
                                : null
                }
                variants={config}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
            >
                {
                    !lessonFinished
                    && activeStep !== "add-game-question"
                    && activeStep !== "add-quiz-question" && (
                        <div className={"modal--close  btn btn--circle"} onClick={goPreviousStep}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" /></svg>
                        </div>
                    )
                }

                {
                    !lessonFinished
                    && activeStep !== "add-game-question"
                    && activeStep !== "add-quiz-question" && (
                        <div className={"modal--close2 btn btn--circle "}    onClick={handlerClose}>
                            <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.75736 4.02755L8.04136 0.743551L8.77114 1.47333L5.48714 4.75732L8.77114 8.04132L8.04136 8.7711L4.75736 5.4871L1.47337 8.7711L0.743591 8.04132L4.02759 4.75732L0.743591 1.47333L1.47337 0.743551L4.75736 4.02755Z" fill="black" />
                            </svg>
                        </div>
                    )
                }

                {CG_TotalIntro === CG_StepIntro && activeStep === "lesson-game" && (
                    <div className="game--info">
                        <div className="game--info--item">
                            <img src={require("../../assets/images/dolor_star.svg").default} alt="" />
                            <span>$10K</span>
                        </div>
                        <div className="game--info--item">
                            <img src={require("../../assets/images/dolor.svg").default} alt="" />
                            <span>+81</span>
                        </div>
                    </div>
                )}
                {characterDetail && selectedChar && activeStep === "intro" || activeStep === "lesson-game" ? (
                    <motion.div variants={config}
                        initial={"hidden"}
                        animate={"visible"}
                        exit={"exit"}
                        className="modal--character--bg">
                        <img src={`${process.env.REACT_APP_BASEURL}${characterDetail.image}`} alt="" />
                    </motion.div>
                ) : null}
                {characterDetail && selectedChar && activeStep === "leaderboard" && (
                    <motion.div variants={config}
                        initial={"hidden"}
                        animate={"visible"}
                        exit={"exit"} className="right--character">
                        <img src={`${process.env.REACT_APP_BASEURL}${selected.image}`} alt="" />
                    </motion.div>
                )
                }

                <div className={`modal--body ${!activeStep ? "intro" : activeStep} ${lessonFinished ? "lessonFinished" : ""}`}>
                    {activeStep === "add-game-question" ? null : (
                        <div className="shape--group">
                            <img className="bg-shape" src={require("../../assets/images/bg-shape-1.svg").default} alt="" />
                            <img className="bg-shape" src={require("../../assets/images/bg-shape-2.svg").default} alt="" />
                            <img className="bg-shape" src={require("../../assets/images/bg-shape-2.svg").default} alt="" />
                        </div>
                    )}

                    {activeStep === "leaderboard" && <Leaderboard />}
                    {activeStep === "character" && <Character />}
                    {activeStep === "intro" && <Intro characterDetail={characterDetail} />}
                    {activeStep === "quiz" && <Quiz />}
                    {activeStep === "quiz-video" && <QuizVideo />}
                    {activeStep === "lesson-game" && <LessonGames
                        characterDetail={characterDetail}
                        setLessonFinished={setLessonFinished}
                        lessonFinished={lessonFinished} />}
                    {activeStep === "add-game-question" && <AddGameQuestion />}
                    {activeStep === "add-quiz-question" && <AddQuizQuestions />}
                </div>
            </motion.div>
        </Backdrop>
    )
}


const mapStateToProps = state => {
    const { current, data, } = state.app
    const { selected } = state.app.character
    const { user } = state.auth
    return { current, data, selected, user }
}

export default connect(mapStateToProps, {
    closeModal,
    getModuleData,
    getStudentCharacter
})(IsLoadingHOC(Modal))
