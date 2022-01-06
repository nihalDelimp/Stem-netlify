import React, { useEffect, useState } from 'react'
import { connect, useDispatch ,useSelector } from 'react-redux'
import { createWeekLesson, getCourseData, updateCourseData } from '../../../../Redux/action/SiteAdmin'
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import IsLoadingHOC from '../../../../Components/IsLoadingHOC';

const Step1 = (props) => {

    const { createWeekLesson, updateCourseData, week, classCode, setLoading, id, setActiveStep } = props;
    const dispatch = useDispatch();
    const history = useHistory()
    const [state, setState] = useState({ course_name: "", course_desc: "" })
    const {coursedetails}  = useSelector(state => state.course)
    const {courseId}  = coursedetails ? coursedetails : {}
 
    useEffect(() => {
        if (id || courseId ) {
            getData()
        }
    }, [])

    const getData = async () => {
        setLoading(true)
        await dispatch(getCourseData(id || courseId ))
            .then(
                response => {
                    const { course_name, course_desc } = response.data
                    setState({
                        course_name,
                        course_desc
                    })
                    setLoading(false)
                },
                () => setLoading(false)
            )
            .catch(
                error => console.log(error)
            )
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    course_name: state.course_name ? state.course_name : "",
                    course_desc: state.course_desc ? state.course_desc : "",
                    class_code: classCode,
                    week_number: week
                }}
                onSubmit={async (values, actions) => {
                    const { setSubmitting, resetForm } = actions
                    const { course_name, course_desc } = values
                    if (!course_name) {
                        toast.error("Please enter course Title")
                        return
                    } else if (!course_desc) {
                        toast.error("Please enter course Description")
                        return
                    } else {
                        setSubmitting(true);
                        setLoading(true);
                        if (id || courseId) {
                            await updateCourseData(values, id || courseId )
                                .then(
                                    response => {
                                        toast.success(response.message)
                                        setLoading(false);
                                        setActiveStep(1)
                                    },
                                    error => console.log(error.response.data)
                                )
                                .catch(
                                    error => console.log(error)
                                )
                        } else {
                            await createWeekLesson(values)
                                .then(
                                    response => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        const saveData = {
                                            classCode: response.data.class_code,
                                            weekNumber: response.data.week_number,
                                            courseId: response.data.id,
                                        }
                                        resetForm()
                                        dispatch({
                                            type: "SAVE_COURSE_DATA",
                                            payload: saveData
                                        })
                                        setLoading(false);
                                        setActiveStep(1)
                                    },
                                    error => {
                                        toast.error(error.response.data.message)
                                        setSubmitting(false);
                                        setLoading(false);
                                    }
                                )
                                .catch(
                                    () => {
                                        setSubmitting(false);
                                    }
                                )
                        }
                    }
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                    values
                }) => (
                    <form className="form add--course" onSubmit={handleSubmit}>
                        <div className="form--item">
                            <label>Title</label>
                            <input
                                type="text"
                                name="course_name"
                                value={values.course_name}
                                onChange={handleChange}
                                placeholder="Type Title here" />
                        </div>
                        <div className="form--item">
                            <label>Description</label>
                            <textarea
                                name="course_desc"
                                value={values.course_desc}
                                onChange={handleChange}
                                placeholder="Type Description here"
                                style={{ height: "100px" }}></textarea>
                        </div>
                        <div className="" style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                type="submit"
                                className="btn btn-create-lesson btn-orenge"
                                 style={{ margin : "5px" }}
                                disabled={isSubmitting}
                            >{state.course_name && state.course_desc ? "Update Lesson" : "Create Lesson"}</button>
                            <button
                                type="button"
                                className="btn btn-create-lesson  "
                                style={{ margin : "5px" }}
                                onClick={() => {
                                history.push(`/classroom/${classCode}`)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default connect(null, { createWeekLesson, updateCourseData })(IsLoadingHOC(Step1))
