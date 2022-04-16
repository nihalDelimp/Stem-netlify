import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../../Components/IsLoadingHOC";
import IsloggedinHOC from '../../../Components/IsLoggedinHOC';
import { getSchoolListAction } from "../../../Redux/action/SiteAdmin";
import { getAssignedCourse, assignCourseToSchool } from "../../../Redux/action/coursePlatform";
import { default as ReactSelect } from "react-select";


const AssignPopup = (props) => {
    const { setLoading, setAssignPopUp, assignData } = props;
    const { id, course_code } = assignData
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([])

    useEffect(() => {
        getAllSchool();
        getAssignedCourseData();

    }, [])

    const getAllSchool = async () => {
        setLoading(true)
        await dispatch(getSchoolListAction())
            .then(
                response => {
                    setLoading(false)
                    let schoolList = []
                    response.data.map((item, _) => {
                        schoolList.push({
                            value: item.id,
                            label: item.school_name,
                            school_code : item.school_code
                        })
                    })
                    setOptions(schoolList)
                },
                () => setLoading(false)
            )
            .catch(error => console.log(error)
            )
    }

    const getAssignedCourseData = async () => {
        setLoading(true)
        await dispatch(getAssignedCourse({course_code :course_code , course_id :id}))
            .then(
                response => {
                    setLoading(false)
                    let schoolList = []
                    response.data.map((item, _) => {
                        schoolList.push({
                            value: item.id,
                            label: item.school_name
                        })
                    })
                },
                () => setLoading(false)
            )
            .catch(error => console.log(error)
            )
    }

    const handleChange = (selected) => {
        setSelectedOption(selected)
    }

    const assignHandler = async () => {
        if(selectedOption){
            setLoading(true)
            const payload = {
                course_code : course_code,
                course_id : id,
                school_id : selectedOption.value,
                school_code : selectedOption.school_code
                }
            await dispatch(assignCourseToSchool(payload))
            .then(
                response => {
                    setLoading(false)
                    toast.success(response.message)
                    setAssignPopUp(false)
                    console.log("response" ,response)
                },
                (error) => {
                    console.log("error" ,error)
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


    return (
        <div className="popup" onClick={() => setAssignPopUp(false)}>
            <div className="popup--card" onClick={(e) => e.stopPropagation()}>
                <h3>Assign Course to School</h3>
                <form action="" className="form">
                    <div className="form--item">
                        <label htmlFor="name" > Select School Name</label>
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
export default IsLoadingHOC(IsloggedinHOC(AssignPopup));
