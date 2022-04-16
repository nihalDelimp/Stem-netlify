import React, { useState, useEffect } from 'react'
import { useDispatch ,useSelector } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import IsloggedinHOC from '../../../Components/IsLoggedinHOC';
import { getClassListAction ,assignCourseToClass } from "../../../Redux/action/SchoolAdmin";
import { default as ReactSelect } from "react-select";


const AssignPopup = (props) => {
    const { setLoading, setAssignPopUp, assignData } = props;
    const { id, course_code } = assignData
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([])
    const school_code = useSelector(state =>state.course.school_code)

   
   
    const getAllSchoolClass = async () => {
        setLoading(true)
        await dispatch(getClassListAction({school_code}))
            .then(
                response => {
                    setLoading(false)
                    let classList = []
                    response.data.map((item, _) => {
                        item.class.length > 0 &&
                        item.class.map(item =>{
                            classList.push({
                                value: item.id,
                                label: item.class_name,
                                class_code : item.class_code,
                                school_code : item.school_code
                            })
                        })   
                    })
                    setOptions(classList)
                },
                () => setLoading(false)
            )
            .catch(error => console.log(error)
            )
    }

    // const getAssignedCourseData = async () => {
    //     setLoading(true)
    //     await dispatch(getAssignedCourse({course_code :course_code , course_id :id}))
    //         .then(
    //             response => {
    //                 setLoading(false)
    //                 let schoolList = []
    //                 response.data.map((item, _) => {
    //                     schoolList.push({
    //                         value: item.id,
    //                         label: item.school_name
    //                     })
    //                 })
    //             },
    //             () => setLoading(false)
    //         )
    //         .catch(error => console.log(error)
    //         )
    // }

    const handleChange = (selected) => {
        setSelectedOption(selected)
    }

    const assignHandler = async () => {
        if(selectedOption){
            setLoading(true)
            const payload = {
                course_code : course_code,
                course_id : id,
                class_name : selectedOption.label,
                class_code : selectedOption.class_code,
                class_id : selectedOption.value,
                school_code : selectedOption.school_code
                }
            await dispatch(assignCourseToClass(payload))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    setAssignPopUp(false)
                    console.log("response" ,response)
                },
                (error) => {
                    toast.error(error.response.data.message)
                    setLoading(false)
                }
            )
            .catch(error => console.log(error)
            )
        }
        else{
           toast.error("Please select any School")
        }
    }

    useEffect(() => {
        getAllSchoolClass();
       // getAssignedCourseData();

    }, [])


    return (
        <div className="popup" onClick={() => setAssignPopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Assign Course to Class</h3>
                <form action="" className="form">
                    <div className="form--item" >
                        <label htmlFor="name" > Select Class Name</label>
                        <ReactSelect
                            options={options}
                             // isMulti
                            //  allowSelectAll={true}
                            // closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                             value ={selectedOption}
                            onChange={handleChange}
                            placeholder="Select"
                        />
                    </div>
                    <div className="btn--group">
                        <button type='button' className="update" onClick={assignHandler}>Assign</button>
                        <button className="cancel" onClick={() => setAssignPopUp(false)}>Cancel</button>
                    </div>
                </form>

            </div >
        </div >
    )
}
export default IsLoadingHOC(IsloggedinHOC(AssignPopup))
