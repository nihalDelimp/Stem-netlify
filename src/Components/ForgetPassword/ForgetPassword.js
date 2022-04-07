import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '../Buttons'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { forgotPassword } from '../../Redux/action/Auth';
import { toast } from "react-toastify"
import { Input } from '../Inputs';
import IsLoadingHOC from '../IsLoadingHOC';

const ForgetPassword = ( props ) => {
    const { forgotPassword, setLoading } = props
    const history = useHistory()
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>STEM Unicorn</h1>
                <Formik
                    initialValues={{ email: ''}}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        if(!values.email){
                            toast.error("Email is required !")
                        }
                        else if (!values.email.match(mailformat)){
                            toast.error("Email address invalid !")
                        }
                        else{
                        setLoading( true )
                        await forgotPassword( values )
                            .then(
                                response => {
                                    setSubmitting( false );
                                        toast.success( response.message )
                                        history.push( "/login")
                                        setLoading( false )
                                },
                                error => {
                                    toast.error(error.data.message);
                                    setSubmitting( false )
                                    setLoading( false )
                                }
                            )
                            .catch(
                                error => {
                                console.log( error )
                                setLoading( false )
                              
                                }
                            )
                        }
                    }}>

                    {( {
                        isSubmitting,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values
                    } ) => (
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form--item">
                                <Input
                                    type="email"
                                    name="email"
                                    className="form--input"
                                    onChange={handleChange}
                                    value={values.email}
                                    onBlur={handleBlur}
                                    placeholder="Email address" />
                            </div>
                           
                            <SubmitButton className="btn btn--submit" type="submit" disabled={isSubmitting}>
                                Submit
                            </SubmitButton>
                        </form>
                    )}
                </Formik>
                <Link  style={{ textDecoration: "none" }} to="/login">Back</Link>
            </div>
        </div>
    )
}

export default connect( null, { forgotPassword } )( IsLoadingHOC( ForgetPassword ) )
