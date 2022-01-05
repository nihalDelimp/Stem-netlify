import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import IsLoadingHOC from '../../../Components/IsLoadingHOC'
import { getAllStudentScore } from '../../../Redux/action/Student'
import { IsloggedinHOC } from '../../../Components/IsLoggedinHOC'

const Leaderboard = (props) => {
    const{setLoading} = props
    const [currentLeaderTab, setCurrentTab] = useState(1)
    const [leaderboardData, setLeaderboardData] = useState( [] )
    const classCode = useSelector( state => state.auth.classCode )
   // console.log( "leadereboard data", leaderboardData)

    const dispatch = useDispatch();
    const NewLeaderTab = (index) => {
        setCurrentTab(index)
    }

  console.log("leaderboard data",leaderboardData)
    const getAllStudentScoreData = async () => {
        await dispatch( getAllStudentScore({
            class_code: classCode
        }) )
        .then(
            response => {
                setLeaderboardData( response.data ? response.data : [] )
                setLoading( false )
            },
            () => {
                setLeaderboardData( [] )
                setLoading( false )
            }
        )
        .catch(
            error => console.log( error )
        )
    }

    useEffect( () => {
        getAllStudentScoreData();
     
    }, [] )
  
    return (
        <div className="container">
            <div className="LeaderNew--section">
                <div className="grid">
                    <div className="grid---">
                        <div className="page--title--big">
                            <h2>Leaderboard</h2>
                        </div>
                    </div>
                </div>
                <div className='Leaderboard--winners'>
                    <div className='Leaderboard--winners-inner'>
                        <div className='Leaderboard--winners-trophy'>
                            <div className='winners-trophy-rank'>
                                <img src={require("../../../assets/images/silver.png").default}></img>
                                <h3>Lily</h3>
                                <h4>Company value: </h4>
                                <h5>1,120,550</h5>
                            </div>
                            <div className='winners-trophy-rank'>
                                <img src={require("../../../assets/images/gold.png").default}></img>
                                <h3>Lily</h3>
                                <h4>Company value: </h4>
                                <h5>1,120,550</h5>
                            </div>
                            <div className='winners-trophy-rank'>
                                <img src={require("../../../assets/images/bronze.png").default}></img>
                                <h3>Lily</h3>
                                <h4>Company value: </h4>
                                <h5>1,120,550</h5>
                            </div>
                        </div>
                        <div className='new--leaderboard_tabs'>
                            <ul>
                                <li className={currentLeaderTab === 1 ? "active-leadertab" : " "} onClick={() => NewLeaderTab(1)}>
                                    <span>Class</span>
                                </li>
                                <li className={currentLeaderTab === 2 ? "active-leadertab" : " "} onClick={() => NewLeaderTab(2)}>
                                    <span>Year</span>
                                </li>
                                <li className={currentLeaderTab === 3 ? "active-leadertab" : " "} onClick={() => NewLeaderTab(3)}>
                                    <span>Region</span>
                                </li>
                            </ul>
                        </div>
                        <div className='new--leaderboard_tabs-content-wrapper'>
                            <div className='new--leaderboard_tabs-content' className={currentLeaderTab === 1 ? "activetabLeader new--leaderboard_tabs-content" : "new--leaderboard_tabs-content"} onClick={() => NewLeaderTab(1)}>
                           
                            {leaderboardData.length >0 && leaderboardData.map((item ,index)=>
                                <div className='new--leaderboard_tabs-data' key={item.id} >
                                    <div className='winner-ranks'>
                                        <h3>{index+1}</h3>
                                        <img src={require("../../../assets/images/user_img.png").default}></img>
                                        <h4>{item.student_details[0].name}</h4>
                                    </div>
                                    <div className='winner-datas'>
                                        <div className='winner-budget'>
                                            <span>Budget: </span>
                                            <span>10,000</span>
                                        </div>
                                        <div className='winner-price'>
                                            <span>$ </span>
                                            <span>{item.quiz_score}</span>
                                        </div>
                                    </div>
                                </div>
                                 )}
                            </div>


                            <div className='new--leaderboard_tabs-content' className={currentLeaderTab === 2 ? "activetabLeader new--leaderboard_tabs-content" : "new--leaderboard_tabs-content"} onClick={() => NewLeaderTab(1)}>
                                <div className='new--leaderboard_tabs-data'>
                                    <div className='winner-ranks'>
                                        <h3>3</h3>
                                        <img src={require("../../../assets/images/user_img.png").default}></img>
                                        <h4>You</h4>
                                    </div>
                                    <div className='winner-datas'>
                                        <div className='winner-budget'>
                                            <span>Budget: </span>
                                            <span>30,000</span>
                                        </div>
                                        <div className='winner-price'>
                                            <span>$ </span>
                                            <span>12,300</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='new--leaderboard_tabs-data'>
                                    <div className='winner-ranks'>
                                        <h3>4</h3>
                                        <img src={require("../../../assets/images/user_img.png").default}></img>
                                        <h4>You</h4>
                                    </div>
                                    <div className='winner-datas'>
                                        <div className='winner-budget'>
                                            <span>Budget: </span>
                                            <span>30,000</span>
                                        </div>
                                        <div className='winner-price'>
                                            <span>$ </span>
                                            <span>12,300</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='new--leaderboard_tabs-content' className={currentLeaderTab === 3 ? "activetabLeader new--leaderboard_tabs-content" : "new--leaderboard_tabs-content"} onClick={() => NewLeaderTab(1)}>
                                <div className='new--leaderboard_tabs-data'>
                                    <div className='winner-ranks'>
                                        <h3>5</h3>
                                        <img src={require("../../../assets/images/user_img.png").default}></img>
                                        <h4>You</h4>
                                    </div>
                                    <div className='winner-datas'>
                                        <div className='winner-budget'>
                                            <span>Budget: </span>
                                            <span>30,000</span>
                                        </div>
                                        <div className='winner-price'>
                                            <span>$ </span>
                                            <span>12,300</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='new--leaderboard_tabs-data'>
                                    <div className='winner-ranks'>
                                        <h3>6</h3>
                                        <img src={require("../../../assets/images/user_img.png").default}></img>
                                        <h4>You</h4>
                                    </div>
                                    <div className='winner-datas'>
                                        <div className='winner-budget'>
                                            <span>Budget: </span>
                                            <span>30,000</span>
                                        </div>
                                        <div className='winner-price'>
                                            <span>$ </span>
                                            <span>12,300</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ( IsLoadingHOC( IsloggedinHOC( Leaderboard ) ) )
