
import React from 'react'
import { Link } from 'react-router-dom';



const LessonAdd = () => {
    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Course Management System</h2>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="grid---">
                        <div className="page--sub-title">
                            <ul>
                                <li><span>Lessons</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lesson--add---week">
                    <div className="grid">
                        <div className="grid---">
                            <div className="add-lesson-week-counter">
                                <h4>Week 1</h4>
                                <h5>
                                    <span>1/9 - 7/9</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="lesson-add-content_week">
                                <div className="upload-video-text">
                                    <div className="lesson-add-content-header">
                                        <span>1</span>
                                        <h3>Upload your videos and texts</h3>
                                    </div>
                                    <div className="upload-video-text-container">
                                        <div className="upload-video-text-counter">
                                            <h3>First video</h3>
                                            <Link to="#">
                                                <div className="file--upload">
                                                    <input type="file"></input>
                                                    <div className="add-video-icon">
                                                        <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                                        <span>Add video</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="upload-video-text-counter">
                                            <h3>First video</h3>
                                            <Link to="#">
                                                <div className="file--upload">
                                                    <input type="file"></input>
                                                    <div className="add-video-icon">
                                                        <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                                        <span>Add video</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="upload-video-text-counter">
                                            <h3>First video</h3>
                                            <Link to="#">
                                                <div className="file--upload">
                                                    <input type="file"></input>
                                                    <div className="add-video-icon">
                                                        <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                                        <span>Add video</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="upload-video-text-counter">
                                            <h3>First video</h3>
                                            <Link to="#">
                                                <div className="file--upload">
                                                    <input type="file"></input>
                                                    <div className="add-video-icon">
                                                        <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                                        <span>Add video</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="upload-quiz-question">
                                    <div className="lesson-add-content-header">
                                        <span>2</span>
                                        <h3>Set the questions</h3>
                                    </div>
                                    <div className="quiz-question-wrapper">
                                        <div className="quiz-question-container">
                                            <div className="quiz-qustion-header">
                                                <h3>Quiz questions</h3>
                                            </div>
                                            <div className="quiz-question-counter">
                                                <Link to="#" className="quiz-count" style={{ backgroundColor: "#CDCDCD" }}>
                                                    <span>1</span>
                                                </Link>
                                                <Link to="#" className="quiz-count" style={{ backgroundColor: "#CDCDCD" }}>
                                                    <span>2</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>3</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>4</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>5</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="quiz-question-container">
                                            <div className="quiz-qustion-header">
                                                <h3>Quiz questions</h3>
                                            </div>
                                            <div className="quiz-question-counter">
                                                <Link to="#" className="quiz-count">
                                                    <span>6</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>7</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>8</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>9</span>
                                                </Link>
                                                <Link to="#" className="quiz-count">
                                                    <span>10</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="create-lesson-button">
                                <button type="button" className="btn btn-create-lesson btn-orenge">
                                    Create lesson
                                </button>
                                <button type="button" className="btn btn-create-lesson">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonAdd;