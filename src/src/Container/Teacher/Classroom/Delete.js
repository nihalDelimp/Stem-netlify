import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { deleteSiteAdminClassroom } from "../../../Redux/action/SiteAdmin"
import { deleteTeacherClassroom } from "../../../Redux/action/Teacher"


const DeleteClassroom = ( props ) => {
    const { user_type } = useSelector( state => state.auth.user )

    const { setLoading, deleteData, getClassroom } = props
    const { classCode, id } = deleteData
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

    const deleteClassroom = async () => {
        if ( checked ) {
            setLoading( true )
            await dispatch( user_type === "SITE_ADMIN"
                ? deleteSiteAdminClassroom(id)
                : deleteTeacherClassroom( { class_code: classCode }, id ) )
                .then(
                    response => {
                        setLoading( false )
                        toast.success( response.message )
                        setDeletePopUp( false )
                        getClassroom()
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
                <h3>Delete classroom?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">I understand the deleted classroom will not be recovered, any record of lessons will permanently be removed from the server.</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteClassroom} disabled={!checked}>Delete classroom</button>
                    <button className="cancel" onClick={() => setDeletePopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC( DeleteClassroom )
