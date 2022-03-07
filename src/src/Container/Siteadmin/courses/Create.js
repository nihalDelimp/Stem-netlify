import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { addNewCourse } from "../../../Redux/action/coursePlatform";


const CreateCourse = ( props ) => {
    const { setLoading, setCreatePopUp, getCoursesList } = props;
    const dispatch = useDispatch()

    return (
        <div className="popup" onClick={() => setCreatePopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Create New Course</h3>
                <Formik
                    initialValues={{
                        course_name: "",
                        course_desc: "",
                    }}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        setSubmitting( true );
                        setLoading( true )
                        const { course_name, course_desc } = values;
                        if ( !course_name ) {
                            toast.error( "Course name is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else if (!course_desc ) {
                            toast.error( "Description date is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else {
                            await dispatch( addNewCourse( values ) )
                                .then(
                                    () => {
                                        toast.success("Course created successfully")
                                        setSubmitting( false );
                                        setCreatePopUp( false );
                                        setLoading( false );
                                        getCoursesList();
                                    },
                                    error => {
                                        setSubmitting( false );
                                        setLoading( false );
                                    }
                                )
                                .catch(
                                    error => console.log( error )
                                )
                        }
                    }}
                >
                    {( { values, handleChange, handleSubmit, isSubmitting } ) => (
                        <form action="" className="form" onSubmit={handleSubmit}>
                            <div className="form--item">
                                <label htmlFor="name" >Name</label>
                                <input
                                    type="text"
                                    id="course_name"
                                    name="course_name"
                                    placeholder="Enter course name"
                                    value={values.course_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="name" >Description</label>
                                <textarea
                                    type="text"
                                    id="description"
                                    name="course_desc"
                                    placeholder="Enter description"
                                    value={values.course_desc}
                                    onChange={handleChange} />
                            </div>
                            <div className="btn--group">
                                <button className="create" onClick={handleSubmit} disabled={isSubmitting}>Create</button>
                                <button className="cancel" onClick={() => setCreatePopUp( false )}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
        </div >
    )
}
export default IsLoadingHOC(CreateCourse)
