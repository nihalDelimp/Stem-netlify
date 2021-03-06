import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import Select from 'react-select'
import { createClassroom, getTeacherList } from '../../../Redux/action/SchoolAdmin'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import IsloggedinHOC from '../../../Components/IsLoggedinHOC'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CreateRoom = ( props ) => {
    const { setLoading } = props
    const [teachers, setTeachers] = useState( [] )
    const school_code = useSelector(state =>state.course.school_code)
    const [values, setValues] = useState( {
        class_name: "",
        user_id: "",
        schedule_date: "",
        class_end_at: ""
    } )
    const dispatch = useDispatch();

    const getTeachers = async () => {
        await dispatch( getTeacherList({school_code}) )
            .then(
                response => {
                    let teacherList = []
                    const filterData  = response.data.filter(item => item.teachers.length >0)
                    filterData.map( (item, _ ) => {
                        teacherList.push( {
                            value: item.user_id,
                            label: item.teachers[0]?.name
                        } )
                    } )
                    setTeachers( teacherList )
                },
                error => console.log( error )
            )
            .catch(
                error => console.log( error )
            )
    }

    const handlerCreateClassroom = async () => {
        setLoading( true )
        const { class_name, user_id, schedule_date, class_end_at } = values
        if ( !class_name ) {
            toast.error( "Class name is required" )
            setLoading( false )
            return
        } else if ( !user_id ) {
            toast.error( "Teacher is required" )
            setLoading( false )
            return
        } else if ( !schedule_date ) {
            toast.error( "Schedule date is required" )
            setLoading( false )
            return
        } else if ( !class_end_at ) {
            toast.error( "Class end at is required" )
            setLoading( false )
            return
        } else {
            await dispatch( createClassroom( values ) )
                .then(
                    () => {
                        setLoading( false )
                        toast.success( "Create classroom success" )
                        setValues( {
                            class_name: "",
                            user_id: "",
                            schedule_date: "",
                            class_end_at: ""
                        } )
                    },
                    error => {
                        if ( Array.isArray( error.response.data.errors ) ) {
                            error.response.data.errors.forEach( ( error, _ ) => {
                                toast.error( error.class_name )
                                toast.error( error.user_id )
                                toast.error( error.schedule_date )
                                toast.error( error.class_end_at )
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

    useEffect( () => {
        getTeachers()
    }, [] )

    return (
        <>
            <div className="grid">
                <div className="grid---">
                <div className="page--sub-title">
                            <ul>
                                <li>
                                    <Link to="/classroom" style={{ color: "#000", textDecoration: "none" }}>
                                        <span>Courses</span>
                                    </Link>
                                </li>
                                <li>
                                    <span>Create new classroom</span>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
            <div className="grid create-classrom-form-grid">
                <div className="grid--">
                    <div className="create-classrom-form">
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>Class</label>
                            </div>
                            <div className="input-field-classroom">
                                <input
                                    type="text"
                                    value={values.class_name}
                                    onChange={e => setValues( {
                                        ...values,
                                        class_name: e.target.value
                                    } )} />
                            </div>
                        </div>
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>Start date</label>
                            </div>
                            <div className="input-field-classroom ">
                                {/* <DatePicker selected={startDate} onChange={( date ) => setStartDate( date )} /> */}
                                <input
                                    type="date"
                                    value={values.schedule_date}
                                    onChange={e => setValues( {
                                        ...values,
                                        schedule_date: e.target.value
                                    } )} />
                            </div>
                        </div>
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>Teacher</label>
                            </div>
                            <div className="input-field-classroom teacher-select-input">
                                <Select
                                    options={teachers}
                                    onChange={e => setValues( {
                                        ...values,
                                        user_id: e.value
                                    } )}
                                />
                            </div>
                        </div>
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>End date</label>
                            </div>
                            <div className="input-field-classroom ">
                                {/* <DatePicker selected={endtDate} onChange={( date ) => setEndDate( date )} /> */}
                                <input
                                    type="date"
                                    value={values.class_end_at}
                                    onChange={e => setValues( {
                                        ...values,
                                        class_end_at: e.target.value
                                    } )} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid- crete-classroom-grid">
                    <div className="crete-classroom-btn-container">
                        <button
                            type="button"
                            className="btn btn-create"
                            onClick={handlerCreateClassroom}>Create Classroom</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(IsloggedinHOC(CreateRoom));
