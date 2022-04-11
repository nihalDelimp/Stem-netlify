import React , {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '../Buttons'
import { Input } from '../Inputs'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { signup } from '../../Redux/action/Auth'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../IsLoadingHOC'
import { useSelector } from 'react-redux';




const Signup = ( props ) => {
    const { signup, setLoading } = props;
    const history = useHistory()
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const token = useSelector( state => state.auth.token )


    const formik = useFormik( {
        initialValues: {
            class_code: "",
            name: "",
            email: "",
            password: "",
            user_type: "STUDENT"
        },
        onSubmit: async values => {

            if(!values.class_code){
                toast.error("Class code is required !")
            }
            else if (!values.name){
                toast.error("Name is required !")
            }
          else if(!values.email){
                toast.error("Email is required !")
            }
            else if (!values.email.match(mailformat)){
                toast.error("Email address invalid !")
            }
            else if (!values.password){
                toast.error("Password is required !")
            }
            else if (values.password.length<8){
                toast.error("Password must be 8 chars long!")
            }
            else{
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
                <Link  style={{ textDecoration: "none" }} to="/login">Back</Link>
            </div>
        </div>
    )
}

export default connect( null, { signup } )( IsLoadingHOC( Signup ) )
