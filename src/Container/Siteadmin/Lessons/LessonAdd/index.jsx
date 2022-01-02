import React, { useEffect, useState } from 'react'
import Modal from '../../../../Components/Modal'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
// import Step4 from './Step4'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { createCourse, deleteCourse, getWeekLession } from '../../../../Redux/action/SiteAdmin'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../../../../Components/IsLoadingHOC'

const LessonAdd = ( props ) => {
    const { setLoading } = props;

    const history = useHistory();

    const dispatch = useDispatch()

    const { week, classCode, id } = history.location.state;

    const [activeStep, setActiveStep] = useState( 0 )
    const [courseData, setCourseData] = useState([])
    const { course_documents } = courseData ? courseData : {}
    console.log("course data in  index.js",courseData)

    const { app, course } = useSelector( state => state )
   
    const submitHandler = async () => {
        if ( course.addedDoc.length > 3 ) {
            console.log("course addedDoc length",course.addedDoc.length)
            setLoading( true )
            var formData = new FormData();
            for ( let i = 0; i < course.addedDoc.length; i++ ) {
                formData.append( 'file_details', course.addedDoc[i] );
            }
            formData.append( 'class_code', classCode );
            formData.append( 'week_number', week );
            await dispatch( createCourse( formData ) )
                .then(
                    response => {
                      
                        toast.success( response.message )
                        history.push( `/classroom/${classCode}` )
                        setLoading( false )
                    },
                    error => {
                        toast.error( error.message )
                        setLoading( false )
                    }
                )
                .catch(
                    error => console.log( error )
                )
        } else {
            toast.error( "something went wrong" )
        }
    }


    const getCourseData = async () => {
        await dispatch( getWeekLession( id ) )
            .then(
                response => {
                    setCourseData( response.data );
                    
                },
                () => {
                    setCourseData([])
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    useEffect( () => {
        if ( id ) {
            getCourseData()
        }
    }, [])




    return (
        <>
            {app.current.isModalOpen
                ? <Modal />
                : ""}


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
                                <h4>Weeks {week}</h4>
                            </div>
                        </div>
                    </div>
                    {activeStep === 0 ? (
                        <div className="grid">
                            <div className="grid---">
                                <div className="card" style={{
                                    margin: "0 auto",
                                    maxWidth: "400px",
                                    width: "100%",
                                    border: "1px solid #ebebeb",
                                    padding: "1rem",
                                    borderRadius: "4px"
                                }}>
                                    <Step1 week={week} classCode={classCode} id={id} setActiveStep={setActiveStep} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid">
                                <div className="grid---">
                                    <div className="lesson-add-content_week">
                                        <Step2 courseData={courseData} getCourseData = {getCourseData} />
                                        <Step3 courseData={courseData}  getCourseData = {getCourseData} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="grid---">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span></span>
                                        <div className="create-lesson-button">
                                            <button
                                                type="button"
                                                onClick={submitHandler}
                                                className="btn btn-create-lesson btn-orenge">
                                               {courseData.length > 0  ? "Update lesson" : "Create lesson"}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-create-lesson"
                                                onClick={() => {
                                                   
                                                    dispatch( deleteCourse(week) )
                                                        .then(
                                                            () => {
                                                                
                                                                history.push( `/classroom/${classCode}` )
                                                            },
                                                            () => {
                                                                
                                                             history.push( `/classroom/${classCode}` )
                                                            }
                                                        )
                                                        .catch(
                                                            error => {
                                                                alert("resff3")
                                                                console.log( error );
                                                            }
                                                        )
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC( LessonAdd )
