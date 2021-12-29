import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import {  deleteClassroomStudent } from '../../../Redux/action/Teacher'


const DeleteStudent = ( props ) => {

    const { setLoading, deleteData, getStudents } = props
    const { classCode, id } = deleteData
    const { setDeletePopUp } = props
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

    const deleteStudent = async () => {
        if ( checked ) {
        setLoading(true)
        await dispatch(deleteClassroomStudent({ class_code: classCode }, id))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    setDeletePopUp( false )
                    getStudents();
                    
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
                <h3>Delete Student?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">I understand the deleted Student will not be recovered</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteStudent} disabled={!checked}>Delete Student</button>
                    <button className="cancel" onClick={() => setDeletePopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC( DeleteStudent )
