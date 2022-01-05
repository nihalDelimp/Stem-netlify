import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { getClassroomList } from '../../../Redux/action/SchoolAdmin'
import CreateRoom from './Create'
import DeleteClassroom from "./Delete";
const CreateNewClassroom = (props) => {
    const { setLoading } = props
    const [currentTab, setCurrentTab] = useState(1)
    const dispatch = useDispatch()
    const [classrooms, setClassrooms] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const [deletePopUp, setDeletePopUp] = useState(false)



    const ClassromTab = (index) => {
        setCurrentTab(index)
    }

    const getClassrooms = async () => {
        setLoading(true)
        await dispatch(getClassroomList())
            .then(
                response => {
                    setLoading(false)
                    console.log(response);
                    setClassrooms(response.data)
                },
                error => {
                    setLoading(false)
                    console.log(error.response.data);
                    setClassrooms([])
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    useEffect(() => {
        getClassrooms();
    }, [])


    const handlerRemove = (e) => {
        alert(e);
    }

    return (
        <div className="container">
            <div className="create--classrooms">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Classroom Management System</h2>
                        </div>
                    </div>
                </div>
                <CreateRoom />
                {
                    deletePopUp && <DeleteClassroom  getClassrooms = {getClassrooms} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />
                }

            </div>
            <div className="Current-classrooms">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title-sub">
                            <h2>Current classroom</h2>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="current-classrom-tab-header">
                            <div className="classroom-tabs">
                                {/* <ul>
                                        <li className={currentTab === 1 ? "active-tab" : " "} onClick={() => ClassromTab( 1 )}><span>Form 3</span></li>
                                        <li className={currentTab === 2 ? "active-tab" : " "} onClick={() => ClassromTab( 2 )}><span>Form 4</span></li>
                                        <li className={currentTab === 3 ? "active-tab" : " "} onClick={() => ClassromTab( 3 )}><span>Form 5</span></li>
                                        <li className={currentTab === 4 ? "active-tab" : " "} onClick={() => ClassromTab( 4 )}><span>Form 6</span></li>
                                    </ul> */}
                            </div>
                            <div className="current-classrom-filter">
                                <div className="shorting-btn">Sort by teacher</div>
                            </div>
                        </div>
                        <div className="current-classrom-tab-content-wrapper">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Class</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require("../../../assets/images/arrowdown.svg").default} />
                                                        <img alt="" src={require("../../../assets/images/arrowdown.svg").default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Size</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require("../../../assets/images/arrowdown.svg").default} />
                                                        <img alt="" src={require("../../../assets/images/arrowdown.svg").default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Progress</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require("../../../assets/images/arrowdown.svg").default} />
                                                        <img alt="" src={require("../../../assets/images/arrowdown.svg").default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Mean scores</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require("../../../assets/images/arrowdown.svg").default} />
                                                        <img alt="" src={require("../../../assets/images/arrowdown.svg").default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Assigned teacher</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require("../../../assets/images/arrowdown.svg").default} />
                                                        <img alt="" src={require("../../../assets/images/arrowdown.svg").default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <span>edit</span>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classrooms.map((classroom, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span>
                                                        {classroom.class_name[0]
                                                            ? classroom.class_name[0].class_name
                                                            : "NA"
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>{classroom.student_count}</span>
                                                </td>
                                                <td>
                                                    <span>{classroom.course_name}</span>
                                                </td>
                                                <td>
                                                    <span style={{ color: "#00D823" }}>78% (+2%)</span>
                                                </td>
                                                <td>
                                                    <Link
                                                        //  to={`/classroom/${classroom.teacher_id.user_id}`}
                                                        to={{
                                                            pathname: `/classroom/${classroom.teacher_id.user_id}`,
                                                            state: {
                                                                classCode: classroom.class_code,
                                                                classname: classroom.class_name,
                                                                size: classroom.student_count,
                                                                progress: classroom.course_name,
                                                                assginedteacher: classroom.teacher_name.name
                                                            }
                                                        }}
                                                        style={{
                                                            color: "#000",
                                                            fontWeight: "normal"
                                                        }}>{classroom.teacher_name.name}</Link>
                                                </td>
                                                <td>
                                                    <span>
                                                        <button className="btn-remove" onClick={() => {
                                                            setDeletePopUp(true)
                                                            setDeleteData({
                                                                classCode: classroom.class_code,

                                                            })
                                                        }}>Remove</button>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(CreateNewClassroom);