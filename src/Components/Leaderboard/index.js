import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'

const Leaderboard = () => {

    const dispatch = useDispatch()


    return (
        <div className="leaderboard">
            <div className="leaderboard--content">

                <h2>Last week’s summary</h2>
                <h4>Company’s valuation</h4>
                <h2>$ 100,000</h2>
                <h4>Remaining budget</h4>
                <h2>$ 5,200</h2>
                <button className="back--btn" onClick={() => {
                    dispatch( getModuleData( {
                        activeStep: "quiz-video"
                    } ) )
                }}>Let’s start!</button>
            </div>
        </div>
    )
}

export default Leaderboard
