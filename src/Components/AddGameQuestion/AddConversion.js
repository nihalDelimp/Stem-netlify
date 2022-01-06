import React, { useEffect, useState } from 'react'
import { trimFileName } from '../../Helper'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
    createLessonConversation,
    getLessonConversation,
    createLessonConversationImage,
    getLessonConversationImage,
    DeleteLessonSlideConversation,
    UpdateLessonSlideConversation,
    updateLessonConversationImage
} from '../../Redux/action/SiteAdmin'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../IsLoadingHOC'
import { closeModal } from '../../Redux/action/App'
import { useHistory } from 'react-router'


const AddConversion = (props) => {
    const { setLoading } = props;
    const [bg, setBg] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [gotfileUrl2, setGotFileUrl2] = useState('')
    const [slidefileID, setSlideFileID] = useState('')
    const [lessonDesc, setLessonDesc] = useState('')
    const [lessonDescID, setLessonDescID] = useState('')
    const [lessonConversation, setlessonConversation] = useState([])
    const [flag, setflag] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state)
    const { week, classCode, id } = history.location.state;
    const { coursedetails } = useSelector(state => state.course)
    const { courseId } = coursedetails ? coursedetails : {}



    useEffect(() => {
        lesson_conversation_list()
        getLessonConversationImageUrl()
    }, [])


    const getLessonConversationImageUrl = async () => {
        await dispatch(getLessonConversationImage({
            "class_code": classCode,
            "course_id": id || courseId,
            "question_index": state.app.current.questionIndex,
            "week_number": week

        }))
            .then(
                response => {
                    setBg(response.data.file_details)
                    setGotFileUrl2(response.data.file_details)
                    setSlideFileID(response.data.id)
                },
                error => {
                    console.log(error)
                }
            )
            .catch((err) => err.message)
    }

    const lesson_conversation_list = async () => {
        await dispatch(getLessonConversation({
            "question_index": state.app.current.questionIndex,
            "course_id": id || courseId,
            "week_number": week
        }))
            .then(
                response => {
                    setlessonConversation(response.data)

                },
                error => {
                    console.log(error)
                }
            )
            .catch((err) => err.message)
    }

    const addConversations = async () => {
        if (!lessonDesc) {
            toast.error("Please provide the lesson description!")
        }
        else {
            setLoading(true)
            if (flag) {
                await dispatch(UpdateLessonSlideConversation(lessonDescID, { conversation_details: lessonDesc }))
                    .then(
                        async () => {
                            await lesson_conversation_list();
                            setLessonDesc('')
                            setLoading(false)
                            setflag(false)
                        },
                        () => {
                            setLoading(false)
                        })
                    .catch(
                        error => console.log(error)
                    )

            }

            else {
                await dispatch(createLessonConversation({
                    "question_index": state.app.current.questionIndex,
                    "course_id": id || courseId,
                    "conversation_details": lessonDesc,
                    "week_number": week
                }))
                    .then(
                        async () => {
                            await lesson_conversation_list();
                            setLessonDesc('')
                            setLoading(false)
                        },
                        () => {
                            setLoading(false)
                        })
                    .catch(
                        error => console.log(error)
                    )
            }

        }
    }

    const deleteconversastion = async (id) => {
        await dispatch(DeleteLessonSlideConversation(id))
            .then(
                async () => {
                    await lesson_conversation_list();
                },
                error => {
                    console.log(error)
                }
            )
            .catch((err) => err.message)
    }

    const handleConversationChange = async (id) => {
        lessonConversation.map((item, index) => {
            if (item.id === id) {
                setLessonDesc(item.conversation_details)
                setLessonDescID(item.id)
                setflag(true)
            }
        })
    }

    const updateImage = async () =>{
        if(fileUrl){
        setLoading(true)
        var formData = new FormData();
        formData.append('question_index', state.app.current.questionIndex);
        formData.append('course_id', id || courseId);
        formData.append('week_number', week);
        formData.append('file_details', fileUrl);
        await dispatch(updateLessonConversationImage(slidefileID ,formData))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    props.onClick()
                    
                },
                error => {
                    setLoading(false)
                    toast.error(error.response.data.message)
                }
            )
            .catch(err => console.log(err))
        }
        else{
            props.onClick()

        }

    }

    const createImage = async () =>{
        setLoading(true)
        var formData = new FormData();
        formData.append('question_index', state.app.current.questionIndex);
        formData.append('course_id', id || courseId);
        formData.append('week_number', week);
        formData.append('file_details', fileUrl);
        await dispatch(createLessonConversationImage(formData))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    props.onClick()
                },
                error => {
                    setLoading(false)
                    toast.error(error.response.data.message)
                }
            )
            .catch(err => console.log(err))
        
    }

    const handleProcess = () =>{
        
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        } ,1000)
        props.onClick();
    }

    return (
        <>
            <div className="add-game-question">
                <div className="add-game-question-inner">
                    <div className="modal-question-header">
                        <h3>conversation</h3>
                    </div>
                    <div className="modal-question-body conversion">
                        <div>
                            <div className="conversion--list">
                                <div className="conversion--item"></div>
                            </div>
                            <div className="add--conversion">
                                <div action="" className="add--conversion--form">
                                    <div className="form--item">
                                        <ul>
                                            {lessonConversation.map(item => (
                                                <li key={item.id}>
                                                    <span>{item.conversation_details}</span>
                                                    <div className="action--group">
                                                        <button className="action--item"
                                                            onClick={() => handleConversationChange(item.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                <path fill="#3e3e3e"
                                                                    d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"

                                                                /> 
                                                            </svg>
                                                        </button>

                                                        <button className="action--item"
                                                            onClick={() => deleteconversastion(item.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                <path fill="#ef5b2c"
                                                                    d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"

                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="form--item">
                                            <textarea name="lesson_desc" value={lessonDesc} id="#" onChange={(e => setLessonDesc(e.target.value))} cols="30" rows="10"></textarea>
                                        </div>
                                        <div className="form--itme">
                                            <button
                                                type="submit"
                                                className="btn btn-create-lesson btn-orenge"
                                                style={{ maxWidth: "unset" }}
                                                onClick={addConversations}>
                                                {flag ? "Update dialogue" : "Create dialogue"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="conversion--background">
                            <div className="conversion--background--inner">
                                <form className="file--upload"
                                    style={bg ? { backgroundImage: `url(${bg})`, border: "none" } : null}
                                >
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={e => {
                                            if (e.target.files.length === 0) {
                                                setBg([])
                                                setFileUrl([])
                                            } else {
                                                setBg(URL.createObjectURL(e.target.files[0]));
                                                setFileUrl(e.target.files[0])
                                               
                                                
                                            }
                                        }}
                                    />
                                    {!bg && (
                                        <div className="add-video-icon">
                                            <img src={require("../../assets/images/plus.svg").default} alt="" />
                                            <span>{bg?.length !== 0
                                                ? trimFileName(!bg ? "Add Background" : bg.name)
                                                : "Add Background"
                                            }</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="proceed-btn-container">
                <div className="proceed-btn-group">
                   { slidefileID ? (<button disabled = {lessonConversation && lessonConversation.length == 0} className="btn-common btn-proceed" onClick={() => {
                        updateImage()
                    }}>Proceed</button>) :
                    (<button disabled = {lessonConversation && lessonConversation.length == 0} className="btn-common btn-proceed" onClick={() => {
                        createImage()
                    }}>Proceed</button>)

                }
                    <button
                        className="btn-common btn-cancel"
                        onClick={() => {
                            dispatch(closeModal({
                                isModalOpen: false,
                            }))
                        }}>
                        Cancel</button>
                </div>
            </div>
        </>
    )
}

export default connect(null)(IsLoadingHOC(AddConversion))
