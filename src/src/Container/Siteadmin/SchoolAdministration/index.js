import React, { useState, useEffect } from 'react'
import plusIcon from "../../../assets/images/plus.svg"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSchoolAdminList } from '../../../Redux/action/SiteAdmin'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { useParams } from "react-router-dom"
import CreateSchoolAdmin from './Create'
import DeleteSchoolAdmin from './Delete'
import UpdateSchoolAdmin from './EditAdmin'


const SchoolAdministrations = (props) => {
    const { setLoading } = props;
    const [isDotsActive, setDotIsActive] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [createPopUp, setCreatePopUp] = useState(false)
    const [updatePopUp, setUpdatePopUp] = useState(false)
    const [schoolAdminData, setSchoolsAdminData] = useState([])
    const [deleteData, setDeleteData] = useState({})
    const [updateData, setUpdateData] = useState({})
    const dispatch = useDispatch()
    const params = useParams()

    const getAllSchoolAdmin = async () => {
        setLoading(true)
        await dispatch(getSchoolAdminList({ school_code: params.id }))
            .then(
                response => {
                    setLoading(false)
                    const adminData = response.data
                    const filterData = adminData && adminData.filter(item => item.users.length > 0)
                    setSchoolsAdminData(filterData)
                },
                () => setLoading(false)
            )
            .catch(error => {
                console.log(error)
                setLoading(false)
            }
            )
    }

    useEffect(() => {
        getAllSchoolAdmin();

    }, [])


    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>School Administrations Management System</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid addclass-header">
                        <div className="grid-">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/school" style={{ color: "#000", textDecoration: "none" }}>
                                            <span>School</span>
                                        </Link>
                                    </li>
                                    <li><span> Administrators </span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid--">
                            <div className="addclass--ct">
                                <div className="addclass--room-button">
                                    <button className="addclasroom--btn" onClick={() => setCreatePopUp(true)}>
                                        <span>Add School Admin</span> <span className="button--icon">
                                            <img src={plusIcon} alt="" /></span>
                                    </button>
                                    {createPopUp &&
                                        <CreateSchoolAdmin
                                            setCreatePopUp={setCreatePopUp}
                                            getAllSchoolAdmin={getAllSchoolAdmin}
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
                                    schoolAdminData && schoolAdminData.length > 0 ? 
                                        schoolAdminData.map((item, index) => (
                                        <div className="class--name--wrapper" key={index}>
                                            <div className="class--name">
                                                <Link className="class--number"
                                                    to={{
                                                        pathname: `/school-admin-details/${item.user_id}`,
                                                        state: {
                                                            school_code: params.id
                                                        }
                                                    }}
                                                >
                                                    <img src={require("../../../assets/images/polygon_green.svg").default} alt="" />
                                                    <h3>{item.users[0]?.name}</h3>
                                                </Link>
                                                <button onClick={() => setDotIsActive(!isDotsActive)} className="dots--icon">
                                                    <img src={require("../../../assets/images/3dots.svg").default} />
                                                    <div className="dots--drop--down" >
                                                        <div className="dropdown--item"  >
                                                            <div className="dropdown--list" >
                                                                <ul >
                                                                    <li
                                                                        onClick={() => {
                                                                            setUpdatePopUp(true)
                                                                            setUpdateData({
                                                                                school_code: item.school_code,
                                                                                id: item.user_id
                                                                            })
                                                                        }}
                                                                    ><span>Edit</span></li>
                                                                    <li
                                                                        onClick={() => {
                                                                            setDeletePopUp(true)
                                                                            setDeleteData({
                                                                                school_code: item.school_code,
                                                                                id: item.user_id
                                                                            })
                                                                        }}
                                                                    ><span>Delete</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>) 
                                 )
                                :
                                (<div style={{
                                    height: "150px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gridColumn: "span 2"
                                }}>
                                    <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No School Admin Found</h2>
                                </div>)
                                }
                                {deletePopUp && <DeleteSchoolAdmin getAllSchoolAdmin={getAllSchoolAdmin} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                                {updatePopUp && <UpdateSchoolAdmin getAllSchoolAdmin={getAllSchoolAdmin} updatedData={updateData} setUpdatePopUp={setUpdatePopUp} />}


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(SchoolAdministrations);
