import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '../Buttons'
import { Input } from '../Inputs'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { signup } from '../../Redux/action/Auth'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../IsLoadingHOC'


const Signup = ( props ) => {

    const { signup, setLoading } = props;
    const history = useHistory()

    const formik = useFormik( {
        initialValues: {
            class_code: "",
            name: "",
            email: "",
            password: "",
            user_type: "STUDENT"
        },
        onSubmit: async values => {
            setLoading( true )
            await signup( values )
                .then(
                    response => {
                        toast.success( response.message )
                        history.push( "/" )
                        setLoading( false )
                    },
                    error => {
                        if ( error.response.data.errors ) {
                            error.response.data.errors.forEach( error => {
                                toast.error( error.name && error.name )
                                toast.error( error.password && error.password )
                                toast.error( error.email && error.email )
                            } )
                        } else {
                            toast.error( error.response.data.message )
                        }
                        setLoading( false )
                    }
                )
                .catch(
                    error => console.log( error )
                )
        }
    } )

    const { values, handleChange, handleSubmit } = formik


    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>Sign up</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form--item">
                        <Input
                            type="text"
                            name="class_code"
                            className="form--input"
                            value={values.class_code}
                            onChange={handleChange}
                            placeholder="CODE" />
                    </div>
                    <div className="form--item">
                        <Input
                            type="text"
                            name="name"
                            className="form--input"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="NAME" />
                    </div>
                    <div className="form--item">
                        <Input
                            type="email"
                            name="email"
                            className="form--input"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="EMAIL" />
                    </div>
                    <div className="form--item">
                        <Input
                            type="password"
                            name="password"
                            className="form--input"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="PASSWORD" />
                    </div>
                    <SubmitButton className="btn btn--submit" type="submit">Enter</SubmitButton>
                </form>
                <Link to="/login">Back</Link>
            </div>
        </div>
    )
}

export default connect( null, { signup } )( IsLoadingHOC( Signup ) )
