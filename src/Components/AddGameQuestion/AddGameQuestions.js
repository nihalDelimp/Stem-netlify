import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { closeModal } from '../../Redux/action/App'
import { createGameQuestions ,getGameQuestionsDetails ,updateGameQuizQuestions } from '../../Redux/action/SiteAdmin'
import IsLoadingHOC from '../IsLoadingHOC'
import {useLocation} from 'react-router'

const GameQuestion = ( props ) => {
    const { setLoading } = props
    const {app} = useSelector( state => state )
    const { questionIndex  ,quizGameQuestionId , getCourseData} = app.current ? app.current : {}
    const dispatch = useDispatch()
    const location = useLocation()
    const { week, classCode, id } = location.state ?  location.state : {} ;


    const [options, setOptions] = useState( [
        {
            option: "",
            is_power: 0,
            is_money: 0
        },
        {
            option: "",
            is_power: 0,
            is_money: 0
        },
        {
            option: "",
            is_power: 0,
            is_money: 0
        },
        {
            option: "",
            is_power: 0,
            is_money: 0
        }
    ] )

    const [state, setState] = useState( {
        class_code: classCode,
        week_number: week,
        question_index: questionIndex ,
        question: ""
    } )

    useEffect( () => {
        if (quizGameQuestionId) {
           getGameQuestionDetailsData()
        }
        if(!location.state){
            dispatch( closeModal( {
                isModalOpen: false,
            } ) )
         }

   }, [] )

   const getGameQuestionDetailsData = async () => {
    setLoading( true )
    await dispatch( getGameQuestionsDetails(quizGameQuestionId) )
        .then(
            response => {
                const { question } = response.data[0]
                const optiondData = response.data[1]
                setState( {
                    ...state, question : question 
                } )
                optiondData.map((item,index)=>
                setOptions(
                    [
                        ...optiondData.slice( 0, index ),
                        { ...item, option: item.options ,is_money : item.is_money,
                            is_power :  item.is_power },
                        ...optiondData.slice( index + 1 )
                    ]
                )
                )
                setLoading( false )
            },
            () => setLoading( false )
        )
        .catch(
            error => console.log( error )
        )
}



    const submitHandler = async () => {
  if ( quizGameQuestionId ) {
      setLoading( true )
      await dispatch( updateGameQuizQuestions( { ...state, options: options }, quizGameQuestionId ) )
            .then(
                response => {
                    toast.success( response.message );
                    dispatch( closeModal( {
                        isModalOpen: false,
                    } ) )
                    setLoading( false )
                    getCourseData()
                },
                error => {
                    if ( error.response.status === 401 ) {
                        toast.error( error.response.data.message );
                    } else {
                        error.response.data.errors.forEach( error => {
                            toast.error( error.question )
                        } )
                    }
                    setLoading( false )
                }
            )
            .catch(
                error => console.log( error )
            )
        }
        else {
            
            console.log("option",options)
            if ( options[0].is_money === 0 ||
                 options[1].is_money === 0 ||
                 options[2].is_money === 0 ||
                 options[3].is_money === 0 ) {
            
                  toast.warn( "Money cannot be 0" )
             }


            

            else {
                setLoading( true )
                await dispatch( createGameQuestions( { ...state, options: options } ) )
                
                    .then(
                        response => {
                            toast.success( response.message );
                            dispatch( {
                                type: "SAVE_ADDED_GAMEQUIZ",
                                payload: response.data.question_index
                            } )
                            dispatch( closeModal( {
                                isModalOpen: false,
                            } ) )
                            setLoading( false )
                            getCourseData()
                        },
                        error => {
                            if ( error.response.status === 401 ) {
                                toast.error( error.response.data.message );
                              
                            } else {
                               

                                 error.response.data.errors.forEach( error => {
                                  
                                     toast.error( error.question )
                                     
                                 } )
                             
                               
                            }
                            setLoading( false )
                        }
                    )
                    .catch(
                        error => console.log( error )
                    )
            }
        }



    }

    const toChars = n => `${n >= 26 ? toChars( Math.floor( n / 26 ) - 1 ) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;


    return (
        <>
            <div className="add-game-question">
                <div className="add-game-question-inner">
                    <div className="modal-question-header">
                        <h3>Game questions</h3>
                    </div>
                    <div className="add-question-field">
                        <span>Q.{questionIndex}</span>
                        <input
                            type="text"
                            name='question'
                            placeholder="Type Question here"
                            value={state.question}
                            onChange={e => setState( { ...state, question: e.target.value } )}
                        />
                    </div>

                    {
                        options.map( ( item, index ) => (
                            <div className="add-answer-wrapper" key={index}>
                                <div className="add-question-field">
                                    <span>{toChars( index )}.</span>
                                    <input
                                        type="text"
                                        name= {`quizO${index +1}`}
                                        value={item.option}
                                        onChange={e => setOptions( [...options.slice( 0, index ), { ...item, option: e.target.value }, ...options.slice( index + 1 )] )}
                                        placeholder="Type answer here" />
                                </div>
                                <div className="question-for-game">
                                    <div className="qustion-for-game-input">
                                        <div className="select-dolor">
                                            <input
                                                type="number"
                                                name= {`quizM${index +1}`}
                                                value={item.is_money }
                                                style={{ padding: "0.55rem 0.5rem", paddingLeft: "2.5rem" }}
                                                onChange={e => setOptions( [...options.slice( 0, index ), { ...item, is_money: e.target.value }, ...options.slice( index + 1 )] )}
                                            />
                                            <span>
                                                <img src={require( "../../assets/images/dolor_star.svg" ).default} alt="" />
                                            </span>
                                        </div>
                                        <div className="select-star">
                                            <input
                                                type="number"
                                                name={`quizP${index +1}`}
                                                style={{ padding: "0.55rem 0.5rem", paddingLeft: "1.75rem" }}
                                                value={item.is_power}
                                                onChange={e => setOptions( [...options.slice( 0, index ), { ...item, is_power: e.target.value }, ...options.slice( index + 1 )] )}
                                            />
                                            <span>
                                                <img src={require( "../../assets/images/dolor.svg" ).default} alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }

                </div>
            </div>
            <div className="proceed-btn-container">
                <div className="proceed-btn-group">
                    <button className="btn-common btn-proceed" onClick={submitHandler}>Proceed</button>
                    <button
                        className="btn-common btn-cancel"
                        onClick={() => {
                            dispatch( closeModal( {
                                isModalOpen: false,
                            } ) )
                        }}
                    >Cancel</button>
                </div>
            </div>
            </>
        
    )
}

export default IsLoadingHOC( GameQuestion )
