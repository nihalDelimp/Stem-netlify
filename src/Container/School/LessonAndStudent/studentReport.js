import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentRankAction, studentReportDetails, weeklyRankAction } from "../../../Redux/action/SchoolAdmin";
import IsLoadingHOC from '../../../Components/IsLoadingHOC';
import { IsloggedinHOC } from '../../../Components/IsLoggedinHOC'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import firstImage from "../../../assets/images/1.png"
import secondImage from "../../../assets/images/2.png"
import thirdImage from "../../../assets/images/3.png"
import fourthImage from "../../../assets/images/4.png"
import fiveImage from "../../../assets/images/5.png"
import sixImage from "../../../assets/images/6.png"
import sevenImage from "../../../assets/images/7.png"
import eightImage from "../../../assets/images/8.png"
import nineImage from "../../../assets/images/9.png"
import tenImage from "../../../assets/images/10.png"
import { savePDF } from '@progress/kendo-react-pdf';
import PdfContainer from './pdfContainer';
import moment from 'moment';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

const StudentReport = (props) => {
    const { setLoading } = props
    const [currentRank, setCurrentRank] = useState([]);
    const [rank, setRanks] = useState('')
    const [totalStudent, setTotalStudent] = useState('')
    const [weeklyRank, setWeeklyRank] = useState([])
    const [studentsReportDetail, SetStudentsReportDetail] = useState({})
    const { score, power } = studentsReportDetail ? studentsReportDetail : {}
    const [studentFinalScore, setStudentFinalScore] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const history = useHistory()
    const { StudentName, classsName, classCode } = location.state ? location.state : {}
    const { lessons, week_number ,course_code } = useSelector(state => state.app)
    const [avgScore, setAvgScore] = useState("0");
    const [updatedDate, setUpdatedDate] = useState(new Date())


    useEffect(() => {
        studentcurrentRank();
        studentReportDetailsData();
        weeklyStudentRank();
        if (!StudentName || !classCode) {
            toast.error("Student data not found")
            history.push("/")
        }

    }, [])


    const studentcurrentRank = async () => {
        setLoading(true);
        await dispatch(currentRankAction({
            course_code: course_code,
            week_number: week_number
        }))
            .then(
                response => {
                    setTotalStudent(response.count)
                    const rankData = response.data
                    rankData.map(item => {
                        if (item.student_id == params.id) {
                            setRanks(item.student_id_rank)
                        }
                    })
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


    const weeklyStudentRank = async () => {
        setLoading(true);
        await dispatch(weeklyRankAction({
            course_code: course_code,
            student_id: params.id,
            week_number
        }))
            .then(
                response => {
                    setLoading(false);
                    setWeeklyRank(response.data)
                },
                () => {
                    setLoading(false);
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    const studentReportDetailsData = async () => {
        setLoading(true);
        await dispatch(studentReportDetails({
            student_id: params.id,
        }))
            .then(
                response => {
                    SetStudentsReportDetail(response.data)
                    setLoading(false);
                    const totel = response.data.student_final_score
                    if(totel.length > 0){
                    setStudentFinalScore(totel)
                    const sum = totel.reduce((a, b) => a + b.quiz_score, 0);
                    const avg = (sum / totel.length).toFixed(0) || 0;
                    const updatedDate = totel.slice(-1)
                    setUpdatedDate(updatedDate[0]?.updated_at)
                    setAvgScore(avg)
                    }
                },
                () => {
                    setLoading(false);
                }
            )
            .catch(
                error => console.log(error)
            )
    }


    const AverageGrade = (score) => {
        const sum = score.reduce((a, b) => a + b.quiz_game_money, 0);
        const avg = (sum / score.length).toFixed(2) || 0;
        if (avg > 100000) {
            let gain = avg - 100000;
            let gainPercentage = ((gain * 100) / 100000).toFixed(2);
            return gainPercentage;
        }
        else {
            let loss = 100000 - avg;
            let lossPercentage = -((loss * 100) / 100000).toFixed(2);
            return lossPercentage;
        }
    }

    const toUpperCaseName = (name) => {
        const upperName = name && name.charAt(0).toUpperCase() + name.slice(1)
        return upperName
    }

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(2)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    //--------   Download Docs html file in PDF ---- //
    class DocService {
        createPdf = (html) => {
            savePDF(html, {
                paperSize: 'auto',
                fileName: `${toUpperCaseName(StudentName)}-PRF-Report.pdf`,
                margin: 3,
            })
        }
    }
    const Doc = new DocService();
    const createPdf = (html) => Doc.createPdf(html);

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
                <section className="body--inner-wrapper">
                    <div className="grid">
                        <div className="grid---">
                            <div className="page--sub-title">
                                <ul>
                                    <li>
                                        <Link to="/" style={{ color: "#000", textDecoration: "none" }}>
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <img src={require("../../../assets/images/polygon_green.svg").default}></img>
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
                                        {/* <span>{StudentName}</span> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <PdfContainer createPdf={createPdf} StudentName={StudentName}  >
                        <div className='grid'>
                            <div className='grid---'>
                                <div className='performence--report-student'>
                                    <div className='performence--report--header'>
                                        <div className='performence-title'>
                                            <h3>{toUpperCaseName(StudentName)}'s Performance report</h3>
                                            {week_number && <h5>updated by week {week_number}</h5>}
                                        </div>
                                    </div>
                                    <div className='performence-report-card'>
                                        <div className='performence-report-sidebar'>
                                            <div className='current-ranking'>
                                                <div className='ranking--img'>
                                                    <img src={require("../../../assets/images/star_icon.png").default}></img>
                                                </div>
                                                <div className='curent-ranking-data'>
                                                    <h5>Current ranking in class</h5>
                                                    <h3><span>{rank ? rank : "N/A"}</span> <span className='sub-rank'>/{totalStudent}</span></h3>
                                                </div>
                                            </div>
                                            <div className='current-ranking'>
                                                <div className='ranking--img'>
                                                    {/* <img src={require( "../../../assets/images/avg_icon.png" ).default}></img> */}
                                                </div>
                                                <div className='curent-ranking-data'>
                                                    <h5>Average grade</h5>
                                                    <h3><span> {studentFinalScore && studentFinalScore.length > 0 ? AverageGrade(studentFinalScore) : "0"} %</span></h3>
                                                </div>
                                            </div>
                                            <div className='current-ranking'>
                                                <div className='ranking--img'>
                                                    <img src={require("../../../assets/images/multi-star.png").default}></img>
                                                </div>
                                                <div className='curent-ranking-data'>
                                                    <h5>Company valuation</h5>
                                                    <h3>
                                                    <NumberFormat thousandSeparator={true}
                                                        prefix={'$'}
                                                        className="foo"
                                                        displayType={'text'}
                                                        value={power ? power : "0"} />

                                                        {/* <span>{power ? kFormatter(power) : 0}</span> */}
                                                        </h3>
                                                </div>
                                            </div>
                                            <div className='current-ranking'>
                                                <div className='ranking--img'>
                                                    <img src={require("../../../assets/images/buget_icon.png").default}></img>
                                                </div>
                                                <div className='curent-ranking-data'>
                                                    <h5>Remaining budget</h5>
                                                    <h3>
                                                    <NumberFormat thousandSeparator={true}
                                                       prefix={'$'}
                                                        className="foo"
                                                        displayType={'text'}
                                                        value={score ? score  : "0"} />
                    
                                                    {/* <span>{score ? kFormatter(score) : kFormatter(100000)}</span> */}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='performence-report-card-data'>
                                            {week_number &&
                                                <div className='overall-avg-table'>
                                                    <div className='Overall-avarage-title'>
                                                        <h3>Overall avarage</h3>
                                                        <h5><span>Last update:</span> <span>{moment(updatedDate).format("DD/MM/YYYY")}</span></h5>
                                                    </div>
                                                    <div className='percentage'>
                                                        <h3>{avgScore ? avgScore : "0"}%</h3>
                                                    </div>
                                                    <div className='progress--bar'>
                                                        {avgScore <= 0 && (<img src={firstImage}></img>)}
                                                        {avgScore > 0 && avgScore <= 10 && (<img src={firstImage}></img>)}
                                                        {avgScore > 10 && avgScore <= 20 && (<img src={secondImage}></img>)}
                                                        {avgScore > 20 && avgScore <= 30 && (<img src={thirdImage}></img>)}
                                                        {avgScore > 30 && avgScore <= 40 && (<img src={fourthImage}></img>)}
                                                        {avgScore > 40 && avgScore <= 50 && (<img src={fiveImage}></img>)}
                                                        {avgScore > 50 && avgScore <= 60 && (<img src={sixImage}></img>)}
                                                        {avgScore > 60 && avgScore <= 70 && (<img src={sevenImage}></img>)}
                                                        {avgScore > 70 && avgScore <= 80 && (<img src={eightImage}></img>)}
                                                        {avgScore > 80 && avgScore <= 90 && (<img src={nineImage}></img>)}
                                                        {avgScore > 90 && avgScore <= 100 && (<img src={tenImage}></img>)}
                                                    </div>
                                                    <div className='st--marks'>
                                                        <div className='mean'>
                                                            <span>Mean:</span>
                                                            <span>{avgScore ? avgScore : "0"}</span>
                                                        </div>
                                                        <div className='mean'>
                                                            <span>Max:</span>
                                                            <span>100</span>
                                                        </div>
                                                        <div className='mean'>
                                                            <span>Min:</span>
                                                            <span>10</span>
                                                        </div>
                                                    </div>
                                                </div>}

                                            <div className='performence-week-report'>
                                                {lessons && lessons.length > 0 ? lessons.map((item, index) =>
                                                    item.week_number <= week_number ?
                                                        (<div key={index + 1} className='overall-avg-table'>
                                                            <div className='Overall-avarage-title'>
                                                                <h2>week {index + 1}</h2>
                                                            </div>

                                                            <div className='percentage'>
                                                                <h4>{studentFinalScore && studentFinalScore[index] ? studentFinalScore[index].quiz_score : "0"}%</h4>
                                                            </div>
                                                            <div className='progress--bar'>
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score <= 0 && (<img src={firstImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 10 && (<img src={firstImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 20 && (<img src={secondImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 30 && (<img src={thirdImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 40 && (<img src={fourthImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 50 && (<img src={fiveImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 60 && (<img src={sixImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 70 && (<img src={sevenImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 80 && (<img src={eightImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 90 && (<img src={nineImage}></img>)}
                                                                {studentFinalScore && studentFinalScore[index] && studentFinalScore[index].quiz_score == 100 && (<img src={tenImage}></img>)}
                                                                {studentFinalScore && !studentFinalScore[index] && (<img src={firstImage}></img>)}
                                                            </div>
                                                            <div className='st--marks'>
                                                                <div className='mean'>
                                                                    <span>Mean:</span>
                                                                    <span>{studentFinalScore && studentFinalScore[index] ? studentFinalScore[index].quiz_score : "0"}</span>
                                                                </div>
                                                                <div className='mean'>
                                                                    <span>Max:</span>
                                                                    <span>100</span>
                                                                </div>
                                                                <div className='mean'>
                                                                    <span>Min:</span>
                                                                    <span>0</span>
                                                                </div>
                                                            </div>
                                                        </div>)

                                                        :

                                                        (<div key={index + 1} className='overall-avg-table'>
                                                            <div className='Overall-avarage-title'>
                                                                <h2>week{index + 1}</h2>
                                                            </div>

                                                            <div style={{ margin: "0px" }} className='ranking--history'>
                                                                <div className='ranking--table'>
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>--</td>
                                                                                <td>--</td>
                                                                                <td>--</td>
                                                                                <td>--</td>
                                                                                <td>--</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )) :
                                                    (<div style={{
                                                        height: "300px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        gridColumn: "span 2"
                                                    }}>
                                                        <h2 style={{ fontWeight: "normal", opacity: "0.25" }}>No Lesson found with this class</h2>
                                                    </div>)
                                                }
                                            </div>

                                            <div className='ranking--history'>
                                                <h3>Ranking history</h3>
                                                <div className='ranking--table'>
                                                    <table>
                                                        <tbody>
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
                                                                {weeklyRank && weeklyRank.map((item, index) =>
                                                                    item.student_id_rank.length > 0 && item.student_id_rank ?
                                                                        <td key={index + 1} >{item.student_id_rank[0].student_rank ? item.student_id_rank[0].student_rank : "N/A"}</td> :
                                                                        <td key={index + 1} >--</td>
                                                                )}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PdfContainer>
                </section>
            </div>
        </>
    )
}

export default IsLoadingHOC(IsloggedinHOC(StudentReport));