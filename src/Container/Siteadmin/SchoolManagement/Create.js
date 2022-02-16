import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { addNewSchool } from '../../../Redux/action/SiteAdmin'


const CreateSchool = (props) => {
    const { setLoading, setCreatePopUp, getAllSchool } = props;
    const dispatch = useDispatch()

    return (
        <div className="popup" onClick={() => setCreatePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Create New School</h3>
                <Formik
                    initialValues={{
                        school_name: "",
                        description: "",
                        location: ""
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
                            await dispatch(addNewSchool(values))
                                .then(
                                    () => {
                                        toast.success("School created successfully")
                                        setSubmitting(false);
                                        setCreatePopUp(false);
                                        setLoading(false);
                                        getAllSchool();
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setLoading(false);
                                    }
                                )
                                .catch(error => console.log(error))
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
                                <button className="create" onClick={handleSubmit} disabled={isSubmitting}>Create</button>
                                <button className="cancel" onClick={() => setCreatePopUp(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
        </div >
    )}
export default IsLoadingHOC(CreateSchool)
