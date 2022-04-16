import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { closeModal } from '../../Redux/action/App'
import { createQuizQuestions, getWeeklyQuestionDetails, updateQuizQuestions } from '../../Redux/action/coursePlatform'
import IsloggedinHOC from '../IsLoggedinHOC'
import IsLoadingHOC from '../IsLoadingHOC'
import { useLocation } from 'react-router'

const AddQuizQuestions = (props) => {
    const { setLoading } = props;
    const { app } = useSelector(state => state)
    const { questionIndex, quizQuestionId, getCourseData } = app.current ? app.current : {}
    const dispatch = useDispatch()
    const location = useLocation();
    const { week, classCode, course_code, id } = location.state ? location.state : {};
    const [correct_answer, setCorrectAnswer] = useState("")
    const { course_id } = useSelector(state => state.course)


    const [options, setOptions] = useState([
        {
            option: "",
            is_correct: 0
        },
        {
            option: "",
            is_correct: 0
        },
        {
            option: "",
            is_correct: 0
        },
        {
            option: "",
            is_correct: 0
        }
    ])

    const [state, setState] = useState({
        class_code: classCode,
        course_code: course_code,
        week_number: week,
        question: "",
        question_index: questionIndex
    })

    useEffect(() => {
        if (quizQuestionId) {
            getQuestionDetailsData()
        }
        if (!location.state) {
            dispatch(closeModal({
                isModalOpen: false,
            }))
        }

    }, [])

    const getQuestionDetailsData = async () => {
        setLoading(true)
        await dispatch(getWeeklyQuestionDetails(quizQuestionId)
        )
            .then(
                response => {
                    const { question } = response.data[0]
                    const optiondData = response.data[1]
                    setState({
                        ...state, question: question
                    })
                    optiondData.map((item, index) => {
                        setOptions(
                            [
                                ...optiondData.slice(0, index),
                                { ...item, option: item.options, is_correct: item.is_correct },
                                ...optiondData.slice(index + 1)
                            ]
                        )
                        if (item.is_correct === true) {
                            setCorrectAnswer("selectedAnswer")
                        }
                    })
                    setLoading(false)
                },
                () => setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    const correctAnswerHandler = optionIndex => {
        setOptions(options.map((option, index) => {
            if (index === optionIndex) {
                option.is_correct = 1
            } else {
                option.is_correct = 0
            }
            return option
        }))
        setCorrectAnswer("selectedAnswer")
    }

    const createHandler = async () => {
        if (!state.question) {
            toast.error("Please enter the question")
        }
        else if (!options[0].option || !options[1].option || !options[2].option || !options[3].option) {
            toast.error("Option must be filled")
        }
        else if (!correct_answer) {
            toast.error("Correct answer must be filled")
        }
        else {
            setLoading(true)
            await dispatch(createQuizQuestions({
               ...state,
               options: options
            }) )
                .then(
                    response => {
                        toast.success(response.message);
                        dispatch({
                            type: "SAVE_ADDED_QUIZ",
                            payload: response.data.question_index
                        })
                        dispatch(closeModal({
                            isModalOpen: false,
                        }))
                        setLoading(false)
                        getCourseData();
                    }, error => {
                        error.response.data.errors.forEach(error => {
                            toast.error(error.question)
                        })
                        toast.error(error.response.data.message);
                        setLoading(false)
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                        setLoading(false)
                    }
                )
        }
    }

    const updatedHandler = async () => {
        if (!state.question) {
            toast.error("Please enter the question")
        }
        else if (options[0].option === '' || options[1].option === '' || options[2].option === '' || options[3].option === '') {
            toast.error("Option must be filled")
        }
        else if (!correct_answer) {
            toast.error("Correct answer must be filled")
        }
        else {
            setLoading(true)
            await dispatch(updateQuizQuestions({
                ...state,
                options: options
            }, quizQuestionId))
                .then(
                    response => {
                        toast.success(response.message);
                        dispatch(closeModal({
                            isModalOpen: false,
                        }))
                        setLoading(false)
                        getCourseData();
                    }, error => {
                        error.response.data.errors.forEach(error => {
                            toast.error(error.question)
                        })
                        toast.error(error.response.data.message);
                        setLoading(false)
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                )
        }
    }

    const toChars = n => `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;

    return (
        <div className="modal-game-qustion modal-quiz-qustion">
            <div className="add-game-question">
                <div className="add-game-question-inner">
                    <div className="modal-question-header">
                        <h3>Quiz questions</h3>
                    </div>
                    <div className="add-question-field">
                        <span>Q.{questionIndex}</span>
                        <input
                            type="text"
                            placeholder="Type Question here"
                            value={state.question}
                            onChange={e => setState({ ...state, question: e.target.value })}
                        />
                    </div>
                    {
                        options.map((item, index) => {
                            return (
                                <div className="add-answer-wrapper" key={index}>
                                    <div className="add-question-field">
                                        <span>{`${toChars(index)}.`}</span>
                                        <input
                                            type="text"
                                            value={item.option}
                                            onChange={e => setOptions([
                                                ...options.slice(0, index),
                                                { ...item, option: e.target.value },
                                                ...options.slice(index + 1)
                                            ])}
                                            placeholder="Type answer here"
                                        />
                                    </div>
                                    <div className="select-question-option">
                                        {index === 0 && (
                                            <div className="question-quiz-title">
                                                <h4>Correct answer</h4>
                                            </div>
                                        )}
                                        <div className="modal-question-for-quiz custom-radio-btn">
                                            <input
                                                type="radio"
                                                id={`redio${index}`}
                                                name="answer"
                                                onChange={() => correctAnswerHandler(index)}
                                                checked={item.is_correct == 1 ? true : false}
                                            />
                                            <label htmlFor={`redio${index}`}></label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="proceed-btn-container">
                <div className="proceed-btn-group">
                    <button className="btn-common btn-proceed" onClick={() => {
                        quizQuestionId ? updatedHandler() : createHandler()
                    }}>Proceed</button>
                    <button
                        className="btn-common btn-cancel"
                        onClick={() => {
                            dispatch(closeModal({
                                isModalOpen: false,
                            }))
                        }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default IsLoadingHOC(IsloggedinHOC(AddQuizQuestions))
