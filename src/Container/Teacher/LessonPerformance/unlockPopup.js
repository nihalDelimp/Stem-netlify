import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import {  unlockedLesson } from '../../../Redux/action/Teacher'


const UnlockPopUp = ( props ) => {
    const { setLoading, setunlockPopUp, lessonData, getLessons} = props
    const { week_number, lesson_locked, id, class_code } = lessonData
    const [checked, setChecked] = useState( false )
    const dispatch = useDispatch()
    const params = useParams()
    const handlerChecked = event => {
        if ( event.target.checked ) {
            setChecked( true )
        } else {
            setChecked( false )
        }
    }

    const unlockLessonHandle = async () => {
        if ( checked ) {
        setLoading(true)
        await dispatch(unlockedLesson( id ,{ class_code: class_code , week_number : week_number }))
            .then(
                response => {
                    setLoading(false)
                    toast.success("Course Activated successfully ")
                    setunlockPopUp( false )
                    getLessons();
               
                },
                error => {
                    toast.error(error.response.data.message)
                    setLoading(false)
                }
            )
            .catch(
                error => console.log(error)
            )

        } else {
            toast.error( "Please check the checkbox to confirm" )
        }
    }


    return (
        <div className="popup" onClick={() => setunlockPopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Please Confirm </h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">If you wnat to activate this, the rest all will be deactivate ?</label>
                </div>
                <div className="btn--group">
                    <button className="create"  onClick={unlockLessonHandle}  disabled={!checked}>Confirm</button>
                    <button className="cancel" onClick={() => setunlockPopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC( UnlockPopUp )
