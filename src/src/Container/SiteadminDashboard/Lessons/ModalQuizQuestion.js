
const ModalQuizQuestion = () => {

    return (
        <>
            <div className="container">
                <div className="modal-game-qustion modal-quiz-qustion">
                    <div className="add-game-question">
                        <div className="add-game-question-inner">
                            <div className="modal-question-header">
                                <h3>Quiz questions</h3>
                            </div>
                            <div className="add-question-field">
                                <span>Q.4</span>
                                <input type="text" placeholder="Type Question here"></input>
                            </div>

                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>A.</span>
                                    <input type="text" placeholder="Type Question here"></input>
                                </div>
                                <div className="select-question-option">
                                    <div className="question-quiz-title">
                                        <h4>Correct answer</h4>
                                    </div>
                                    <div className="modal-question-for-quiz custom-radio-btn">
                                        <input type="radio" id="redio1" name="answer"></input>
                                        <label for="redio1"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>B.</span>
                                    <input type="text" placeholder="Type Question here"></input>
                                </div>
                                <div className="select-question-option">
                                    <div className="modal-question-for-quiz custom-radio-btn">
                                        <input type="radio" id="redio2" name="answer"></input>
                                        <label for="redio2"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>C.</span>
                                    <input type="text" placeholder="Type Question here"></input>
                                </div>
                                <div className="select-question-option">
                                    <div className="modal-question-for-quiz custom-radio-btn">
                                        <input type="radio" id="redio3" name="answer"></input>
                                        <label for="redio3"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>D.</span>
                                    <input type="text" placeholder="Type Question here"></input>
                                </div>
                                <div className="select-question-option">
                                    <div className="modal-question-for-quiz custom-radio-btn">
                                        <input type="radio" id="redio4" name="answer"></input>
                                        <label for="redio4"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="proceed-btn-container">
                        <div className="proceed-btn-group">
                            <button className="btn-common btn-proceed">Proceed</button>
                            <button className="btn-common btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalQuizQuestion;