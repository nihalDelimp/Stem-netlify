import { motion, AnimatePresence } from 'framer-motion'
import React,{useState,useEffect ,useRef} from 'react'
import { LogOut } from '../../../Redux/action/App'
import {useSelector ,useDispatch } from 'react-redux'
import { profileListUserDetails } from '../../../Redux/action/Auth'



const SettingSidebarStudent = () => {
    const dispatch = useDispatch();
    const [editPass, setEditPass] = useState(false);
    const [editDisplayName, setEditDisplayName] = useState(false);
    const [email, setEmail] = useState("");
    const passInputRef = useRef()
    const nameInputRef = useRef()
    const  EditProfile = () => {
        document.querySelector(".setting--user-form").classList.toggle('hide--form');
        document.querySelector(".change--student--profile").classList.toggle('hide--form');
    }

    const CloseBar = () => {
        document.querySelector(".setting--sidebar").classList.remove('activeSettingbar');
    }


    const listProfileData = () => {
        dispatch(profileListUserDetails())
            .then(
                response => {
                    setEmail(response.data.email)
                    nameInputRef.current.value = response.data.name
                    passInputRef.current.value = "........"
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
        listProfileData();
    })

    return(

        <>
           <div className='grid'>
                    <div className='grid---'>
                        <div className='setting--sidebar '>
                            <div className='setting-title'>
                                <h3>Setting</h3>
                                <h4>
                                    <img src={require("../../../assets/images/times.svg").default} onClick={() => CloseBar()}></img>
                                </h4>
                            </div>
                            <div className='student--profile-sidebar'>
                                <div className='student--profile'>
                                    <img src={require("../../../assets/images/student_profile.png").default}></img>
                                </div>
                                <button className='edit--profile-img' onClick={() => EditProfile()}>edit</button>
                            </div>
                            <div className='change--student--profile hide--form'>
                                <h2>Select display photo</h2>
                                <div className='select--display-photo '>
                                    <div className='select--display-name'>
                                    <img src={require("../../../assets/images/student_profile.png").default}></img>
                                    <h3>Alyssa</h3>
                                    </div>
                                    <div className='select--display-name'>
                                    <img src={require("../../../assets/images/student_profile.png").default}></img>
                                    <h3>Alyssa</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='setting--user-form'>
                                
                            <form>
                                <div className='setting--user-form-inner'>
                                    <div className='register--email'>
                                        <label>Registered email</label>
                                        <input type="email" value={email} disabled ></input>
                                    </div>
                                    <div className='inputGroup register--password'>
                                        <label>Password</label>
                                        <input type="password" ref={passInputRef}  ></input>
                                        <div className='edit-email'>
                                            {editPass ?
                                                <button style={{ color: 'blue', borderBottomColor: "blue" }} type='button' onClick={() => {
                                                    setEditPass(false)
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

                                        <input type="name" ref={nameInputRef} ></input>
                                        <div className='edit-email'>
                                            {editDisplayName ?
                                                <button style={{ color: 'blue', borderBottomColor: "blue" }} type='button' onClick={() => {
                                                    setEditDisplayName(false)
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
                                <button className='logout-btn' onClick={() => dispatch(LogOut())}  >Logout</button>
                                <button className='help-btn'>Help</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </>

    )

}

export default SettingSidebarStudent;