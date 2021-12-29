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

    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>STEM Unicorn</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        setLoading( true )
                        await login( values )
                            .then(
                                response => {
                                    toast.success( response.message )
                                    setSubmitting( false );
                                    history.push( "/" )
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
                                    type="text"
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
                <Link to="/invited-login">I have an invite link!</Link>
            </div>
        </div>
    )
}

export default connect( null, { login } )( IsLoadingHOC( Login ) )
