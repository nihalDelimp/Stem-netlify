import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import { createClassroom } from "../../../Redux/action/Teacher";


const CreateClassroom = ( props ) => {
    const { setLoading, setCreatePopUp, getClassroom } = props;
    const dispatch = useDispatch()



    return (
        <div className="popup" onClick={() => setCreatePopUp( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Create New Classroom</h3>
                <Formik
                    initialValues={{
                        class_name: "",
                        schedule_date: "",
                    }}
                    onSubmit={async ( values, { setSubmitting } ) => {
                        setSubmitting( true );
                        setLoading( true )
                        const { class_name, schedule_date } = values;
                        if ( !class_name ) {
                            toast.error( "Class name is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else if ( !schedule_date ) {
                            toast.error( "Publish date is required" )
                            setSubmitting( false );
                            setLoading( false );
                            return;
                        } else {
                            await dispatch( createClassroom( values ) )
                                .then(
                                    () => {
                                        toast.success( "Classroom created successfully" )
                                        setSubmitting( false );
                                        setCreatePopUp( false );
                                        setLoading( false );
                                        getClassroom();
                                    },
                                    error => {
                                        if ( Array.isArray( error.response.data.errors ) ) {
                                            error.response.data.errors.map( error => (
                                                toast.error( error.class_name && error.class_name ),
                                                toast.error( error.description && error.description )
                                            ) )
                                        } else {
                                            toast.error( error.response.data.message )
                                        }
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
                                    id="name"
                                    name="class_name"
                                    value={values.class_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="form--item">
                                <label htmlFor="date" >Publish date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="schedule_date"
                                    value={values.schedule_date}
                                    onChange={handleChange} />
                            </div>
                            <div className="btn--group">
                                <button className="create" onClick={handleSubmit} disabled={isSubmitting}>Create classroom</button>
                                <button className="cancel" onClick={() => setCreatePopUp( false )}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div >
        </div >
    )
}

export default IsLoadingHOC( CreateClassroom )
