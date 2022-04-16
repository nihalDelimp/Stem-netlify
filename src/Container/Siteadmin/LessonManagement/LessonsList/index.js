import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { Link, useParams} from 'react-router-dom'
import IsLoadingHOC from '../../../../Components/IsLoadingHOC';
import { IsloggedinHOC } from '../../../../Components/IsLoggedinHOC'
import { getAllCourseAvailable } from "../../../../Redux/action/coursePlatform";
import DeleteLesson from './delete'

const LessonsListNew = (props) => {
    const { setLoading } = props;
    const dispatch = useDispatch();
    const params = useParams();
    const [lessonsData, setLessonsData] = useState([])
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [deleteData, setDeleteData] = useState({})
    const {course_id} = useSelector(state => state.course)

    useEffect(() => {
        dispatch({ type: "REMOVE_COURSE_DATA" })
        getLessonList()
    }, [])


    const getLessonList = async () => {
        setLoading(true)
        await dispatch(getAllCourseAvailable({ course_code: params.id ,course_id }))
            .then(
                response => {
                    setLessonsData(response.data)
                    setLoading(false)
                },
                error => {
                    console.log(error);
                    setLoading(false)
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Course Management System</h2>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="grid---">
                        <div className="page--sub-title">
                            <ul>
                                <li>
                                    <Link to="/courses" style={{ color: "#000", textDecoration: "none" }}>
                                        <span>Course</span>
                                    </Link>
                                </li>
                                <li>
                                    <span>Lessons</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lesson--week">
                    <div className="grid">
                        <div className="grid---">
                            <div className="lesson--week-container">
                            {lessonsData.length !== 0
                                    ? lessonsData.map((item, index) => (
                                        item.course.length === 0 ? (
                                            <div className="lesson-week-wrapper" key={index}>

                                                <div className="week-counter">
                                                    <h4>Week {`${index + 1}`}</h4>
                                                </div>
                                                <Link
                                                    to={{
                                                        pathname: '/lesson-add-weekly',
                                                        state: {
                                                            week: index + 1,
                                                            course_code: params.id
                                                        }
                                                    }}
                                                    className="lesson--week-contant">
                                                    <div className="add-lesson-content">
                                                        <img src={require("../../../../assets/images/plus.svg").default} alt="" />
                                                        <h4><span>Add lesson</span> <span>content</span></h4>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="lesson-week-wrapper" key={index}>
                                                <div className="week-counter">
                                                    <h4>Week {`${index + 1}`}</h4>
                                                </div>
                                                <div className="lesson--week-contant">
                                                    <Link to={{
                                                        pathname: '/lesson-add-weekly',
                                                        state: {
                                                            week: index + 1,
                                                            course_code: params.id,
                                                            id: item.course[0].id
                                                        }
                                                    }}>
                                                        <div className="week-bg" style={{ backgroundColor: "#FFF8F8" }}></div>
                                                        <h5 className="slide--no">{item.course[0].course_name}</h5>
                                                    </Link>
                                                    <span className="slide-delete-icon" onClick={() => {
                                                        setDeletePopUp(true)
                                                        setDeleteData({
                                                            id: item.course[0].id,
                                                            lesson_locked: item.course[0].lesson_locked
                                                        })
                                                    }}
                                                    >
                                                        <img src={require("../../../../assets/images/times.svg").default} alt="" />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    ))
                                    : null
                                }
                                {deletePopUp && <DeleteLesson getLessonList={getLessonList} deleteData={deleteData} setDeletePopUp={setDeletePopUp} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(IsloggedinHOC(LessonsListNew));
