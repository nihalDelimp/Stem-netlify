import { Link } from "react-router-dom";

const LessonList = () => {
    return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Course Management System</h2>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="grid---">
                        <div className="page--sub-title">
                            <ul>
                                <li><span>Lessons</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lesson--week">
                    <div className="grid">
                        <div className="grid---">
                            <div className="lesson--week-container">
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 1</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <div className="week-bg" style={{ backgroundColor: "#FFF8F8" }}></div>
                                        <h5 className="slide--no"> Getting started</h5>
                                        <span className="slide-delete-icon"><img src={require( "../../../assets/images/times.svg" ).default} alt="" /></span>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 2</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <div className="week-bg" style={{ backgroundColor: "#FFEDD2" }}></div>
                                        <h5 className="slide--no"> Getting started</h5>
                                        <span className="slide-delete-icon"><img src={require( "../../../assets/images/times.svg" ).default} alt="" /></span>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 3</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <div className="week-bg" style={{ backgroundColor: "#75C2D3" }}></div>
                                        <h5 className="slide--no"> Getting started</h5>
                                        <span className="slide-delete-icon"><img src={require( "../../../assets/images/times.svg" ).default} alt="" /></span>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 4</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 5</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 6</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 7</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 8</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 9</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 10</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 11</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                                <Link to="#" className="lesson-week-wrapper">
                                    <div className="week-counter">
                                        <h4>Week 12</h4>
                                        <h5>
                                            <span>1/9 - 7/9</span>
                                        </h5>
                                    </div>
                                    <div className="lesson--week-contant">
                                        <Link to="#" className="add-lesson-content">
                                            <img src={require( "../../../assets/images/plus.svg" ).default} alt="" />
                                            <h4><span>Add lesson</span> <span>content</span></h4>
                                        </Link>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonList;