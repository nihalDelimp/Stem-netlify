import React, { useState, useEffect } from 'react'
import plusIcon from "../../../assets/images/plus.svg"
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getSchoolListAction } from '../../../Redux/action/SiteAdmin'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import CreateSchool from './Create'
import EditSchool from './EditSchool'
import DeleteClassroom from './Delete'


const AllSchools = (props) => {
    const { setLoading } = props;
    const [isDotsActive, setDotIsActive] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)
    const [editPopUp, setEditPopUp] = useState(false)
    const [schoolsData, setSchoolsData] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const [editData, setEditData] = useState({})
    const dispatch = useDispatch()

    const getAllSchool = async () => {
        setLoading(true)
        await dispatch(getSchoolListAction())
            .then(
                response => {
                    setLoading(false)
                    setSchoolsData(response.data)
                },
                () => setLoading(false)
            )
            .catch(error => console.log(error)
            )}

    useEffect(() => {
         getAllSchool();

    }, [])

    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>School Management System</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid addclass-header">
                        <div className="grid-">
                            <div className="page--sub-title">
                                <ul>
                                    <li><span>School's Name</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid--">
                            <div className="addclass--ct">
                                    <div className="addclass--room-button">
                                        <button className="addclasroom--btn" onClick={() => setCreatePopUp(true)}>
                                            <span>Add New School</span> <span className="button--icon">
                                                <img src={plusIcon} alt="" /></span>
                                        </button>
                                        {createPopUp &&
                                            <CreateSchool
                                                setCreatePopUp={setCreatePopUp}
                                                getAllSchool={getAllSchool}
                                            />
                                        }
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="classrooms">
                                {
                                    schoolsData && schoolsData.length > 0 ? (
                                        schoolsData.map((item, index) => (
                                            <div className="class--name--wrapper" key={index}>
                                                <div className="class--name">
                                                    <Link 
                                                     to={{
                                                        pathname: `/school/${item.school_code}`,
                                                        state: {
                                                            classroom: item.school_name,
                                                            id: item.id,
                                                            classCode: item.school_code,
                                                        }
                                                    }}

                                                     className="class--number" >
                                                        <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                                        <h3>{item.school_name}</h3>
                                                    </Link>
                                                    <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                        <img src={require("../../../assets/images/3dots.svg").default} />
                                                        <div className="dots--drop--down" >
                                                            <div className="dropdown--item"  >
                                                                <div className="dropdown--list" >
                                                                    <ul >
                                                                    <li
                                                                            onClick={() => {
                                                                                setEditPopUp(true)
                                                                                setEditData({
                                                                                    school_code: item.school_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Edit School</span></li>
                                                                        <li
                                                                            onClick={() => {
                                                                                setDeletePopUp(true)
                                                                                setDeleteData({
                                                                                    school_code: item.school_code,
                                                                                    id: item.id
                                                                                })
                                                                            }}
                                                                        ><span> Delete School</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) :
                                        (<div style={{
                                            height: "150px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gridColumn: "span 2"
                                        }}>
                                            <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>School Data Not Found</h2>
                                        </div>)
                                }
                                {deletePopUp && <DeleteClassroom getAllSchool={getAllSchool} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                                {editPopUp && <EditSchool setEditPopUp={setEditPopUp} getAllSchool={getAllSchool} editData={editData} />
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(AllSchools);
