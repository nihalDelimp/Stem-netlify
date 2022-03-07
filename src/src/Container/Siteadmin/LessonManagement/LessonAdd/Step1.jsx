import React, { useEffect, useState } from 'react'
import { connect, useDispatch} from 'react-redux'
import { createWeeklyCourses, getWeeklyCourses, updateWeeklyCourses } from '../../../../Redux/action/coursePlatform'
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import IsLoadingHOC from '../../../../Components/IsLoadingHOC';

const Step1 = (props) => {

    const { createWeeklyCourses, updateWeeklyCourses, week, course_code , course_id, setLoading, id, setActiveStep } = props;
    const dispatch = useDispatch();
    const history = useHistory()
    const [state, setState] = useState({ course_name: "", course_desc: "" })
    
 
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [])

    const getData = async () => {
        setLoading(true)
        await dispatch(getWeeklyCourses(id))
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
                    course_code:  course_code,
                    course_id : course_id ,
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
                        if (id) {
                            await updateWeeklyCourses(values, id )
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
                            await createWeeklyCourses(values)
                                .then(
                                    response => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        const saveData = {
                                            course_code: response.data.course_code,
                                            weekNumber: response.data.week_number,
                                            courseId: response.data.id,
                                            course_id : response.data.course_id
                                        }
                                        resetForm();
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
                                history.push(`/courses/${course_code}`)
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

export default connect(null, { createWeeklyCourses, updateWeeklyCourses })(IsLoadingHOC(Step1))
