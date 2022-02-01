import React, { useState, useEffect } from 'react'
import plusIcon from "../../assets/images/plus.svg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import IsLoadingHOC from '../../Components/IsLoadingHOC'
import { getTeacherList } from '../../Redux/action/SchoolAdmin'
import DeleteTeacher from './deleteTeacher'

const SchoolAdminClassroom = (props) => {
    const { setLoading } = props;
    const role = useSelector(state => state.auth.user.user_type)
    const [isDotsActive, setDotIsActive] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [teacherListData, setTeacherListData] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const dispatch = useDispatch()

    const getTeachersListData = async () => {
        setLoading(true)
        await dispatch(getTeacherList())
            .then(
                response => {
                    setLoading(false)
                    setTeacherListData(response.data)
                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getTeachersListData();
    }, [])

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
                                    teacherListData && (
                                        teacherListData.map((item, index) => (
                                            <div className="class--name--wrapper" key={index}>
                                                <div className="class--name">
                                                    <Link to = {`adminDetails/${item.id}`} className="class--number" >
                                                        <img src={require("../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{toUpperCaseName(item.name)}</h3>
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
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Delete Teacher</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                            </div> 
                                        ))
                                    )
                                }
                                {deletePopUp && <DeleteTeacher getTeachersListData={getTeachersListData} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(SchoolAdminClassroom);
