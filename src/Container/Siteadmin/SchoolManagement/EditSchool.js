import { useState, useEffect } from "react"
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { editSchoolAction, getSchoolDetailAction } from '../../../Redux/action/SiteAdmin'

const EditSchool = (props) => {
    const { setLoading, setEditPopUp, getAllSchool, editData } = props;
    const { school_code, id } = editData
    const [schoolDetails, setSchoolDetails] = useState({})
    const { school_name, description, location } = schoolDetails ? schoolDetails : {}
    const dispatch = useDispatch();

    const getSchoolDetails = async () => {
        await dispatch(getSchoolDetailAction(id))
            .then(
                response => {
                    setSchoolDetails(response.data)
                    setLoading(false)
                },
                (error) => setLoading(false)
            )
            .catch( error => console.log(error))
    }

    useEffect(() => {
        if (id) {
            getSchoolDetails();
        }
    }, [setSchoolDetails])


    return (
        <div className="popup" onClick={() => setEditPopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()} >
                <h3>Edit School details</h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        school_name: school_name,
                        description: description,
                        location: location
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const { school_name, description, location } = values;
                        if (!school_name) {
                            toast.error("School name is required")
                            setSubmitting(false);
                            return;
                        }
                        else if (!description) {
                            toast.error("Description is required")
                            setSubmitting(false);
                            return;
                        }
                        else if (!location) {
                            toast.error("Location is required")
                            setSubmitting(false);
                            return;
                        }

                        else {
                            setLoading(true)
                            await dispatch(editSchoolAction(id, values))
                                .then(
                                    (response) => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        setEditPopUp(false);
                                        setLoading(false);
                                        getAllSchool();
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
                                    id="school_name"
                                    name="school_name"
                                    value={values.school_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange} />
                            </div>
                            <div className="btn--group">
                                <button className="update" onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
                                <button className="cancel" onClick={() => setEditPopUp(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
        </div >
    )
}
export default IsLoadingHOC(EditSchool)
