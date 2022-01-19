import React , {useEffect , useState} from 'react'
import { useDispatch } from 'react-redux'
import { getModuleData } from '../../Redux/action/App'
import { lastWeekSummaryAction } from "../../Redux/action/Student"
import IsLoadingHOC from '../IsLoadingHOC'

const Leaderboard = (props) => {
    const {setLoading} = props
    const[lastWeekSummary , setLastWeekSummary] = useState({})
    const {power , score} = lastWeekSummary ? lastWeekSummary : {}
    const dispatch = useDispatch()
    

    useEffect(() => {
         lastWeekSummaryData();
    }, [])


    const lastWeekSummaryData = async() => {
        setLoading(true);
       await dispatch(lastWeekSummaryAction())
            .then(
                response => {
                    setLastWeekSummary(response.data)
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

    return (
        <div className="leaderboard">
            <div className="leaderboard--content">

                <h2>Last week’s summary</h2>
                <h4>Company’s valuation</h4>
                <h2>$ {power}</h2>
                <h4>Remaining budget</h4>
                <h2>$ {score ?  score : 100000}</h2>
                <button className="back--btn" onClick={() => {
                    dispatch( getModuleData( {
                        activeStep: "quiz-video"
                    } ) )
                }}>Let’s start!</button>
            </div>
        </div>
    )
}

export default   IsLoadingHOC(Leaderboard)
