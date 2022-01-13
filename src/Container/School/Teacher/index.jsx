import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams,useLocation } from 'react-router-dom'
import { getSchoolTeacherClassroom } from '../../../Redux/action/SchoolAdmin'
import DeleteClassroom from '../Classroom/Delete'




const SchoolTeacher = () => {
     const [deleteData, setDeleteData] = useState( {} )
    const [deletePopUp, setDeletePopUp] = useState( false )
    const params = useParams()
    const dispatch = useDispatch();

     const location = useLocation()
    const { classCode, classname, size, progress, assginedteacher } = location.state


    const getTeacherClassroom = () => {
        dispatch( getSchoolTeacherClassroom( { user_id: params.id } ) )
            .then(
                response => {
                    console.log("response", response);
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
        getTeacherClassroom()
    }, [])


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
                   {
                    deletePopUp && <DeleteClassroom deleteData={deleteData} setDeletePopUp={setDeletePopUp} />
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
                        <div className="current-classrom-tab-content-wrapper">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Class</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                        <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Size</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                        <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Progress</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                        <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Mean scores</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                        <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="sort-th">
                                                    <span>Assigned teacher</span>
                                                    <span className="sort-icon">
                                                        <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                        <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default} />
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <span>edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                                <td>
                                                    <span>
                                                        {classname[0].class_name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>{size}</span>
                                                </td>
                                                <td>
                                                    <span>{progress}</span>
                                                </td>
                                                <td>
                                                    <span style={{ color: "#00D823" }}>78% (+2%)</span>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/classroom/${123}`}
                                                        style={{
                                                            color: "#000",
                                                            fontWeight: "normal"
                                                        }}>{assginedteacher}</Link>
                                                </td>
                                                <td>
                                                    <span>
                                                        <button className="btn-remove" onClick={() => {
                                                              setDeletePopUp( true )
                                                              setDeleteData( {
                                                                  classCode: classCode,
                                                             } )
                                                        }}>Remove</button>
                                                    </span>
                                                </td>
                                            </tr>
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

export default SchoolTeacher
