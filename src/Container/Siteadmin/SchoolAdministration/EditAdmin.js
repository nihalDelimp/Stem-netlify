import { useState, useEffect } from "react"
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import IsloggedinHOC from "../../../Components/IsLoggedinHOC";
import { updateSchoolAdminAction , getSchoolAdminDetail } from '../../../Redux/action/SiteAdmin'
import { useParams } from "react-router-dom"


const UpdateSchoolAdmin = (props) => {
    const { setLoading, setUpdatePopUp, getAllSchoolAdmin ,updatedData } = props;
   const  {id , school_code} = updatedData ? updatedData : {}
   const [schoolAdminDetails, setSchoolAdminDetails] = useState({})
   const { name, email} = schoolAdminDetails ? schoolAdminDetails : {}
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const dispatch = useDispatch()
    const params = useParams()

    const getSchoolAdminDetailData = async () => {
        setLoading(true)
        await dispatch(getSchoolAdminDetail(id))
            .then(
                response => {
                    setSchoolAdminDetails(response.data)
                    setLoading(false)
                },
                (error) => setLoading(false)
            )
            .catch( error => console.log(error))
    }

    useEffect(() => {
        if (id) {
            getSchoolAdminDetailData();
        }
    }, [setSchoolAdminDetails])



    return (
        <div className="popup" onClick={() => setUpdatePopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Edit School Admin details</h3>
                <Formik
                 enableReinitialize={true}
                    initialValues={{
                        name: name ? name : "",
                        email : email ? email :  "" ,
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
                            await dispatch(updateSchoolAdminAction(id , values))
                                .then(
                                    (response) => {
                                        toast.success(response.message)
                                        setSubmitting(false);
                                        setUpdatePopUp(false);
                                        setLoading(false);
                                        getAllSchoolAdmin();
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
                                    disabled
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
                                <button className="update" onClick={handleSubmit} disabled={isSubmitting}>Update</button>
                                <button className="cancel" onClick={() => setUpdatePopUp(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
        </div >
    )}
export default IsLoadingHOC(IsloggedinHOC(UpdateSchoolAdmin));
