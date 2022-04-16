import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import IsLoadingHOC from '../../Components/IsLoadingHOC'
import IsloggedinHOC from '../../Components/IsLoggedinHOC'
import { getTeacherandSchoolAdminDetails } from '../../Redux/action/SchoolAdmin'

const TeacherAndSchoolAdminDetails = (props) => {
    const { setLoading } = props;
    const [displayName, setDisplsayName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [roll, setRoll] = useState("")
    const [classDetails, setClassdetails] = useState([]);
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();


    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        setLoading(true)
        await dispatch(getTeacherandSchoolAdminDetails({ id: params.id }))
            .then(
                response => {
                    setLoading(false)
                    const details = response.data.user_details
                    const teacherClassDetail = response.data.teacher_class_details ? response.data.teacher_class_details : []
                    setDisplsayName(details.name)
                    setContactEmail(details.email)
                    setClassdetails(teacherClassDetail)
                    setUserType(details.user_type === "TEACHER" ? "Teacher's " : "School admin's")
                    setRoll(details.user_type)

                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    const toUpperCaseName = (name) => {
        const upperName = name.charAt(0).toUpperCase() + name.slice(1)
        return upperName
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
                                        <span>{userType} details </span>
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
                                                <label for="fname">Name</label>
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
                                                <label for="email1">Email</label>
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

                            {roll === "TEACHER" &&
                                <div className="container">
                                    <section className="body--inner-wrapper">
                                        <div className="grid">
                                            <div className="grid---"  >
                                                <div style={{
                                                    margin: "15px",
                                                    fontSize: "22px",
                                                    display: "flex",
                                                    fontWeight: "normal"
                                                }}>
                                                    <h3>Classroom Details </h3>
                                                </div>

                                                <div className="classrooms">
                                                    {
                                                        classDetails && classDetails.length > 0 ?
                                                            classDetails.map((item, index) => (
                                                                <div className="class--name--wrapper" key={index}>
                                                                    <div className="class--name">
                                                                        <Link style={{ padding: "12px", minWidth: "165px" }} className="class--number"
                                                                            to={{
                                                                                pathname: `/classroom/${item.class_code}`,
                                                                                state: {
                                                                                    classroom: item.class_name,
                                                                                    id: item.id,
                                                                                    classCode: item.class_code,
                                                                                    user_id: item.user_id
                                                                                }
                                                                            }}
                                                                        >
                                                                            <img src={require("../../assets/images/polygon_green.svg").default} alt="img" />
                                                                            <h3>{toUpperCaseName(item.class_name)}</h3>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )) :
                                                            <div style={{
                                                                height: "100px",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                gridColumn: "span 3"
                                                            }}>
                                                                <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No class found</h2>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='send--invite-section'>
                        <div className='send--invite-wrapper'>
                            <button type='button' style={{ backgroundColor: "#808080" }} onClick={() => history.push("/")}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default IsLoadingHOC(IsloggedinHOC(TeacherAndSchoolAdminDetails));