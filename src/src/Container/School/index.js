import React, { useState, useEffect } from 'react'
import plusIcon from "../../assets/images/plus.svg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import IsLoadingHOC from '../../Components/IsLoadingHOC'
import { IsloggedinHOC } from '../../Components/IsLoggedinHOC'
import { getTeacherAndSchoolAdmin ,getSchoolCodeAction } from '../../Redux/action/SchoolAdmin'
import DeleteTeacher from './deleteTeacher'

const SchoolAdminClassroom = (props) => {
    const { setLoading } = props;
    const role = useSelector(state => state.auth.user.user_type)
    const user_id = useSelector(state => state.auth.user.id)
    const school_code = useSelector(state =>state.course.school_code)
    const [isDotsActive, setDotIsActive] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [teacherListData, setTeacherListData] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const dispatch = useDispatch()

    const getTeacherAndSchoolAdminList = async () => {
        setLoading(true)
        await dispatch(getTeacherAndSchoolAdmin({school_code}))
            .then(
                response => {
                    setLoading(false)
                   const filterData  = response.data.filter(item => item.teachers.length >0)
                    setTeacherListData(filterData)
                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    const getSchoolCode = async() => {
       await dispatch( getSchoolCodeAction(user_id))
            .then( async response => {
                    const school_code = response.data.school_code
                  await dispatch({type :"SET_SCHOOL_CODE" , payload :school_code})
                },
                error => {
                    console.log( error.response.data )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getSchoolCode();
    }, [])

    useEffect(()=>{
        if(school_code){
            getTeacherAndSchoolAdminList();
        }
    },[school_code])

    const toUpperCaseName = (name) => {
        const upperName = name.charAt(0).toUpperCase() + name.slice(1)
        return upperName
    }

    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Dashboard</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid addclass-header">
                        <div className="grid-">
                            <div className="page--sub-title">
                                <ul>
                                    <li><span>Teachers and School Admin </span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid--">
                            <div className="addclass--ct">
                                {role === "SCHOOL_ADMIN" && (
                                    <div className="addclass--room-button">
                                        <Link to="/addTeacher" style={{ color: "#000", textDecoration: "none" }}  >
                                            <button className="addclasroom--btn">
                                                <span>Add Teacher/School Admin</span> <span className="button--icon">
                                                    <img src={plusIcon} alt="" /></span>
                                            </button>
                                        </Link>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="grid---">
                            <div className="classrooms">
                                {
                                    teacherListData  &&  teacherListData.length >0  ? (
                                        teacherListData.map((item, index) => (
                                            <div className="class--name--wrapper" key={index}>
                                                <div className="class--name">
                                                    <Link to = {`adminDetails/${item.user_id}`} className="class--number" >
                                                        <img src={require("../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{toUpperCaseName(item.teachers[0]?.name)}</h3>
                                                    </Link>

                                                    <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                        <img src={require("../../assets/images/3dots.svg").default} />
                                                        <div className="dots--drop--down">
                                                            <div className="dropdown--item">
                                                                <div className="dropdown--list">
                                                                    <ul>
                                                                        {/* <li ><span> Rename</span></li> */}
                                                                        <li
                                                                            onClick={() => {
                                                                                setDeletePopUp(true)
                                                                                setDeleteData({
                                                                                    id: item.user_id,
                                                                                    user_type : item.teachers[0]?.user_type
                                                                                })
                                                                            }}
                                                                        ><span> Delete </span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                            </div> 
                                        ))
                                    ):
                                    <div style={{
                                        height: "150px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gridColumn: "span 2"
                                    }}>
                                        <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Data found</h2>
                                    </div>
                                }
                                {deletePopUp && <DeleteTeacher getTeachersListData={getTeacherAndSchoolAdminList} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(IsloggedinHOC(SchoolAdminClassroom));
