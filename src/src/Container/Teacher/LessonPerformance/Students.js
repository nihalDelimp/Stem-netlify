import { useEffect, useState } from "react"
import { useDispatch ,useSelector } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { getClassroomStudents } from '../../../Redux/action/Teacher'
import DeleteStudent from './deleteStudent'


const StudentsList = ( props ) => {

    const { setLoading } = props
    const dispatch = useDispatch()
    const params = useParams()
    const location = useLocation()
    const { classroom, classcode } = location.state
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [deleteData, setDeleteData] = useState({})
    const studentData = useSelector(state => state.app.studentData)
    

    useEffect( () => {
        getStudents()
    }, [] )

    const getStudents = async () => {
        setLoading( true )
        await dispatch( getClassroomStudents( {
            class_code: params.id
        } ) )
            .then(
                response => {
                    let students = []
                    setLoading( false );
                    response.data.map( ( item ) => {
                        students.push(
                            {
                                id: item.user_id,
                                name: item.users[0].name,
                            }
                        )
                    } )
                    dispatch({ type: "GET_STUDENT_DATA_SUCESS", payload: students } )
                    
                },
                () => {
                    setLoading( false )
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    const  toUpperCaseName = (name) =>{
        const upperName = name.charAt(0).toUpperCase() + name.slice(1)
         return upperName
      }

    return (
        <div className="classrooms-student">
            
            <div className="classrooms">
                {studentData && studentData.length > 0 ? studentData.map( ( student, index ) => (
                    <div className="class--name--wrapper" key={index}>
                        <div className="class--name">
                            <div className="class--number">
                                <Link
                                    to={{
                                        pathname: `/performance-report/${student.id}`,
                                        state: {
                                            StudentName: student.name,
                                            classsName: classroom,
                                            classCode: params.id,
                                            total_student : studentData.length,
                                            student_rank : index+1,
                                        }
                                    }}
                                >
                                    <h3>{toUpperCaseName(student.name)}</h3>
                                </Link>
                            </div>
                            <div className="dots--icon"
                                onClick={() => {
                                    setDeletePopUp( true )
                                    setDeleteData( {
                                        classCode: params.id,
                                        id: student.id

                                    } )
                                }}
                            >

                                <span>Remove</span>
                            </div>
                        </div>
                    </div>
                ) ):
                <div style={{
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gridColumn: "span 2"
                }}>
                    <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>Students not found </h2>
                </div>
                }
                {deletePopUp && <DeleteStudent getStudents={getStudents} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}

            </div>
        </div>
    )
}

export default IsLoadingHOC( StudentsList )
