import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import IsloggedinHOC from "../../../Components/IsLoggedinHOC";
import { addNewSchoolAdmin } from '../../../Redux/action/SiteAdmin'
import { useParams } from "react-router-dom"


const CreateSchoolAdmin = (props) => {
    const { setLoading, setCreatePopUp, getAllSchoolAdmin } = props;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const dispatch = useDispatch()
    const params = useParams()

    return (
        <div className="popup" onClick={() => setCreatePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Create New School Admin</h3>
                <Formik
                 enableReinitialize={true}
                    initialValues={{
                        name: "",
                        email : "" ,
                        user_type : "SCHOOL_ADMIN" ,
                        school_code: params.id ? params.id : ""
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const { name , email , school_code } = values;
                        if (!name) {
                            toast.error("Name is required")
                            setSubmitting(false);
                            return;
                        }
                       else if (!email) {
                            toast.error("Email is required")
                            setSubmitting(false);
                            return;
                        }
                        else if (!email.match(mailformat)){
                            toast.error("Email address invalid !")
                        }
                        else if (!school_code) {
                            toast.error("school code is required")
                            setSubmitting(false);
                            return;
                        }
                        else {
                            setLoading(true)
                            await dispatch(addNewSchoolAdmin(values))
                                .then(
                                    (response) => {
                                        toast.success("Mail sent successfully")
                                        setSubmitting(false);
                                        setCreatePopUp(false);
                                        setLoading(false);
                                        getAllSchoolAdmin();
                                    },
                                    error => {
                                        toast.error(error.response.data.message)
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
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={values.name}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >School code</label>
                                <input
                                    type="text"
                                    id="school_code"
                                    name="school_code"
                                    placeholder="Enter school code"
                                    value={params.id}
                                    disabled
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
export default IsLoadingHOC(IsloggedinHOC(CreateSchoolAdmin));
