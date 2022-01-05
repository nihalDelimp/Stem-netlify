import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { deleteClassroom } from "../../../Redux/action/SchoolAdmin"

const DeleteClassroom = (props) => {
    const {
        setLoading,
        deleteData,
        getClassroom
    } = props
    const { classCode, id } = deleteData
    const { setDeletePopUp } = props
    const [checked, setChecked] = useState(false)
    const [deleteStep, setDeleteStep] = useState(0)

    const dispatch = useDispatch()
    const handlerChecked = event => {
        if (event.target.checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    const deleteClass = async () => {
        if (checked) {
            setLoading(true)
            await dispatch(deleteClassroom({ class_code: classCode }))
                .then(
                    response => {
                        setLoading(false)
                        toast.success(response.message)
                        setDeletePopUp(false)
                        getClassroom()
                    },
                    error => {
                        setLoading(false)
                        toast.error(error.response.data.message)
                    }
                )
                .catch(
                    error => console.log(error)
                )
        } else {
            toast.error("Please check the checkbox to confirm")
        }
    }


    return (
        <div className="popup" onClick={() => setDeletePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Delete classroom?</h3>

                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={checked}
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">{!deleteStep ? "Are you sure you want to continue?" : "I understand the deleted classroom will not be recovered, any record of lessons will permanently be removed from the server."}</label>
                </div>
                <div className="btn--group">
                    <button
                        className="delete"
                        onClick={() => {
                            setDeleteStep(1)
                            setChecked(false)
                            if (deleteStep) {
                                deleteClass()
                            }
                        }}
                        disabled={!checked}>Delete classroom</button>
                    <button className="cancel" onClick={() => setDeletePopUp(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(DeleteClassroom)
