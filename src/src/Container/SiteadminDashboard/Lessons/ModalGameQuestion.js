
const ModalGameQuestion = () => {

    return (
        <>
            <div className="container">
                <div className="modal-game-qustion">
                    <div className="add-game-question">
                        <div className="add-game-question-inner">
                            <div className="modal-question-header">
                                <h3>Game questions</h3>
                            </div>
                            <div className="add-question-field">
                                <span>Q.4</span>
                                <input type="text" placeholder="Type Question here" />
                            </div>

                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>A.</span>
                                    <input type="text" placeholder="Type Question here" />
                                </div>
                                <div className="question-for-game">
                                    <div className="qustion-for-game-input">
                                        <div className="select-dolor">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor_star.svg" ).default} alt="" /></span>
                                        </div>
                                        <div className="select-star">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor.svg" ).default} alt="" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>B.</span>
                                    <input type="text" placeholder="Type Question here" />
                                </div>
                                <div className="question-for-game">
                                    <div className="qustion-for-game-input">
                                        <div className="select-dolor">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor_star.svg" ).default} alt="" /></span>
                                        </div>
                                        <div className="select-star">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor.svg" ).default} alt="" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>C.</span>
                                    <input type="text" placeholder="Type Question here" />
                                </div>
                                <div className="question-for-game">
                                    <div className="qustion-for-game-input">
                                        <div className="select-dolor">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor_star.svg" ).default} alt="" /></span>
                                        </div>
                                        <div className="select-star">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor.svg" ).default} alt="" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-answer-wrapper">
                                <div className="add-question-field">
                                    <span>D.</span>
                                    <input type="text" placeholder="Type Question here" />
                                </div>
                                <div className="question-for-game">
                                    <div className="qustion-for-game-input">
                                        <div className="select-dolor">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor_star.svg" ).default} alt="" /></span>
                                        </div>
                                        <div className="select-star">
                                            <input type="radio" id="quiz" name="quiz" />
                                            <span><img src={require( "../../../assets/images/dolor.svg" ).default} alt="" /></span>
                                        </div>
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

export default ModalGameQuestion;