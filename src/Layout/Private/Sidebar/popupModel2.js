import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { updateUsersProfile } from '../../../Redux/action/Auth'


const PopUpModel2 = (props) => {
    const { setLoading, SetModel2, user_name, current_name, setCurrentName, profileData } = props
    const user_id = useSelector(state => state.auth.user.id)

    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const handlerChecked = event => {
        if (event.target.checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    const changeHandler = async () => {
        if (current_name.length < 5) {
            toast.error("Name must be at least 5 chars long")
        }
        else {
            setLoading(true)
            await dispatch(updateUsersProfile({ name: current_name }))
                .then(
                    response => {
                        setLoading(false)
                        toast.success(response.message)
                        SetModel2(false)
                        profileData();

                    },
                    error => {
                        toast.error(error.response.data.message)
                        setLoading(false)
                    }
                )
                .catch(
                    error => console.log(error)
                )
        }
    }


    return (
        <div className="popup" onClick={() => {
            setCurrentName(user_name)
            SetModel2(false)
        }}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Please Confirm ?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Are you sure you want to change your name ?</label>
                </div>
                <div className="btn--group">
                    <button className="update" onClick={changeHandler} disabled={!checked}>Update</button>
                    <button className="cancel" onClick={() => {
                        setCurrentName(user_name)
                        SetModel2(false)
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(PopUpModel2)
