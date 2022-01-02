import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'
import { getLessonDocument } from '../../Redux/action/Student'

const QuizVideo = ( props ) => {

    const { current } = useSelector( state => state.app )

    const { weekNumber, courseId ,currentStepIndex, totalStepIndex, } = current


    const { getModuleData } = props

    const dispatch = useDispatch()

    const [currentVideo, setCurrentVideo] = useState( 0 )

    const [documentData, setDocumentData] = useState( [] )


    const handlerContinue = () => {
        if ( currentStepIndex < documentData.length - 1 ) {
            setCurrentVideo( currentVideo + 1 )
            getModuleData( {
                currentStepIndex: currentStepIndex + 1,
            } )
        } else {
            getModuleData( {
                activeStep: "quiz",
                currentStepIndex : 0
            } )
        }
    }


    const getFileExtention = docURL => {
        const urlObject = docURL.split( "/" )
       
        const fileName = urlObject[4].split( "." )
       
        return fileName[1]
    }


    const getDocuments = async () => {
        await dispatch( getLessonDocument( {
            course_id: courseId,
            week_number: weekNumber
        } ) )
            .then(
                response => {
                    setDocumentData( response.data )
                },
                () => {
                    setDocumentData( [] )
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    useEffect( () => {
        getDocuments()
    }, [dispatch, courseId, weekNumber] )

    console.log("documentData" ,documentData)

    return (
        <div>
            <div className="quiz-video" style={{ display: "flex", justifyContent: "center", height: "85%" }}>
               
               
                {
                    documentData.map( ( _, index ) => (
                        currentStepIndex === index && (
                            <Fragment key={index}>
                                {
                                    getFileExtention( documentData[index].file_details ) === "mp4" && (
                                        <video width="95%" height="100%" autoPlay controls key={index}>
                                            <source src={documentData[index].file_details} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                }
                                {
                                    getFileExtention( documentData[index].file_details ) === "jpeg"
                                        || getFileExtention( documentData[index].file_details ) === "png"
                                        || getFileExtention( documentData[index].file_details ) === "jpg" ? (
                                        <img
                                            width="95%"
                                            height="100%"
                                            src={documentData[index].file_details}
                                            alt={getFileExtention( documentData[index].file_details )} />
                                    ) : null
                                }
                                {
                                    getFileExtention( documentData[index].file_details ) === "pdf" && (
                                        <button
                                            onClick={() => {
                                                window.open( documentData[index].file_details )
                                            }}
                                            style={{
                                                padding: "0.75rem 1rem",
                                                borderRadius: "6px",
                                                background: "#ef5b2c",
                                                color: "#fff",
                                                border: "none",
                                                cursor: "pointer",
                                            }}>
                                            Download Document
                                        </button>
                                    )
                                }
                            </Fragment>
                        )
                    ) )
                }

                
            </div>

            <div className="btn--group">
                <div className="step--indicator">
                    {documentData.map( ( _, index ) => (
                        <span key={index}
                            className={`indicator--item step${index} ${currentStepIndex > index ? "fill" : ""}`}></span>
                    ) )}
                </div>
                <button className="btn btn--secondary" onClick={handlerContinue}>Continue</button>
            </div>
        </div>
    )
}

export default connect( null, { getModuleData } )( QuizVideo )
