import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import IsLoadingHOC from '../../../../Components/IsLoadingHOC';
import { authAxios } from '../../../../Config/axios';
import { getAllLCourse } from "../../../../Redux/action/SiteAdmin";


const LessonsList = ( props ) => {
    const { setLoading } = props;

    const dispatch = useDispatch()

    const params = useParams()

    const [CourseData, setCourseData] = useState( [] )

    useEffect( () => {
        dispatch( { type: "REMOVE_COURSE_DATA" } )
        getCourse()
    }, [] )


    const getCourse = async () => {
        setLoading( true )
        await dispatch( getAllLCourse( { class_code: params.id } ) )
            .then(
                response => {
                    setCourseData( response.data.data )
                    setLoading( false )
                },
                error => {
                    console.log( error );
                    setLoading( false )
                }
            )
            .catch( error => console.log( error ) )
    }

    //code for demo purpose
    const deleteCourse = async ( id ) => {
        var result = window.confirm( "Are you sure to delete this course?" );
        if ( result ) {
            authAxios().delete( `/site-admin/delete-class-courses/${id}` )
                .then( res => {
                    console.log( "course deleted successfully" )
                    window.location.reload();
                } )
        }
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
                                {CourseData.length !== 0
                                    ? CourseData.map( ( item, index ) => (
                                        item.course.length === 0 ? (
                                            <div className="lesson-week-wrapper" key={index}>

                                                <div className="week-counter">
                                                    <h4>Week {`${index + 1}`}</h4>
                                                </div>
                                                <Link
                                                    to={{
                                                        pathname: '/lesson-add',
                                                        state: {
                                                            week: index + 1,
                                                            classCode: params.id
                                                        }
                                                    }}
                                                    className="lesson--week-contant">
                                                    <div className="add-lesson-content">
                                                        <img src={require( "../../../../assets/images/plus.svg" ).default} alt="" />
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
                                                        pathname: '/lesson-add',
                                                        state: {
                                                            week: index + 1,
                                                            classCode: params.id,
                                                            id: item.course[0].id
                                                        }
                                                    }}>
                                                        <div className="week-bg" style={{ backgroundColor: "#FFF8F8" }}></div>
                                                        <h5 className="slide--no">{item.course[0].course_name}</h5>
                                                    </Link>
                                                    <span className="slide-delete-icon" onClick={() => deleteCourse( item.course[0].id )}>
                                                        <img src={require( "../../../../assets/images/times.svg" ).default} alt="" />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    ) )
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC( LessonsList )
