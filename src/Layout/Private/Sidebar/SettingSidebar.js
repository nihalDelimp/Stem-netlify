import { motion, AnimatePresence } from 'framer-motion'
import React, {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { LogOut } from '../../../Redux/action/App'
import { Link, useHistory, useParams } from 'react-router-dom'
import {profileListUserDetails } from '../../../Redux/action/Auth'
import { toast } from 'react-toastify'

const SettingSidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [editPass, setEditPass] = useState(true)
    const [editDisplayName, setEditDisplayName] = useState(false)
    const [password , setPassword]  = useState(".........")
    const [email , setEmail]  = useState("")
    const [displayName ,  SetDisplayName]  = useState("Chris Wong")

    const CloseBar = () => {
         document.querySelector(".setting--sidebar").classList.remove('activeSettingbar');
    }


    let nameElement1 = null;
    let nameElement2 = null;

   const  listProfileData = () =>{
    dispatch( profileListUserDetails() )
            .then(
                response => {
                   // setPassword(response.data.password)
                    SetDisplayName(response.data.name)
                    setEmail(response.data.email)    
                },
                (error) => {
                    console.log( error );
                }
            )
            .catch(
                error => console.log( error )
            )
   }


    useEffect(  ()  => {
        listProfileData();
    })


    const handlerRenameClassroom = async (e) => {
    //    await dispatch(renameClassroom({ class_name: e }, history.location.state.id))
    //         .then(
    //             response => {
    //                 toast.success(response.message)
    //             },
    //             error => {
    //                 console.log(error.response.data);
    //             }
    //         )
    //         .catch(
    //             error => console.log(error)
    //         )
    }
  
    return(

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
                                            <input type="email" value= {email} disabled ></input>
                                        </div>
                                        <div className='inputGroup register--password'>
                                            <label>Password</label>


                                            {/* <input type="email" value="......"></input> */}
                                            <span
                                            style={{ padding: "0.25rem 0.5rem" }}
                                            ref={(element) => {
                                                nameElement1 = element
                                                if (nameElement1) {
                                                    nameElement1.focus();
                                                }
                                            }}
                                            contentEditable={`${editPass}`}
                                            suppressContentEditableWarning={true}
                                            autoFocus={true}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setEditPass(false)
                                                    if (e.target.innerHTML !== password) {
                                                        handlerRenameClassroom(e.target.innerHTML)
                                                    }
                                                }
                                            }}
                                            onBlur={e => {
                                                setEditPass(false);
                                                if (e.target.innerHTML !== password) {
                                                    handlerRenameClassroom(e.target.innerHTML)
                                                }
                                                setPassword(e.target.innerText)
                                            }}
                                        >
                                            {password}
                                        </span>

                                            <div className='edit-email'>
                                                {editPass ?
                                                 <button style={{color : 'blue' , borderBottomColor : "blue" }}   type='button' onClick={() => {
                                                     setEditPass(false) }} >save</button>
                                                     :
                                                 <button type='button' onClick={() =>{
                                                    setEditPass(true)}}
                                                  >edit</button>}

                                            </div>
                                        </div>
                                        <div className='inputGroup register--name'>
                                            <label>Display name</label>

                                            {/* <input type="name" value="Chris Wong"></input> */}
                                            <span
                                            style={{ padding: "0.25rem 0.5rem" }}
                                            ref={(element) => {
                                                nameElement2 = element
                                                if (nameElement2) {
                                                    nameElement2.focus();
                                                }
                                            }}
                                            contentEditable={`${editDisplayName}`}
                                            suppressContentEditableWarning={true}
                                            autoFocus={true}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setEditDisplayName(false)
                                                    if (e.target.innerHTML !== displayName ) {
                                                        handlerRenameClassroom(e.target.innerHTML)
                                                    }
                                                }
                                            }}
                                            onBlur={e => {
                                                setEditDisplayName(false);
                                                if (e.target.innerHTML !== displayName) {
                                                    handlerRenameClassroom(e.target.innerHTML)
                                                }
                                                SetDisplayName(e.target.innerText)
                                            }}
                                        >
                                            {displayName}
                                        </span>
                                            <div className='edit-email'>
                                            {editDisplayName ?
                                                 <button  style={{color : 'blue' , borderBottomColor : "blue" }}   type='button' onClick={() => {
                                                    setEditDisplayName(false) }} >save</button>
                                                     :
                                                 <button type='button' onClick={() =>{
                                                    setEditDisplayName(true)}}
                                                  >edit</button>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='user--logout-section'>
                                <button className='logout-btn' onClick={()=> dispatch(LogOut())} >Logout</button>
                                <button className='help-btn'>Help</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </>

    )

}

export default SettingSidebar;