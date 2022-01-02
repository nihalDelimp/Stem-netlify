import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { getClassroomStudents, deleteClassroomStudent } from '../../../Redux/action/Teacher'
import DeleteStudent from './deleteStudent'


const StudentsList = ( props ) => {

    const { setLoading } = props
    const dispatch = useDispatch()
    const params = useParams()
    const [students, setStudents] = useState( [] )
    const location = useLocation()
    const { classroom, classcode } = location.state
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [deleteData, setDeleteData] = useState({})

   
    console.log( "studentClass", location.state )

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
                    response.data.map( ( item ) => {
                        students.push(
                            {
                                id: item.user_id,
                                name: item.users[0].name,
                            }
                        )
                    } )
                    setStudents( students );
                    setLoading( false )
                },
                () => {
                    setLoading( false )
                    setStudents( [] )
                }
            )
            .catch(
                error => console.log( error )
            )
    }

    return (
        <div className="classrooms-student">
            
            <div className="classrooms">
                {students.map( ( student, index ) => (
                    <div className="class--name--wrapper" key={index}>
                        <div className="class--name">
                            <div className="class--number">
                                <Link
                                    to={{
                                        pathname: "/classroomsStudentdata",
                                        state: {
                                            name: student.name,
                                            classs: classroom,
                                            classcode: "CAN6WZ08"
                                        }
                                    }}
                                >
                                    <h3>{student.name}</h3>
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
                ) )}
                {deletePopUp && <DeleteStudent getStudents={getStudents} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}

            </div>
        </div>
    )
}

export default IsLoadingHOC( StudentsList )
