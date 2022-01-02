import { motion, AnimatePresence } from 'framer-motion'
import React,{useState,useEffect} from 'react'
// import { connect, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Modal from '../../Components/Modal'
// import { getModuleData } from '../../redux/action/App'

const SettingSidebarStudent = () => {
    const  EditProfile = () => {
        document.querySelector(".setting--user-form").classList.toggle('hide--form');
        document.querySelector(".change--student--profile").classList.toggle('hide--form');
    }

    const CloseBar = () => {
        document.querySelector(".setting--sidebar").classList.remove('activeSettingbar');
    }

    return(

        <>
           <div className='grid'>
                    <div className='grid---'>
                        <div className='setting--sidebar activeSettingbar'>
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
                                            <input type="email" value="example@stemunicorn.com"></input>
                                        </div>
                                        <div className='inputGroup register--password'>
                                            <label>Password</label>
                                            <input type="email" placeholder='.......'></input>
                                            <div className='edit-email'>
                                                <button type='button'>edit</button>
                                            </div>
                                        </div>
                                        <div className='inputGroup register--name'>
                                            <label>Display name</label>
                                            <input type="name" value="Chris Wong"></input>
                                            <div className='edit-email'>
                                                <button type='button'>edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='user--logout-section'>
                                <button className='logout-btn'>Logout</button>
                                <button className='help-btn'>Help</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </>

    )

}

export default SettingSidebarStudent;