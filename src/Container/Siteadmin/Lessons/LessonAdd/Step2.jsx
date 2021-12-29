import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { trimFileName } from '../../../../Helper'

const Step2 = ( props ) => {

    const { courseData } = props
    const { course_documents } = courseData
    const dispatch = useDispatch()


    const [firstdoc, setFirstDoc] = useState( [] )
    const [seconddoc, setSecondDoc] = useState( [] )
    const [thirddoc, setThirdDoc] = useState( [] )
    const [fourthdoc, setFourthDoc] = useState( [] )

    const setImageDocURL = (course_documents) =>{
           const videodocs1 = []
           const textdocs1 = []
            course_documents.map((item ,index) =>{
                if(item.file_type=="mp4"){
                    if(videodocs1.length == 0){
                        setFirstDoc(item)
                        videodocs1.push(item)
                    }
                    else{
                        setSecondDoc(item)
                    }
                }
                if(item.file_type=="jpeg" || item.file_type=="jpeg"  || item.file_type=="png" || item.file_type=="jpg" || item.file_type=="pdf"){
                    if(textdocs1.length == 0){
                    setThirdDoc(item)
                    textdocs1.push(item)
                    }
                    else{
                        setFourthDoc(item)
                    }
                }
                dispatch( { type: "SAVE_ADDED_DOC", payload: item} )
            } 
            )
    }

    
    useEffect( () => {
        dispatch( { type: "REMOVE_ADDED_DOC" } )
        if(course_documents && course_documents.length > 0){
            setImageDocURL(course_documents)
        }
    }, [dispatch] )


    const clearStoreFile = () => {
        dispatch( { type: "REMOVE_ADDED_DOC" } )
        setFirstDoc( [] )
        setSecondDoc( [] )
        setThirdDoc( [] )
        setFourthDoc( [] )
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
                                    if ( e.target.files.length === 0 ) {
                                        clearStoreFile()
                                    } else {
                                        setFirstDoc( e.target.files[0] )
                                        dispatch( { type: "SAVE_ADDED_DOC", payload: e.target.files[0] } )
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require( "../../../../assets/images/plus.svg" ).default} alt="" />
                                <span>{firstdoc?.length !== 0
                                    ? trimFileName( firstdoc.name ? firstdoc.name : firstdoc.file_details )
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
                                    if ( e.target.files.length === 0 ) {
                                        clearStoreFile()
                                    } else {
                                        setSecondDoc( e.target.files[0] )
                                        dispatch( { type: "SAVE_ADDED_DOC", payload: e.target.files[0] } )
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require( "../../../../assets/images/plus.svg" ).default} alt="" />
                                <span>{seconddoc?.length !== 0
                                    ? trimFileName( seconddoc.name ? seconddoc.name : seconddoc.file_details )
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
                                accept="application/pdf, image/png, image/jpeg, image/jpg"
                                onChange={e => {
                                    if ( e.target.files.length === 0 ) {
                                        clearStoreFile()
                                    } else {
                                        setThirdDoc( e.target.files[0] )
                                        dispatch( { type: "SAVE_ADDED_DOC", payload: e.target.files[0] } )
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require( "../../../../assets/images/plus.svg" ).default} alt="" />
                                <span>{thirddoc?.length !== 0 
                                    ? trimFileName( thirddoc.name ? thirddoc.name : thirddoc.file_details )
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
                                accept="application/pdf, image/png, image/jpeg, image/jpg"
                                onChange={e => {
                                    if ( e.target.files.length === 0 ) {
                                        clearStoreFile()
                                    } else {
                                        setFourthDoc( e.target.files[0] )
                                        dispatch( { type: "SAVE_ADDED_DOC", payload: e.target.files[0] } )
                                    }
                                }}
                            />
                            <div className="add-video-icon">
                                <img src={require( "../../../../assets/images/plus.svg" ).default} alt="" />
                                <span>{fourthdoc?.length !== 0
                                    ? trimFileName( fourthdoc.name ? fourthdoc.name : fourthdoc.file_details )
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

export default Step2
