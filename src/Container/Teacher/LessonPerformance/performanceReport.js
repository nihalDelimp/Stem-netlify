import React , {useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getModuleData } from '../../../Redux/action/App'
import { performanceReportAction , studentReportDetails } from "../../../Redux/action/Teacher"

import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { Link, useLocation ,useParams } from 'react-router-dom'


const StudentPerformanceReport = (props) => {
    const {setLoading} = props
    const[performanceReport , setPerformanceReport] = useState([])
    const[studentsReportDetail , SetStudentsReportDetail] = useState({})
    const {score , power} = studentsReportDetail ? studentsReportDetail  : {}
    const dispatch = useDispatch()
    const location = useLocation()
    const params =  useParams()
    const { StudentName , classsName, classCode ,total_student , student_rank} = location.state ? location.state : {}


    useEffect(() => {
        // performanceReportData()
        studentReportDetailsData();
    }, [])


    const performanceReportData = async() => {
        setLoading(true);
       await dispatch(performanceReportAction({
            class_code: classCode,
        }))
            .then(
                response => {
                    setPerformanceReport(response.data)
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    const studentReportDetailsData = async() => {
        setLoading(true);
       await dispatch(studentReportDetails({
        student_id: params.id,
        }))
            .then(
                response => {
                    SetStudentsReportDetail(response.data)
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    const AverageGrade = (score) =>{
        if(score > 100000){
            let gain = score - 100000;
            let gainPercentage = ((gain*100)/100000).toFixed(2);
            return gainPercentage;
        }
        else{
            let loss = 100000-score;
            let lossPercentage = -((loss*100)/100000).toFixed(2);
            return lossPercentage;
        }

    }
     return (
        <>
            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title">
                            <h2>Classroom management system</h2>
                        </div>
                    </div>
                </div>
                <section className="body--inner-wrapper">
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/classroom" style={{ color: "#000", textDecoration: "none" }}>
                                            <span>Classroom</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <img src={require( "../../../assets/images/polygon_green.svg" ).default}></img>
                                         <Link style={{ color: "#000", textDecoration: "none" }}
                                             to={{
                                                 pathname: `/classroom/${classCode}`,
                                                 state: {
                                                     classroom: classsName,
                                                     classCode: classCode,
                                                 }
                                             }}
                                       
                                         > 
                                            <span>{classsName}</span>
                                             </Link> 
                                    </li>
                                    <li>
                                        <span>{StudentName}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="grid">
                        <div className="grid---">
                            <div className="student--name-panels">
                                <div className="student--name_details">
                                    <h3>CHAN, Tai Man</h3>
                                    <span>#1203</span>
                                </div>
                                <div className="student--name_details-download">
                                    <img src={require( "../../../assets/images/download-icon.svg" ).default}></img>
                                    <img src={require( "../../../assets/images/3dotsdark.svg" ).default}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='grid---'>
                            <div className='performence--report-student'>
                                <div className='performence--report--header'>
                                    <div className='performence-title'>
                                        <h3>Performance report</h3>
                                        <h5>updated by week 5</h5>
                                    </div>
                                </div>
                                <div className='performence-report-card'>
                                    <div className='performence-report-sidebar'>
                                        <div className='current-ranking'>
                                            <div className='ranking--img'>
                                                <img src={require( "../../../assets/images/star_icon.png" ).default}></img>
                                            </div>
                                            <div className='curent-ranking-data'>
                                                <h5>Current ranking in class</h5>
                                                <h3><span>{student_rank}</span> <span className='sub-rank'>/{total_student}</span></h3>
                                            </div>
                                        </div>
                                        <div className='current-ranking'>
                                            <div className='ranking--img'>
                                                {/* <img src={require( "../../../assets/images/avg_icon.png" ).default}></img> */}
                                            </div>
                                            <div className='curent-ranking-data'>
                                                <h5>Average grade</h5>
                                                <h3><span> {score ? AverageGrade(score) : 0} %</span></h3>
                                            </div>
                                        </div>
                                        <div className='current-ranking'>
                                            <div className='ranking--img'>
                                                <img src={require( "../../../assets/images/multi-star.png" ).default}></img>
                                            </div>
                                            <div className='curent-ranking-data'>
                                                <h5>Company valuation</h5>
                                                <h3><span>{power ? power : 0}</span></h3>
                                            </div>
                                        </div>
                                        <div className='current-ranking'>
                                            <div className='ranking--img'>
                                                <img src={require( "../../../assets/images/buget_icon.png" ).default}></img>
                                            </div>
                                            <div className='curent-ranking-data'>
                                                <h5>Remaining budget</h5>
                                                <h3><span>{score ? score : 0}</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='performence-report-card-data'>
                                        <div className='overall-avg-table'>
                                            <div className='Overall-avarage-title'>
                                                <h3>Overall avarage</h3>
                                                <h5><span>Last update:</span> <span>15/10/2022</span></h5>
                                            </div>
                                            <div className='percentage'>
                                                <h3>{score ? AverageGrade(score) : 0}%</h3>
                                            </div>
                                            <div className='progress--bar'>
                                                <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                            </div>
                                            <div className='st--marks'>
                                                <div className='mean'>
                                                    <span>Mean: </span>
                                                    <span>68</span>
                                                </div>
                                                <div className='mean'>
                                                    <span>Max: </span>
                                                    <span>100</span>
                                                </div>
                                                <div className='mean'>
                                                    <span>Min: </span>
                                                    <span>0</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='performence-week-report'>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='overall-avg-table'>
                                                <div className='Overall-avarage-title'>
                                                    <h2>Week 1</h2>
                                                </div>
                                                <div className='percentage'>
                                                    <h4>75%</h4>
                                                </div>
                                                <div className='progress--bar'>
                                                    <img src={require( "../../../assets/images/progress_bar_img.png" ).default}></img>
                                                </div>
                                                <div className='st--marks'>
                                                    <div className='mean'>
                                                        <span>Mean: </span>
                                                        <span>68</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Max: </span>
                                                        <span>100</span>
                                                    </div>
                                                    <div className='mean'>
                                                        <span>Min: </span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        
                                        <div className='ranking--history'>
                                            <h3>Ranking history</h3>
                                            <div className='ranking--table'>
                                                <table>
                                                    <tr>
                                                        <td>Week</td>
                                                        <td>1</td>
                                                        <td>2</td>
                                                        <td>3</td>
                                                        <td>4</td>
                                                        <td>5</td>
                                                        <td>6</td>
                                                        <td>7</td>
                                                        <td>8</td>
                                                        <td>9</td>
                                                        <td>10</td>
                                                        <td>11</td>
                                                        <td>12</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Rank (out of 30)</td>
                                                        <td>5</td>
                                                        <td>4</td>
                                                        <td>8</td>
                                                        <td>7</td>
                                                        <td>6</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>

    )

}

export default IsLoadingHOC(StudentPerformanceReport);