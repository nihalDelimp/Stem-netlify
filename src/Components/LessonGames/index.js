import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { closeModal, getModuleData } from '../../Redux/action/App'
import { useHistory, useLocation, useParams } from "react-router"
import { getAllLessonConversation ,quizGameOptionSubmitted ,getStudentUpdatedScore } from '../../Redux/action/Student'
import IsLoadingHOC from '../IsLoadingHOC'

const LessonGames = ( props ) => {

    const {
        getModuleData,
        current,
        data,
        setLoading,
        setLessonFinished,
        lessonFinished,
        closeModal,
        characterDetail
    } = props

    const {
        selected,
        CLG_Index,
        CG_length,
        CG_index,
        IsOptionOpen ,
        weekNumber,
         courseId ,
         moduleId,
    } = current
    const { lessonSlide, lessonConvOption, LessonQuestionDetail } = data


    // const [IsOptionOpen, setIsOptionOpen] = useState( false )
    const [IsLessonOver, setIsLessonOver] = useState( "" )

    const dispatch = useDispatch()
    const history = useHistory();



    const studentScoreData = async () => {
        await dispatch(getStudentUpdatedScore({
            class_code: moduleId,
            week_number: weekNumber
        }))    
    }

    const getCoversation = () => {
        setLoading( true )
        dispatch( getAllLessonConversation( {
            "course_id": courseId,
            "question_index": !CLG_Index ? 1 : CLG_Index
        } ) )
            .then(
                response => {
                    setLoading( false )
                    getModuleData( {
                        IsOptionOpen : false
                    } )
                    dispatch( {
                        type: "SAVE_DATA",
                        payload: {
                            lessonSlide: response.data.lesson_slide[1],
                            lessonSlideDetails: response.data.lesson_slide[0],
                            lessonConvOption: response.data.option_details,
                            LessonQuestionDetail: response.data.question_details
                        }
                    } )
                    getModuleData( {
                        CG_length: response.data.lesson_slide[1].length,
                    } )
                },
                error => {
                    setIsLessonOver( error.response.data.message );
                    setLoading( false )
                    getModuleData( {
                        CLG_Index: undefined,
                        CG_index: undefined,
                    } )
                }
            )
            .catch( error => console.log( error ) )
    }
    const handlerGoToNextGame = (option_id , question_id ) => {
        dispatch( {
            type: "SAVE_DATA",
            payload: {
                lessonSlide: "",
                lessonSlideDetails: "",
                lessonConvOption: "",
                LessonQuestionDetail: ""
            }
        } )
        getModuleData( {
            CLG_Index: CLG_Index + 1,
        } )
        dispatch(quizGameOptionSubmitted({
            option_id : option_id ,
            course_id: courseId,
            class_code : moduleId ,
            week_number: weekNumber , 
            question_id : question_id

        }))

    }


    const handlerContinue = () => {
        if ( CG_length - 1 > CG_index ) {
           
            getModuleData( {
                CG_index: CG_index + 1
            } )
        } else {
            getModuleData( {
                IsOptionOpen : true
            } )
        }
    }


    const handlerGoToHome = () => {
        closeModal( {
            isModalOpen: false,
        } )
        return history.push( "/leaderboard" )
    }

  

    useEffect( () => {
        studentScoreData();
        getModuleData( {
            CLG_Index: !CLG_Index ? 1 : CLG_Index,
            CG_index: 0,
        } )
        if(!IsLessonOver){
            getCoversation();
        }
        if ( IsLessonOver === " No data present." ) {
            setLessonFinished( true )
        }
    }, [CLG_Index ] )

    return (
        <>
            {
                !lessonFinished
                    ? (
                        <div className="lesson--game">
                            {characterDetail && (
                                <div className="character--name">
                                    <h1>{characterDetail.character_name}</h1>
                                </div>
                            )}
                            {IsOptionOpen && (
                                <div className="game">
                                    <div className="game--title">
                                        {LessonQuestionDetail && LessonQuestionDetail.question}
                                    </div>
                                    <div className="game--group">
                                        {lessonConvOption && lessonConvOption.map( ( item, index ) => {
                                            return (
                                                <div className="game--item"
                                                    key={index}
                                                    onClick={() => handlerGoToNextGame(item.id ,item.question_id)}
                                                >
                                                    <p className="game--item--title">{item.options}</p>
                                                    <div className="game--value--option">
                                                        <div className="game--value--item">
                                                            <img src={require( "../../assets/images/dolor_star.svg" ).default} alt="" />
                                                            <span>{item.is_money}</span>
                                                        </div>

                                                        {/* <div className="game--value--item">
                                                            <img src={require( "../../assets/images/dolor.svg" ).default} alt="" />
                                                            <span>{item.is_power}</span>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                        } )}

                                    </div>
                                </div>
                            )}

                            {
                                !IsOptionOpen && (
                                    <>
                                        <div className="content">
                                            <p>
                                                {lessonSlide && lessonSlide[!CG_index ? 0 : CG_index]?.conversation_details}
                                            </p>
                                        </div>
                                        <div className="btn--group">
                                            <button className="btn btn--secondary"
                                                onClick={handlerContinue}
                                            >Continue</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                    : (
                        <div className="lesson--game" style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div className="lessonFinish--content">
                                <h2>We’re done!</h2>
                                <h2>Nice job!</h2>
                                <button className="back--btn" onClick={handlerGoToHome}>Back</button>
                            </div>
                        </div>
                    )
            }

        </>
    )
}

const mapStateToProps = state => {
    const { current, data } = state.app;
    return { current, data }
}

export default connect( mapStateToProps, { getModuleData, closeModal } )( IsLoadingHOC( LessonGames ) )


