import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { createStudent } from "../../../Redux/action/Teacher";
import { Link, useHistory, useParams } from 'react-router-dom'


const CreateStudent = ( props ) => {
    const { setLoading, setCreatePopUp, getClassroom } = props;
    const dispatch = useDispatch()
    const history = useHistory();
    const params = useParams()

    useEffect(()=>{

    },[])

    

    return (
        <div className="popup" onClick={() => setCreatePopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Create New  Student</h3>
                <Formik
                    initialValues={{
                        email: "",
                        class_code: params.id,
                    }}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        setSubmitting( true );
                        setLoading( true )
                        const { email, class_code } = values;
                        if ( !email ) {
                            toast.error( "Email is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else if ( !class_code ) {
                            toast.error( "Class Code is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else {
                            await dispatch( createStudent( values ) )
                                .then(
                                    () => {
                                        toast.success( "Student created successfully" )
                                        setSubmitting( false );
                                        setCreatePopUp( false );
                                        setLoading( false );
                                        getClassroom();
                                    },
                                    error => {
                                        if ( Array.isArray( error.response.data.errors ) ) {
                                            error.response.data.errors.map( error => (
                                                toast.error( error.class_name && error.class_name ),
                                                toast.error( error.description && error.description )
                                            ) )
                                        } else {
                                            toast.error( error.response.data.message )
                                        }
                                        setSubmitting( false );
                                        setLoading( false );
                                    }
                                )
                                .catch(
                                    error => console.log( error )
                                )
                        }
                    }}
                >
                    {( { values, handleChange, handleSubmit, isSubmitting } ) => (
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
                                <button className="cancel" onClick={() => setCreatePopUp( false )}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div >
        </div >
    )
}

export default IsLoadingHOC( CreateStudent )
