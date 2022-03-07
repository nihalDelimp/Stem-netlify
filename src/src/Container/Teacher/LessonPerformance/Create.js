import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { createStudent } from "../../../Redux/action/Teacher";
import {useParams } from 'react-router-dom'
import { getClassroomStudents } from '../../../Redux/action/Teacher'



const CreateStudent = (props) => {
    const { setLoading, setCreatePopUp } = props;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {

    }, [])


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
                    dispatch({ type: "GET_STUDENT_DATA_SUCESS", payload: students } )
                    setLoading( false )
                },
                () => {
                    setLoading( false )
                }
            )
            .catch(
                error => console.log( error )
            )
    }




    return (
        <div className="popup" onClick={() => setCreatePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Create New  Student</h3>
                <Formik
                    initialValues={{
                        email: "",
                        class_code: params.id,
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const { email, class_code } = values;
                        if (!email) {
                            toast.error("Email address is required")
                            setSubmitting(false);
                          
                            return;
                        }
                        else if (!email.match(mailformat)) {
                            toast.error("Email address is not valid");
                            setSubmitting(false);
                            return;
                        }
                        else if (!class_code) {
                            toast.error("Class Code is required")
                            setSubmitting(false);
                            return;
                        }
                         else {
                            setLoading(true)
                            await dispatch(createStudent(values))
                                .then(
                                    (response) => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        setCreatePopUp(false);
                                        setLoading(false);
                                        getStudents();
                                    },
                                    error => {
                                       toast.error(error.response.data.message)
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
                                <label htmlFor="name" >Email</label>
                                <input
                                    type="email"
                                    id="email1"
                                    name="email"
                                    required
                                    value={values.email}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="date" >Class code</label>
                                <input
                                    type="text"
                                    id="class_code"
                                    name="class_code"
                                    value={values.class_code}
                                    onChange={handleChange}
                                    disabled />
                            </div>
                            <div className="btn--group">
                                <button className="create" onClick={handleSubmit} disabled={isSubmitting}>Create Student</button>
                                <button className="cancel" onClick={() => setCreatePopUp(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div >
        </div >
    )
}

export default IsLoadingHOC(CreateStudent)
