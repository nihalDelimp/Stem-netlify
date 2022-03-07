import React  from 'react'
import {connect} from 'react-redux'
import { getModuleData } from '../../../../Redux/action/App'


const Step3 = ( props ) => {
    const { getModuleData, courseData , getCourseData  } = props
    const { quiz_question, quiz_games } = courseData;
    
    let quizQuestionIndex = []
    let quizQuestionId = []
        ; ( () => {
            if ( quiz_question ) {
                quiz_question.map( ( question, _ ) => {
                    quizQuestionIndex.push( question.question_index )
                    quizQuestionId.push( question.id )
                } )
            } else {
                return
            }
        } )()

    let quizGameIndex = []
    let quizGameQuestionId = []
        ; ( () => {
            if ( quiz_games ) {
                quiz_games.map( ( game, _ ) => {
                    quizGameIndex.push( game.question_index )
                    quizGameQuestionId.push( game.id )
                } )
            } else {
                return
            }
        } )()

    return (
        <>
            <div>
                <div className="upload-quiz-question" style={{ marginBottom: "2rem" }}>
                    <div className="lesson-add-content-header">
                        <span>2</span>
                        <h3>Set the quiz questions</h3>
                    </div>
                    <div className="quiz-question-wrapper">
                        <div className="quiz-question-container">
                            <div className="quiz-qustion-header">
                                <h3>Quiz questions</h3>
                            </div>
                            <div className="quiz-question-counter">
                                {[...Array( 10 )].map( ( _, index ) => (
                                    <div
                                        key={index}
                                        className="quiz-count"
                                        style={quizQuestionIndex.includes( index + 1 )
                                            ? { backgroundColor: "#CDCDCD" }
                                            : null}
                                        onClick={() => getModuleData( {
                                            isModalOpen: true,
                                            activeStep: "add-quiz-question",
                                            questionIndex: ( index + 1 ),
                                            quizQuestionId : quizQuestionIndex.includes( index + 1 ) ? (quizQuestionId[index]) : null,
                                            getCourseData : getCourseData
                                        } )}
                                    >
                                        <span>{( index + 1 )}</span>
                                    </div>
                                ) )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-quiz-question">
                    <div className="lesson-add-content-header">
                        <span>3</span>
                          <h3>Set the game questions</h3>
                    </div>
                    <div className="quiz-question-wrapper">
                        <div className="quiz-question-container">
                            <div className="quiz-qustion-header">
                                <h3>Game questions</h3>
                            </div>
                            <div className="quiz-question-counter">
                                {[...Array( 10 )].map( ( _, index ) => (
                                    <div
                                        key={index}
                                        className="quiz-count"
                                        style={quizGameIndex.includes( index + 1 )
                                            ? { backgroundColor: "#CDCDCD" }
                                            : null}
                                        onClick={() => getModuleData( {
                                            isModalOpen: true,
                                            activeStep: "add-game-question",
                                            questionIndex: ( index + 1 ),
                                            quizGameQuestionId : quizGameIndex.includes( index + 1 ) ? (quizGameQuestionId[index]) : null ,
                                            getCourseData : getCourseData
                                        } )}
                                    >
                                        <span>{( index + 1 )}</span>
                                    </div>
                                ) )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default connect( null, { getModuleData } )( Step3 )
