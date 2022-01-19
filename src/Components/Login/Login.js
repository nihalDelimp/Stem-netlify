import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '../Buttons'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../Redux/action/Auth';
import { toast } from "react-toastify"
import { Input } from '../Inputs';
import IsLoadingHOC from '../IsLoadingHOC';

const Login = ( props ) => {
    const { login, setLoading } = props
    const history = useHistory()
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>STEM Unicorn</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        if(!values.email){
                            toast.error("Email is required !")
                        }
                        else if (!values.email.match(mailformat)){
                            toast.error("Email address invalid !")
                        }
                        else if (!values.password){
                            toast.error("Password is required !")
                        }
                        else if (values.password.length<8){
                            toast.error("Password must be 8 chars long !")
                        }
                        else{
                        setLoading( true )
                        await login( values )
                            .then(
                                response => {
                                    const isApproved = response.data.user.is_approved
                                    setSubmitting( false );
                                    if(isApproved === "Y"){
                                        toast.success( response.message )
                                        history.push( "/" ) 
                                    }
                                    else{
                                        toast.success("You need to change the password")
                                        history.push( "/reset-password")
                                    }
                                    setLoading( false )
                                },
                                erroe => {
                                    toast.error( erroe.response.data.message );
                                    setSubmitting( false );
                                    setLoading( false )
                                }
                            )
                            .catch(
                                error => console.log( error )
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
                                    placeholder="EMAIL" />
                            </div>
                            <div className="form--item">
                                <Input
                                    type="password"
                                    name="password"
                                    className="form--input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="PASSWORD" />
                            </div>
                            <SubmitButton className="btn btn--submit" type="submit" disabled={isSubmitting}
                            >Enter</SubmitButton>
                        </form>
                    )}
                </Formik>


                <Link to="/signup">Sign up new account</Link>
                {/* <Link to="/invited-login">I have an invite link!</Link> */}
            </div>
        </div>
    )
}

export default connect( null, { login } )( IsLoadingHOC( Login ) )
