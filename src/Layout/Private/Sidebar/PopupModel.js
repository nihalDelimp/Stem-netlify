import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { resetPassword } from '../../../Redux/action/Auth';


const PopUpModel = (props) => {
    const { setLoading, SetModel, currentPass, setCurrentPass } = props
    const { user_password, user } = useSelector(state => state.auth)
    const { id } = user ? user : {}
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
        if (!currentPass) {
            toast.error("Password can not be empty!")
        }
        else if (currentPass.length < 8) {
            toast.error("Password must be 8 chars long!")
        }

        else {
            setLoading(true)
            await dispatch(resetPassword(id, { password: currentPass }))
                .then(
                    response => {
                        setLoading(false)
                        toast.success(response.message)
                        dispatch({ type: "USER_PASSWORD", payload: currentPass });
                        SetModel(false);
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
        <div className="popup" onClick={() =>{ 
            setCurrentPass(user_password)
            SetModel(false)}}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Please Confirm ?</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handlerChecked}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Are you sure you want to change your password ?</label>
                </div>
                <div className="btn--group">
                    <button className="update" onClick={changeHandler} disabled={!checked}>Update</button>
                    <button className="cancel" onClick={() => {
                        setCurrentPass(user_password)
                        SetModel(false)
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(PopUpModel)
