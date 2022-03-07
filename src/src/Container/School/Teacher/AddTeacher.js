import React, { useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendinvite } from '../../../Redux/action/SchoolAdmin'

const AddTeacher = () => {
    const [displayName, setDisplsayName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [userType, setUserType] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const school_code = useSelector(state =>state.course.school_code)

    const submitHandler = async () => {
        if (!userType) {
            toast.error("Position is required")
        }
        else if (!displayName) {
            toast.error("Display name is required")
        }
        else if (!contactEmail) {
            toast.error("Contact email is required")
        }
        else if (!contactEmail.match(mailformat)) {
            toast.error("Contact email address invalid")
        }
        else {
            await dispatch(sendinvite({
                email: contactEmail,
                name: displayName,
                user_type: userType,
                school_code: school_code,
            }
            ))
                .then(
                    response => {
                        toast.success("Mail sent successfully")
                        history.push('/')
                    },
                    error => {
                        toast.error(error.response.data.message);
                    }
                )
                .catch(
                    error => console.log(error)
                )
        }
    }
    return (
        <>
            <div className="container">
                <div className="add--teacger--section">
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/" style={{ color: "#000", textDecoration: "none" }} >
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <span>Add Teacher/School admin</span>
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
                                        <div className="custom-radio-btn-teacher">
                                            <input
                                                type="radio"
                                                id="redio1"
                                                name="answer"
                                                value="TEACHER"
                                                onChange={e => setUserType(e.target.value)} >
                                            </input>
                                            <label htmlFor="redio3">Teacher</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="radio"
                                                id="redio1"
                                                value="SCHOOL_ADMIN"
                                                name="answer"
                                                onChange={e => setUserType(e.target.value)}>
                                            </input>
                                            <label htmlFor="redio3">School admin</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='display-teacher--name'>
                                    <form>
                                        <div className='teacher-form-wrapper'>
                                            <div className='form-group'>
                                                <label htmlFor="fname">Display name</label>
                                                <input type="text"
                                                    id="fname"
                                                    name="fname"
                                                    value={displayName}
                                                    placeholder='Name'
                                                    onChange={e => setDisplsayName(e.target.value)} >
                                                </input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="email1">Contact email</label>
                                                <input type="email"
                                                    id="email1"
                                                    name="email1"
                                                    value={contactEmail}
                                                    placeholder='Email'
                                                    onChange={e => setContactEmail(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="email1">School code</label>
                                                <input type="text"
                                                    id="schoolCode"
                                                    name="schoolCode"
                                                    defaultValue={school_code}
                                                    placeholder='School code'
                                                    disabled
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
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">Assign later</label>
                                        </div>
                                    </div>
                                    <div className='existing--classroom-title'>
                                        <h3>OR assigning to exisiting classroom</h3>
                                    </div>
                                    <div className='existing--classroom-class'>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
                                            <input type="checkbox" id="redio3" name="answer"></input>
                                            <label for="redio3">3A</label>
                                        </div>
                                        <div className="custom-radio-btn-teacher">
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
                            <button type='button' className='btn---cancel' onClick={() => history.push("/")}  >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddTeacher;