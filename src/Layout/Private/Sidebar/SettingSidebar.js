import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../../../Redux/action/App'
import { profileListUserDetails } from '../../../Redux/action/Auth'
import { toast } from 'react-toastify'
import PopupModel from './PopupModel'
import PopupModel2 from './popupModel2'
import showPwdImg from '../../../assets/images/show-password.svg';
import hidePwdImg from '../../../assets/images/hide-password.svg';


const SettingSidebar = () => {
    const user_password = useSelector(state => state.auth.user_password)
    const [editPass, setEditPass] = useState(false);
    const [currentPass, setCurrentPass] = useState("");
    const [current_name, setCurrentName] = useState("");
    const [user_name, setUserName] = useState(null);
    const [model, SetModel] = useState(false);
    const [model2, SetModel2] = useState(false);
    const [editDisplayName, setEditDisplayName] = useState(false);
    const [email, setEmail] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const passInputRef = useRef()
    const nameInputRef = useRef()
    const dispatch = useDispatch();


    const CloseBar = () => {
        document.querySelector(".setting--sidebar").classList.remove('activeSettingbar');
    }


    const profileData = () => {
        dispatch(profileListUserDetails())
            .then(
                response => {
                    setEmail(response.data.email)
                    setCurrentPass(user_password)
                    setCurrentName(response.data.name)
                    setUserName(response.data.name)
                },
                (error) => {
                    console.log(error);
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    useEffect(() => {
        profileData();
    }, [user_password])


    return (
        <>
            <div className='grid'>
                <div className='grid---'>
                    <div className='setting--sidebar '>
                        <div className='setting-title'>
                            <h3>Setting</h3>
                            <h4><img src={require("../../../assets/images/times.svg").default} onClick={() => CloseBar()}></img></h4>
                        </div>
                        <div className='setting--user-form'>
                            <h2>Account information</h2>
                            <form>
                                <div className='setting--user-form-inner'>
                                    <div className='register--email'>
                                        <label>Registered email</label>
                                        <input type="email" value={email} disabled ></input>
                                    </div>
                                    <div className='inputGroup register--password'>
                                        <label>Password</label>
                                        <div className="pwd-container">
                                            <input name='currentPass' value={currentPass} type={isRevealPwd ? "text" : "password"} ref={passInputRef}
                                                onChange={(e) => setCurrentPass(e.target.value)}
                                            ></input>
                                            <img
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => {
                                                    setIsRevealPwd(prevState => !prevState)
                                                    passInputRef.current.focus()
                                                }
                                                }
                                            />
                                        </div>

                                        <div className='edit-email'>
                                            {editPass ?
                                                <button style={{ color: 'blue', borderBottomColor: "blue" }} type='button' onClick={() => {
                                                    if (user_password === currentPass) {
                                                        setEditPass(false)
                                                    }
                                                    else if (!currentPass) {
                                                        toast.error("Password can not be empty!")
                                                        setCurrentPass(user_password)
                                                        setEditPass(false)
                                                    }
                                                    else {
                                                        SetModel(true)
                                                        setEditPass(false)
                                                    }


                                                }} >save</button>
                                                :
                                                <button type='button' onClick={() => {
                                                    passInputRef.current.focus()
                                                    setEditPass(true)
                                                }}
                                                >edit</button>}
                                        </div>
                                    </div>
                                    <div className='inputGroup register--name'>
                                        <label>Display name</label>
                                        <div className="pwd-container">
                                            <input type="name" ref={nameInputRef} value={current_name}
                                                onChange={(e) => setCurrentName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className='edit-email'>
                                            {editDisplayName ?
                                                <button style={{ color: 'blue', borderBottomColor: "blue" }} type='button' onClick={() => {
                                                    if (current_name == user_name) {
                                                        setEditDisplayName(false)
                                                    }
                                                    else if (!current_name) {
                                                        toast.error("User name can not be empty!")
                                                        setCurrentName(user_name)
                                                        setEditDisplayName(false)
                                                    }
                                                    else {
                                                        SetModel2(true)
                                                        setEditDisplayName(false)
                                                    }

                                                }} >save</button>
                                                :
                                                <button type='button' onClick={() => {
                                                    nameInputRef.current.focus()
                                                    setEditDisplayName(true)
                                                }}
                                                >edit</button>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='user--logout-section'>
                            <button className='logout-btn' onClick={() => dispatch(LogOut())} >Logout</button>
                            <button className='help-btn'>Help</button>
                        </div>
                    </div>
                </div>
            </div>
            {model && <PopupModel SetModel={SetModel} currentPass={currentPass} setCurrentPass={setCurrentPass} />}
            {model2 && <PopupModel2 current_name={current_name} user_name={user_name} SetModel2={SetModel2} setCurrentName={setCurrentName} profileData={profileData} />}
        </>
    )

}
export default SettingSidebar;