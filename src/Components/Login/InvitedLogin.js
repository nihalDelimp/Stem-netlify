import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signup } from '../../Redux/action/Auth'
import { SubmitButton } from '../Buttons'
import { Input } from '../Inputs'
import IsLoadingHOC from '../IsLoadingHOC'


const InvitedLogin = (props) => {
    const { setLoading } = props;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div className="card card--form">
            <div className="card--body">
                <h1>Invited Login</h1>
                <Formik
                    initialValues={{
                        classcode: params.code
                            ? params.code
                            : "",
                        name: "",
                        password: "",
                        email: "",
                        user_type: "STUDENT"
                    }}
                    onSubmit={async values => {
                        const { name, password, email } = values
                        if (!email) {
                            toast.error("Please Enter Email")
                            return
                        }
                        else if (!email.match(mailformat)) {
                            toast.error("Email address invalid")
                            return
                        }
                        else if (!name) {
                            toast.error("Please Enter Name")
                            return
                        }
                        else if (!password) {
                            toast.error("Please Enter Password")
                            return
                        }
                        else if (password.length < 8) {
                            toast.error("Password must be 8 chars long!")
                            return

                        } else {
                            setLoading(true)
                            await dispatch(signup(values))
                                .then(
                                    response => {
                                        toast.success(response.message)
                                        history.push("/")
                                        setLoading(false)
                                    },
                                    error => {
                                        toast.error(error.response.data.message)
                                        setLoading(false)
                                    }
                                )
                                .catch(error => console.log(error))
                        }
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values
                    }) => (
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form--item">
                                <Input
                                    disabled={params.code ? true : false}
                                    type="text"
                                    className="form--input"
                                    name="classcode"
                                    value={values.classcode}
                                    onChange={handleChange}
                                    placeholder="CLASSROOM CODE" />
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
                                    type="text"
                                    name="name"
                                    className="form--input"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="NAME" />
                            </div>
                            <div className="form--item">
                                <Input
                                    type="password"
                                    className="form--input"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="PASSWORD" />
                            </div>
                            <SubmitButton className="btn btn--submit" type="submit">Enter</SubmitButton>
                        </form>
                    )}
                </Formik>

                <Link to="/login">Back</Link>
            </div>
        </div>
    )
}

export default IsLoadingHOC(InvitedLogin)
