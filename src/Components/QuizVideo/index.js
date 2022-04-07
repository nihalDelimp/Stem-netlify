import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'
import { getLessonDocument } from '../../Redux/action/Student'
import FileViewer from 'react-file-viewer';
import IsLoadingHOC from '../IsLoadingHOC'

const QuizVideo = (props) => {

    const { current } = useSelector(state => state.app)
    const { weekNumber, courseId, currentStepIndex, totalStepIndex, } = current
    const { getModuleData, setLoading } = props
    const dispatch = useDispatch()
    const [currentVideo, setCurrentVideo] = useState(0)
    const [documentData, setDocumentData] = useState([])

    const VD_file_types = ["mp4", "MP4"]
    const IMG_file_types = ["jpeg", "png", "jpg"]
    const DOC_file_types = ["pdf"]


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
        console.log("error in file-viewer", e);
    };

    const getFileExtention = docURL => {
        const ext = docURL.split(".").pop()
        return ext
    }


    const getDocuments = async () => {
        setLoading(true);
        await dispatch(getLessonDocument({
            course_id: courseId,
            week_number: weekNumber
        }))
            .then(
                response => {
                    const VD_file_types = ["mp4", "MP4"]
                    const videoData = []
                    const txtData = []
                    response.data && response.data.map((item, index) => {
                        if (VD_file_types.includes(item.file_type)) {
                            videoData.push(item)
                        }
                        else {
                            txtData.push(item)
                        }
                        const updatedDocs = [...videoData, ...txtData]
                        setDocumentData(updatedDocs)
                    })

                    setLoading(false);
                },
                () => {
                    setDocumentData([])
                    setLoading(false);
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
                        currentStepIndex == index && (
                            <Fragment key={index + 1}>
                                {
                                    VD_file_types.includes(getFileExtention(documentData[index].file_details)) &&
                                    (
                                        <video width="95%" height="100%" controls key={index} controlsList="nodownload" >
                                            <source src={`${process.env.REACT_APP_COURSEURL_VD}/${documentData[index].file_details}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                }

                                {
                                    IMG_file_types.includes(getFileExtention(documentData[index].file_details)) &&
                                    (
                                        <img
                                            width="95%"
                                            height="100%"
                                            src={`${process.env.REACT_APP_COURSEURL_MD}/${documentData[index].file_details}`}
                                            alt={getFileExtention(documentData[index].file_details)} />
                                    )
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
                                    DOC_file_types.includes(getFileExtention(documentData[index].file_details)) &&
                                        (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    textAlign: "center"
                                                }} >
                                                <ifram
                                                    width="100%"
                                                    height="100%"
                                                    title="file"
                                                    frameBorder="0"
                                                    loading='eager'
                                                    allow="accelerometer clipboard-write encrypted-media gyroscope  picture-in-picture full"
                                                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                                                    src={`https://docs.google.com/gview?url=${process.env.REACT_APP_COURSEURL_MD}/${documentData[index].file_details}&embedded=true`}
                                                />
                                            </div>
                                        ) 
                                        
                                }

                                {/* {
                                    getFileExtention(documentData[index].file_details) == "pdf" &&
                                        ( 
                                            <div style={{
                                                width : "250px",
                                                height : "200px"
                                                 }} >
                                            <FileViewer
                                                fileType="pdf"
                                                filePath={`${process.env.REACT_APP_COURSEURL_MD}/${documentData[index].file_details}`}
                                                onError={onError} />
                                                </div>
                                        )  
                                } */}
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
            </div >
            <div className="btn--group">
                <div className="step--indicator">
                    {documentData.map((_, index) => (
                        <span key={index + 1}
                            className={`indicator--item step${index} ${currentStepIndex > index ? "fill" : ""}`}></span>
                    ))}
                </div>
                <button className="btn btn--secondary" onClick={handlerContinue}>Continue</button>
            </div>
        </div >
    )
}

export default connect(null, { getModuleData })(IsLoadingHOC(QuizVideo))