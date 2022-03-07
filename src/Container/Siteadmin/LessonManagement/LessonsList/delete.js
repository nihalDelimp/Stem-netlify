import { useState } from "react"
import { useDispatch,} from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../../Components/IsLoadingHOC"
import { deleteCourse } from '../../../../Redux/action/coursePlatform'


const DeleteLesson = (props) => {
    const { setLoading, deleteData, getLessonList } = props
    const { lesson_locked, id } = deleteData
    const { setDeletePopUp } = props
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const handlerChecked = event => {
        if (event.target.checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    const deleteHandler = async () => {
        if (checked) {
            setLoading(true)
            await dispatch(deleteCourse(id))
                .then(
                    response => {
                        console.log("response" ,response)
                        setLoading(false)
                        toast.success(response.message)
                        setDeletePopUp(false)
                        getLessonList();
                    },
                    error => {
                        console.log("Error" ,error)
                        setLoading(false)
                        toast.success("Course deleted successfully")
                        setDeletePopUp(false)
                        getLessonList();
                    }
                )
                .catch((error) => {
                    setLoading(false)
                     console.log(error)}
                )          

        } else {
            toast.error("Please check the checkbox to confirm")
        }
    }

    return (
        <div className="popup" onClick={() => setDeletePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Delete Lesson?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        {lesson_locked === false ? "This lesson has been published by teacher. if you remove this lesson student will not read able for this class"
                            : "I understand the deleted lesson will not be recovered, any record of this lesson will be permanently removed from the server."}</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteHandler} disabled={!checked}>Delete</button>
                    <button className="cancel" onClick={() => setDeletePopUp(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(DeleteLesson)
