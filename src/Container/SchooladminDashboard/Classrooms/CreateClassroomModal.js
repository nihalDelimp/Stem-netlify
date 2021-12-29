import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateClassroomModal = () => {

    const [startDate, setStartDate] = useState( new Date() );

    return (

        <>
            <div className="delete-popup">
                <div className="delete-popup-body">
                    <h4>Create new classroom</h4>
                    <div className="create-classrom-form">
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>Class</label>
                            </div>
                            <div className="input-field-classroom">
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="create-classroom-field">
                            <div className="lable-classroom">
                                <label>Start date</label>
                            </div>
                            <div className="input-field-classroom datepicker-input">
                                <DatePicker selected={startDate} onChange={( date ) => setStartDate( date )} />
                            </div>
                        </div>
                    </div>
                    <div className="delete-btn-group">
                        <button className="btn" style={{ backgroundColor: "#2AC227" }}>Create Classroom</button>
                        <button className="btn" style={{ backgroundColor: "#ABABAB" }}>Cancel</button>
                    </div>
                </div>
            </div>
        </>

    )
}
export default CreateClassroomModal;