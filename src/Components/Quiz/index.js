import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux"
import { getModuleData } from '../../Redux/action/App'
import { getAllQuizQuestion ,quizOptionSubmitted } from '../../Redux/action/Student'
import IsLoadingHOC from '../IsLoadingHOC'


const Quiz = ( props ) => {

    const { getModuleData, current, data, setLoading } = props;
    const { currentStepIndex, totalStepIndex, weekNumber, courseId ,moduleId } = current;


    const { quizQuestion } = data

    const dispatch = useDispatch();

    const [quizData, setQuizData] = useState( quizQuestion ? quizQuestion : [] );

    useEffect( () => {
        getQuizData()
    }, [] )



    const submitHandler = (option_id , question_id ) => {
        if ( totalStepIndex !== currentStepIndex ) {
            getModuleData( {
                currentStepIndex: currentStepIndex + 1,
            } )
            dispatch(quizOptionSubmitted( {
                    option_id : option_id ,
                    course_id: courseId,
                    class_code : moduleId ,
                    week_number: weekNumber , 
                    question_id : question_id
                   
                } )) 

        }
         else {
            getModuleData( {
                activeStep: "lesson-game",
                previousStep: "quiz",
                currentStepIndex: 0,
            } )
        }
    }


    const getQuizData = () => {
        setLoading( true );
        dispatch( getAllQuizQuestion( {
            course_id: courseId,
            week_number: weekNumber
        } ) )
            .then(
                response => {
                    setQuizData( response.data )
                    getModuleData( {
                        activeStep: "quiz",
                        currentStepIndex: !currentStepIndex
                            ? 0
                            : currentStepIndex,
                        totalStepIndex: response.data.length - 1,
                    } )
                    setLoading( false );
                },
                () => {
                    setLoading( false );
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    return (
        <div className="quiz">
            <div className="quiz--content">
                {quizData.length !== 0 && (
                    <>
                        <h3 className="quiz--question">{quizData[!currentStepIndex ? 0 : currentStepIndex]?.question}</h3>
                        <div className={`option--group`}>
                            {quizData[!currentStepIndex ? 0 : currentStepIndex]?.option_details.map( ( item ) => (
                                <div className="option--item" key={item.id}
                                    onClick={() => submitHandler(item.id ,item.question_id)}
                                >
                                    <button className="btn btn--secondary btn--block">
                                        {item.options}
                                    </button>
                                </div>
                            ) )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { current, data } = state.app;
    return { current, data };
}

export default connect( mapStateToProps, { getModuleData } )( IsLoadingHOC( Quiz ) )
