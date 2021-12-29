import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { getClassroomLessons } from "../../../Redux/action/Teacher";


const LessonList = ( props ) => {
    const { setLoading } = props;
    const dispatch = useDispatch();
    const params = useParams()
    const [lessons, setLessons] = useState( [] );

    useEffect( () => {
        getLessons()
    }, [] )

    const getLessons = async () => {
        setLoading( true );
        await dispatch( getClassroomLessons( {
            class_code: params.id
        } ) )
            .then(
                response => {
                    setLessons( response.data )
                    setLoading( false )
                },
                () =>
                    setLoading( false )
            )
            .catch(
                error => console.log( error )
            );
    }

    return (
        <div className="classrooms-student">
            <div className="classrooms">
                {
                    lessons.map( ( lesson, index ) => (
                        <div className="class--name--wrapper" key={index}>
                            <div className="class--name">
                                <div className="class--number">
                                    <h3>{lesson.course_name}</h3>
                                </div>
                                <div className="dots--icon">
                                    <span>Inspect</span>
                                </div>
                            </div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default IsLoadingHOC( LessonList )
