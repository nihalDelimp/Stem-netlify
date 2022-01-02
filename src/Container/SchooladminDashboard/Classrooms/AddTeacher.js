import { motion, AnimatePresence } from 'framer-motion'
import React,{useState,useEffect, Component} from 'react'
import { connect, useSelector ,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendinvite } from '../../../Redux/action/SchoolAdmin'

const AddTeacher = () => {
    const [displayName, setDisplsayName] = useState( "" );
    const [contactEmail, setContactEmail] = useState( "" );
    const [userType, setUserType] = useState('');
    const [schooladmin, setadminPosition] = useState(false )
    const dispatch = useDispatch();
    const history = useHistory()
    console.log("schooladmin",schooladmin)


    const submitHandler = async () => {
        if(!userType){
            toast.error( "Position is required" )
        }
        else if (!displayName){
            toast.error( "Display name is  required" )
        }
        else if (!contactEmail){
            toast.error( "Contact email is required" )
        }
        else{
        await dispatch (sendinvite( {
            email: contactEmail,
            name: displayName,
            user_type: userType
        }
        ))
                .then(
                    response => {
                        toast.success( response.message )
                        history.push('/')
                       
                    },
                    error => {
                        toast.error( error.message )
                    }
                )
                .catch(
                    error => console.log( error )
                )
    }
}
    

    return(

        <>
            <div className="container">
                <div className="add--teacger--section">
                     <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                    <Link to = "/"  style={{ color: "#000", textDecoration: "none" }} >
                                        <span>Dashboard</span>
                                        </Link>
                                        </li>
                                    <li>
                                        <span>Add teacher/site admin</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   <div className='add--teacher-wrapper'>
                       <div className='add--teacher-inner'>
                           <div className='teacher--details'>
                                <div className='teacher--positions'>
                                    <div className='pos--title'>
                                        <h3>Position</h3>
                                    </div>
                                    <div className='assign-pos'>
                                        <div class="custom-radio-btn-teacher">
                                            <input
                                                type="radio"
                                                id="redio1"
                                                name="answer"
                                                value="TEACHER"
                                                onChange={e => setUserType( e.target.value )}
                                            >
                                                
                                             </input>
                                            <label for="redio3">Teacher</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="radio"
                                                id="redio1"
                                                value="SCHOOL_ADMIN"
                                                name="answer"
                                                onChange={e => setUserType( e.target.value )}
                                            >
                                                
                                                </input>
                                            <label for="redio3">School admin</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='display-teacher--name'>
                                    <form>
                                        <div className='teacher-form-wrapper'>
                                            <div className='form-group'>
                                                <label for="fname">Display name</label>
                                                <input type="text"
                                                    id="fname"
                                                    name="fname"
                                                    value={displayName}
                                                    placeholder='Name'
                                                    onChange={e => setDisplsayName( e.target.value )}
                                                >
                                                   
                                                    </input>
                                            </div>
                                            <div className='form-group'>
                                                <label for="email1">Contact email</label>
                                                <input type="email"
                                                    id="email1"
                                                    name="email1"
                                                    value={contactEmail}
                                                    placeholder='Email'
                                                    onChange={e => setContactEmail( e.target.value )}
                                                ></input>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                           {/* <div className='teacher--assign--classroom'>
                           <div className='teacher--positions'>
                                    <div className='pos--title'>
                                        <h3>Assigning to classroom(s)</h3>
                                    </div>
                                    <div className='assign-pos'>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">Assign later</label>
                                        </div>
                                    </div>
                                    <div className='existing--classroom-title'>
                                        <h3>OR assigning to exisiting classroom</h3>
                                    </div>
                                    <div className='existing--classroom-class'>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div class="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             */}

                       </div>
                   </div>
                   <div className='send--invite-section'>
                        <div className='send--invite-wrapper'>
                            <button type='button' className='btn-org' onClick={submitHandler}>Send invite</button>
                            <button type='button' className='btn---cancel' onClick={()=>  history.push( "/" )}  >Cancel</button>
                        </div>
                   </div> 
                </div>
            </div>
        </>

    )

}

export default AddTeacher;