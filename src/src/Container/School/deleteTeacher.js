import { useState } from "react"
import { useDispatch} from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../Components/IsLoadingHOC"
import {  deleteTeacherAction } from '../../Redux/action/SchoolAdmin'


const DeleteTeacher = ( props ) => {
    const { setLoading, deleteData, getTeachersListData ,setDeletePopUp } = props
    const { id , user_type } = deleteData
    const [checked, setChecked] = useState( false )
    const dispatch = useDispatch()
    const handlerChecked = event => {
        if ( event.target.checked ) {
            setChecked( true )
        } else {
            setChecked( false )
        }
    }

    const deleteHandler = async () => {
        if ( checked ) {
        setLoading(true)
        await dispatch(deleteTeacherAction(id))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    setDeletePopUp( false )
                    getTeachersListData(); 
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
        <div className="popup" onClick={() => setDeletePopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Delete {user_type === "SCHOOL_ADMIN" ? "School admin" : "Teacher"} ?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">I understand the deleted {user_type === "SCHOOL_ADMIN" ? "School admin" : "Teacher"} will not be recovered, any record will be permanently removed from the server.</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteHandler} disabled={!checked}>Delete </button>
                    <button className="cancel" onClick={() => setDeletePopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC( DeleteTeacher )
