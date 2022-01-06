import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import IsLoadingHOC from "../../../../Components/IsLoadingHOC"
import {  deleteCourse  } from '../../../../Redux/action/SiteAdmin'


const Delete = ( props ) => {

    const { setLoading, deleteData, getCourse } = props
    // const { classCode, id } = deleteData
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

    const deleteCoursData = async () => {
        if ( checked ) {
        setLoading(true)
        await dispatch(deleteCourse(deleteData))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    setDeletePopUp( false )
                    getCourse();
                    
                },
                error => {
                    setLoading(false)
                    toast.success("course deleted successfully")
                    setDeletePopUp( false )
                    getCourse();
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
                <h3>Delete Lesson?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Are you sure you want to delete this lesson  ?</label>
                </div>
                <div className="btn--group">
                    <button className="delete" onClick={deleteCoursData} disabled={!checked}>Delete</button>
                    <button className="cancel" onClick={() => setDeletePopUp( false )}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC( Delete )
