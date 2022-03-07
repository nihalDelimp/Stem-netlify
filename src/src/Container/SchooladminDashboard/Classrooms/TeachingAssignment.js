import 'react-datepicker/dist/react-datepicker.css'

const TeachingAssignment = () => {


    return (

        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Classroom Management System</h2>
                        </div>
                    </div>
                </div>
                <div className="teaching-assignment-section">
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li><span>Current classrooms</span></li>
                                    <li>
                                        <span>Ms Annie Chau</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--title-sub">
                                <h2>Teaching assignment</h2>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <div className="current-classrom-tab-content-wrapper">
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="sort-th">
                                                        <span>Class</span>
                                                        <span className="sort-icon">
                                                            <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                            <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="sort-th">
                                                        <span>Size</span>
                                                        <span className="sort-icon">
                                                            <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                            <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="sort-th">
                                                        <span>Progress</span>
                                                        <span className="sort-icon">
                                                            <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                            <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="sort-th">
                                                        <span>Mean scores</span>
                                                        <span className="sort-icon">
                                                            <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                            <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="sort-th">
                                                        <span>Reassign</span>
                                                        <span className="sort-icon">
                                                            <img alt="" className="up-arrow" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                            <img alt="" src={require( "../../../assets/images/arrowdown.svg" ).default}></img>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <span>edit</span>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span>3A</span><img alt="" src={require( "../../../assets/images/pancel_icon.svg" ).default}></img></td>
                                                <td><span>30</span></td>
                                                <td><span>Week 1: Getting started</span></td>
                                                <td><span style={{ color: "#00D823" }}>78% (+2%)</span></td>
                                                <td><span><button className="btn-remove">Reassign teacher</button></span></td>
                                                <td><span><button className="btn-remove">Delete classroom</button></span></td>
                                            </tr>
                                            <tr>
                                                <td><span>3A</span><img alt="" src={require( "../../../assets/images/pancel_icon.svg" ).default}></img></td>
                                                <td><span>30</span></td>
                                                <td><span>Week 1: Getting started</span></td>
                                                <td><span style={{ color: "#00D823" }}>78% (+2%)</span></td>
                                                <td><span><button className="btn-remove">Reassign teacher</button></span></td>
                                                <td><span><button className="btn-remove">Delete classroom</button></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default TeachingAssignment;