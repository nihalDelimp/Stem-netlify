import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '../Buttons'
import { Formik } from 'formik';
import { connect , useSelector } from 'react-redux';
import { resetPassword } from '../../Redux/action/Auth';
import { toast } from "react-toastify"
import { Input } from '../Inputs';
import IsLoadingHOC from '../IsLoadingHOC';

const ResetPassword = (props) => {
    const { resetPassword, setLoading } = props
    const user_id =  useSelector(state => state.auth.user.id)
    const history = useHistory();
   
    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>STEM Unicorn</h1>
                <Formik
                    initialValues={{ password: '', confirm_password: '' }}

                    onSubmit={async (values, { setSubmitting }) => {
                        const { password, confirm_password } = values
                        if (!password) {
                            toast.error("New Password is required !")
                        }
                        else if (password.length < 8) {
                            toast.error("New Password must be 8 chars long!")
                        }
                        else if (!confirm_password) {
                            toast.error("Confirm password is required!")
                        }
                        else if (!(password === confirm_password)) {
                            toast.error("Passwords did not match!")
                        }
                        else {
                            setLoading(true)
                            await resetPassword( user_id,values)
                                .then(
                                    response => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        history.push("/login")
                                        setLoading(false)
                                    },
                                    erroe => {
                                        toast.error(erroe.response.data.message);
                                        setSubmitting(false);
                                        setLoading(false)
                                    }
                                )
                                .catch(
                                    error => console.log(error)
                                )
                        }
                    }}>

                    {({
                        isSubmitting,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values
                    }) => (
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form--item">
                                <Input
                                    type="password"
                                    name="password"
                                    className="form--input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="NEW PASSWORD" />
                            </div>

                            <div className="form--item">
                                <Input
                                    type="password"
                                    name="confirm_password"
                                    className="form--input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                    placeholder="CONFIRM PASSWORD" />
                            </div>
                            <SubmitButton className="btn btn--submit" type="submit" disabled={isSubmitting}
                            >Reset </SubmitButton>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default connect(null, { resetPassword })(IsLoadingHOC(ResetPassword))
