import React, { useState, useEffect } from 'react'
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import IsloggedinHOC from '../../../Components/IsLoggedinHOC';
import { updateCourseAction, getCourseDetailAction } from "../../../Redux/action/coursePlatform";

const EditCourse = (props) => {
    const { setLoading, setEditPopUp, getCoursesList, editData } = props;
    const { course_code, id } = editData
    const [courseDetails, setCourseDetails] = useState({})
    const { course_name, course_desc } = courseDetails ? courseDetails : {}
    const dispatch = useDispatch()

    const getCourseDetails = async () => {
        await dispatch(getCourseDetailAction(id))
            .then(
                response => {
                    setCourseDetails(response.data)
                    setLoading(false)
                },
                (error) => setLoading(false)
            )
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (id) {
            getCourseDetails();
        }
    }, [setCourseDetails])

    return (
        <div className="popup" onClick={() => setEditPopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Edit Course details</h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        course_name: course_name ? course_name : "",
                        course_desc: course_desc ? course_desc : "",
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        setLoading(true)
                        const { course_name, course_desc } = values;
                        if (!course_name) {
                            toast.error("Course name is required")
                            setSubmitting(false);
                            setLoading(false);
                            return;
                        } else if (!course_desc) {
                            toast.error("Description is required")
                            setSubmitting(false);
                            setLoading(false);
                            return;
                        } else {
                            await dispatch(updateCourseAction(id, values))
                                .then(
                                    (response) => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        setEditPopUp(false);
                                        setLoading(false);
                                        getCoursesList();
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setLoading(false);
                                    }
                                )
                                .catch(
                                    error => console.log(error)
                                )
                        }
                    }}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <form action="" className="form" onSubmit={handleSubmit}>
                            <div className="form--item">
                                <label htmlFor="name" >Name</label>
                                <input
                                    type="text"
                                    id="course_name"
                                    name="course_name"
                                    placeholder="Enter course name"
                                    value={values.course_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >Description</label>
                                <textarea
                                    type="text"
                                    id="description"
                                    name="course_desc"
                                    placeholder="Enter description"
                                    value={values.course_desc}
                                    onChange={handleChange} />
                            </div>
                            <div className="btn--group">
                                <button className="update" onClick={handleSubmit} disabled={isSubmitting}>Update</button>
                                <button className="cancel" onClick={() => setEditPopUp(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
        </div >
    )
}

export default IsLoadingHOC(IsloggedinHOC(EditCourse))
