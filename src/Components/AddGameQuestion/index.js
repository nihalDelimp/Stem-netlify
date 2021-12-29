import React, { useState } from 'react'
import AddConversion from './AddConversion'
import GameQuestion from './AddGameQuestions'

const AddGameQuestion = () => {

    const [step, setStep] = useState( 0 )

    const changeState = () => {
        setStep( 1 )
    }

    return (
        <div className="modal-game-qustion">
            {step === 1 && <GameQuestion />}
            {step === 0 && <AddConversion onClick={changeState} />}
        </div>
    )
}
export default AddGameQuestion
