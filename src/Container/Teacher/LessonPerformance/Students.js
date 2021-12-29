import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import IsLoadingHOC from "../../../Components/IsLoadingHOC"
import { getClassroomStudents, deleteClassroomStudent } from '../../../Redux/action/Teacher'
import DeleteStudent from './deleteStudent'


const StudentsList = (props) => {

    const { setLoading } = props
    const dispatch = useDispatch()
    const params = useParams()
    const [students, setStudents] = useState([])
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [deleteData, setDeleteData] = useState({})


    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        setLoading(true)
        await dispatch(getClassroomStudents({
            class_code: params.id
        }))
            .then(
                response => {
                    let students = []
                    response.data.map((item) => {
                        students.push(
                            {
                                id: item.user_id,
                                name: item.users[0].name,
                            }
                        )
                    })
                    setStudents(students);
                    setLoading(false)
                },
                () => {
                    setLoading(false)
                    setStudents([])
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    const deleteStudent = async (id) => {
        setLoading(true)
        await dispatch(deleteClassroomStudent({ class_code: params.id }, id))
            .then(
                response => {
                    toast.success(response.message)
                    getStudents()
                },
                error => {
                    toast.error(error.response.data.message)
                    setLoading(false)
                }
            )
            .catch(
                error => console.log(error)
            )
    }


   

    return (
        <div className="classrooms-student">
            <div className="classrooms">
                {students.map((student, index) => (
                    <div className="class--name--wrapper" key={index}>
                        <div className="class--name">
                            <div className="class--number">
                                <h3>{student.name}</h3>
                            </div>
                            <div className="dots--icon"
                             onClick={() => {
                                setDeletePopUp( true )
                                setDeleteData( {
                                    classCode:  params.id ,
                                    id: student.id
                                    
                                })
                            }}
                            >

                                <span>Remove</span>
                            </div>
                        </div>
                    </div>
                ))}
                {deletePopUp && <DeleteStudent getStudents={getStudents} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}

            </div>
        </div>
    )
}

export default IsLoadingHOC(StudentsList)
