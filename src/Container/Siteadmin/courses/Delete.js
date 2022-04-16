import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import IsloggedinHOC from "../../../Components/IsLoggedinHOC"
import { deleteCourseAction } from "../../../Redux/action/coursePlatform"

const DeleteCourse = ( props ) => {
    const { setLoading, deleteData, getCoursesList } = props
    const { course_code, id } = deleteData
    const { setDeletePopUp } = props
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
            setLoading( true )
            await dispatch( 
                deleteCourseAction(id))
                .then(
                    response => {
                        setLoading( false )
                        toast.success( response.message )
                        setDeletePopUp( false )
                        getCoursesList();
                    },
                    error => {
                        setLoading( false )
                        toast.error( error.response.data.message )
                    }
                )
                .catch(
                    error => console.log( error )
                )
        } else {
            toast.error( "Please check the checkbox to confirm" )
        }
    }

    return (
        <div className="popup" onClick={() => setDeletePopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Delete course ?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">I understand the deleted course will not be recovered, any record of course will permanently be removed from the server.</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteHandler} disabled={!checked}>Delete Course</button>
                    <button className="cancel" onClick={() => setDeletePopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(IsloggedinHOC(DeleteCourse))
