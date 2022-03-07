import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory , useLocation , useParams } from 'react-router-dom'
import {getSchoolAdminDetail } from '../../../Redux/action/SiteAdmin'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { useDispatch } from 'react-redux'


const SchoolAdminDetails = (props) => {
    const{setLoading} = props

    const [displayName, setDisplsayName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const dispatch = useDispatch();
     const  location =  useLocation();
     const history = useHistory();
     const params = useParams();

     const{school_code} = location.state ? location.state : {}
    
     const getSchoolAdminDetailData = async () => {
        setLoading(true)
        await dispatch(getSchoolAdminDetail(params.id))
            .then(
                response => {
                    setLoading(false)
                   const {name , email} = response.data
                   setDisplsayName(name);
                   setContactEmail(email)
                    
                },
                (error) => setLoading(false)
            )
            .catch( error => console.log(error))
    }

    useEffect(() => {
        if (params.id) {
            getSchoolAdminDetailData();
        }
        if(!school_code){
            history.push("/school")
        }
    }, [])


    return (
        <>
            <div className="container">
                <div className="add--teacger--section">
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/school" style={{ color: "#000", textDecoration: "none" }} >
                                            <span>School</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = {`/school/${school_code}`} style={{ color: "#000", textDecoration: "none" }} >
                                            <span>School Admin</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <span>School Admin Details</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='add--teacher-wrapper'>
                        <div className='add--teacher-inner'>
                            <div className='teacher--details'>
                                <div className='display-teacher--name'>
                                    <form>
                                        <div className='teacher-form-wrapper'>
                                            <div className='form-group'>
                                                <label >Name</label>
                                                <input type="text"
                                                    id="fname"
                                                    name="fname"
                                                    value={displayName}
                                                    placeholder='Name'
                                                    disabled
                                                    onChange={e => setDisplsayName(e.target.value)}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label >Email</label>
                                                <input type="email"
                                                    id="email1"
                                                    name="email1"
                                                    value={contactEmail}
                                                    placeholder='Email'
                                                    disabled
                                                    onChange={e => setContactEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='send--invite-section'>
                        <div className='send--invite-wrapper'>
                            <button type='button' style={{ backgroundColor: "#808080" }} onClick={() => history.push(`/school/${school_code}`)}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IsLoadingHOC(SchoolAdminDetails);