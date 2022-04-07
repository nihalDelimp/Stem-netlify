import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { getClassroomLessons } from "../../../Redux/action/SchoolAdmin";


const LessonList = (props) => {
    const { setLoading } = props;
    const dispatch = useDispatch();
    const params = useParams()
    const [lessons, setLessons] = useState([]);
    
    useEffect(() => {
        getLessons()
    }, [])

    const getLessons = async () => {
        setLoading(true);
        await dispatch(getClassroomLessons({
            class_code: params.id
        }))
            .then(
                response => {
                    setLessons(response.data);
                    setLoading(false)
                    dispatch({ type: "SET_TEACHER_LESSONS", payload: response.data})
                    dispatch({ type: "SET_COURSE_CODE", payload: response.data[0].course_code})
                    response.data && response.data.map(item =>{
                        if(item.lesson_locked === false){
                            dispatch({ type: "SET_ACTIVE_WEEK_NUMBER", payload: item.week_number })
                        }
                    })
                },
                () =>
                    setLoading(false)
            )
            .catch(
                error => console.log(error)
            );
    }


    return (
        <div className="classrooms-student">
            <div className="classrooms">
                {  lessons && lessons.length > 0 ?
                    lessons.map((lesson, index) =>  ( 
                        <div className="class--name--wrapper" key={index}>
                            <div className="class--name">
                                <div className="class--number">
                                    <h3>{lesson.course_name}</h3>
                                </div>
                                <div className="dots--icon" style={{ color: lesson.lesson_locked === false ? "green" : "#808080" }} >
                                    <span>
                                    {lesson.lesson_locked === false ?
                                     "Activated" : "Inspect"}</span>
                                    
                                </div>
                            </div>
                        </div>
                    )):
                    (
                        <div style={{
                            height: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gridColumn: "span 2"
                        }}>
                            <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Lessons found </h2>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default IsLoadingHOC(LessonList)
