import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { trimFileName } from '../../../../Helper'
import { updatevideodocs } from '../../../../Redux/action/SiteAdmin'
import IsLoadingHOC from '../../../../Components/IsLoadingHOC'
import { toast } from 'react-toastify'


const Step2 = (props) => {

    const { course_documents, setLoading, getCourseData } = props
    const dispatch = useDispatch()
    const [firstdoc, setFirstDoc] = useState([])
    const [seconddoc, setSecondDoc] = useState([])
    const [thirddoc, setThirdDoc] = useState([])
    const [fourthdoc, setFourthDoc] = useState([])


    const setImageDocURL = (course_documents) => {
        const videodocs1 = []
        const textdocs1 = []
        course_documents.map((item, index) => {
            if (item.file_type == "mp4") {
                if (videodocs1.length == 0) {
                    setFirstDoc(item)
                    videodocs1.push(item)
                }
                else {
                    setSecondDoc(item)
                }
            }
            else {
                if (textdocs1.length == 0) {
                    setThirdDoc(item)
                    textdocs1.push(item)
                }
                else {
                    setFourthDoc(item)
                }
            }

        }
        )
    }


    useEffect(() => {
        dispatch({ type: "REMOVE_ADDED_DOC" })
        if (course_documents && course_documents.length > 0) {
            setImageDocURL(course_documents)
        }
    }, [dispatch, course_documents])


    const clearStoreFile = () => {
        dispatch({ type: "REMOVE_ADDED_DOC" })
        setFirstDoc([])
        setSecondDoc([])
        setThirdDoc([])
        setFourthDoc([])
    }

    const handlerFileChange = async (filedata, id) => {
        if (filedata.type == "text/plain") {
            window.alert("File type not supported..!")
        }
        else {
            var formData = new FormData();
            formData.append('file_details', filedata);
            setLoading(true)
            await dispatch(updatevideodocs(formData, id))
                .then(
                    response => {
                        toast.success(response.message)
                        setLoading(false)
                        getCourseData();
                    },
                    error => {
                        toast.error(error.message)
                        setLoading(false)
                    }
                )
                .catch(
                    error => console.log(error)
                )
        }

    }

    return (
        <div className="upload-video-text">
            <div className="lesson-add-content-header">
                <span>1</span>
                <h3>Upload your videos</h3>
            </div>
            <div className="upload-video-text-container">
                <div className="upload-video-text-counter">
                    <h3>First video</h3>
                    <div>
                        <div className="file--upload">
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={e => {
                                    if (e.target.files.length === 0) {
                                        clearStoreFile()
                                    } else {
                                        firstdoc.id ?
                                            handlerFileChange(e.target.files[0], firstdoc.id)
                                            :
                                            setFirstDoc(e.target.files[0])
                                        dispatch({ type: "SAVE_ADDED_DOC", payload: e.target.files[0] })

                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require("../../../../assets/images/plus.svg").default} alt="" />
                                <span>{firstdoc?.length !== 0
                                    ? trimFileName(firstdoc.name ? firstdoc.name : firstdoc.file_details)
                                    : "Add video"
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-video-text-counter">
                    <h3>Second video</h3>
                    <div>
                        <div className="file--upload">
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={e => {
                                    if (e.target.files.length === 0) {
                                        clearStoreFile()
                                    } else {
                                        seconddoc.id ?
                                            handlerFileChange(e.target.files[0], seconddoc.id)
                                            :
                                            setSecondDoc(e.target.files[0])
                                        dispatch({ type: "SAVE_ADDED_DOC", payload: e.target.files[0] })
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require("../../../../assets/images/plus.svg").default} alt="" />
                                <span>{seconddoc?.length !== 0
                                    ? trimFileName(seconddoc.name ? seconddoc.name : seconddoc.file_details)
                                    : "Add video"
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-video-text-counter">
                    <h3>First text</h3>
                    <div>
                        <div className="file--upload">
                            <input
                                type="file"
                                accept="application/pdf, image/png, image/jpeg, image/jpg, text/plain, text/csv, .docx, .xlsx "
                                onChange={e => {
                                    if (e.target.files.length === 0) {
                                        clearStoreFile();
                                    } else {
                                        if (thirddoc.id) {
                                            handlerFileChange(e.target.files[0], thirddoc.id)
                                        }
                                        else {
                                            if (e.target.files[0].type === "text/plain") {
                                                window.alert("File type not supported..!")
                                            }
                                            else {
                                                setThirdDoc(e.target.files[0])
                                                dispatch({ type: "SAVE_ADDED_DOC", payload: e.target.files[0] })
                                            }
                                        }
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require("../../../../assets/images/plus.svg").default} alt="" />
                                <span>{thirddoc?.length !== 0
                                    ? trimFileName(thirddoc.name ? thirddoc.name : thirddoc.file_details)
                                    : "Add Text"
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-video-text-counter">
                    <h3>Second text</h3>
                    <div>
                        <div className="file--upload">
                            <input
                                type="file"
                                accept="application/pdf, image/png, image/jpeg, image/jpg, text/plain, text/csv, .docx , ,.xlsx "
                                onChange={e => {
                                    if (e.target.files.length === 0) {
                                        clearStoreFile();
                                    } else {
                                        if (fourthdoc.id) {
                                            handlerFileChange(e.target.files[0], fourthdoc.id)
                                        }
                                        else {
                                            if (e.target.files[0].type === "text/plain") {
                                                window.alert("File type not supported..!")
                                            }
                                            else {
                                                setFourthDoc(e.target.files[0])
                                                dispatch({ type: "SAVE_ADDED_DOC", payload: e.target.files[0] })
                                            }
                                        }
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require("../../../../assets/images/plus.svg").default} alt="" />
                                <span> {fourthdoc?.length !== 0
                                    ? trimFileName(fourthdoc.name ? fourthdoc.name : fourthdoc.file_details)
                                    : "Add Text"
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(Step2)
