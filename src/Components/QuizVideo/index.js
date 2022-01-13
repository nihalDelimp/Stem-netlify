import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'
import { getLessonDocument } from '../../Redux/action/Student'
import FileViewer from 'react-file-viewer';
import IsLoadingHOC from '../IsLoadingHOC'

const QuizVideo = (props) => {

    const { current } = useSelector(state => state.app)

    const type = 'pdf'
    const { weekNumber, courseId, currentStepIndex, totalStepIndex, } = current
    const { getModuleData, setLoading } = props
    const dispatch = useDispatch()
    const [currentVideo, setCurrentVideo] = useState(0)
    const [loader, setLoader] = useState(true)
    const [documentData, setDocumentData] = useState([])


    const handlerContinue = () => {
        if (currentStepIndex < documentData.length - 1) {
            setCurrentVideo(currentVideo + 1)
            getModuleData({
                currentStepIndex: currentStepIndex + 1,
            })
        } else {
            getModuleData({
                activeStep: "quiz",
                currentStepIndex: 0
            })
        }
    }
    const onError = e => {
        console.log(e, "error in file-viewer");
    };


    const getFileExtention = docURL => {
        const urlObject = docURL.split("/")

        const fileName = urlObject[4].split(".")

        return fileName[1]
    }


    const getDocuments = async () => {
        await dispatch(getLessonDocument({
            course_id: courseId,
            week_number: weekNumber
        }))
            .then(
                response => {
                    setDocumentData(response.data)
                    console.log(response.data[2], "Nihals")
                },
                () => {
                    setDocumentData([])
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getDocuments()
    }, [dispatch, courseId, weekNumber])

    return (
        <div>
            <div className="quiz-video" style={{ display: "flex", justifyContent: "center", height: "85%" }}>


                {documentData && documentData.length > 0 ?
                    (documentData.map((_, index) => (
                        currentStepIndex === index && (
                            <Fragment key={index + 1}>
                                {
                                    getFileExtention(documentData[index].file_details) === "mp4" && (
                                        <video width="95%" height="100%" controls key={index}>
                                            <source src={documentData[index].file_details} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                }
                                {
                                    getFileExtention(documentData[index].file_details) === "jpeg"
                                        || getFileExtention(documentData[index].file_details) === "png"


                                        || getFileExtention(documentData[index].file_details) === "jpg" ? (
                                        <img
                                            width="95%"
                                            height="100%"
                                            src={documentData[index].file_details}
                                            alt={getFileExtention(documentData[index].file_details)} />
                                    ) : null
                                }

                                {/* {
                                    getFileExtention(documentData[index].file_details) === "pdf" && (
                                        <button
                                            onClick={() => {
                                                window.open(documentData[index].file_details)
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
                                } */}

                                {
                                    getFileExtention(documentData[index].file_details) === "docx" && (
                                        <div style={{
                                            width: "95%",
                                            height: "100%",
                                            textAlign: "center"
                                        }} >
                                            <FileViewer
                                                fileType={"docx"}
                                                filePath={documentData[index].file_details}
                                                onError={onError}
                                            />
                                        </div>
                                    )
                                }

                                {
                                    getFileExtention(documentData[index].file_details) === "pdf" && (
                                        <div style={{
                                            width: "95%",
                                            height: "100%",
                                            textAlign: "center"
                                        }} >
                                            <FileViewer
                                                fileType={"pdf"}
                                                filePath={documentData[index].file_details}
                                                onError={onError}
                                            />
                                        </div>
                                    )}



                                {
                                    getFileExtention(documentData[index].file_details) === "txt" ||
                                        getFileExtention(documentData[index].file_details) === "doc" ?
                                        <iframe
                                            src={"https://docs.google.com/viewer?url=" + documentData[index].file_details + "&embedded=true"}
                                            width="100%"
                                            height="100%"
                                            id="myId"
                                            display="initial"
                                            title="file"
                                            frameborder='0'
                                            allowtransparency='true'
                                            position="relative" />
                                        : null
                                }
                            </Fragment>
                        ))
                    )) :
                    (<div style={{
                        height: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gridColumn: "span 2"
                    }}>
                        <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Data found</h2>
                    </div>)
                }
            </div>
            <div className="btn--group">
                <div className="step--indicator">
                    {documentData.map((_, index) => (
                        <span key={index}
                            className={`indicator--item step${index} ${currentStepIndex > index ? "fill" : ""}`}></span>
                    ))}
                </div>
                <button className="btn btn--secondary" onClick={handlerContinue}>Continue</button>
            </div>
        </div>
    )
}

export default connect(null, { getModuleData })(IsLoadingHOC(QuizVideo))
