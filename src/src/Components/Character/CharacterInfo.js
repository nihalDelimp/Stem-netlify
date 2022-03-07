const CharacterInfo = ( props ) => {
    const { activeChar } = props;
    return (
        <div className="character--info">
            <div className="analytics">
                <div
                    className="character--name"
                    style={{
                        textShadow: `-5px 9px 4px ${activeChar.character_name === "Vanessa"
                            ? "#53E484"
                            : `${activeChar.character_name === "Select Maria"
                                ? "#F5BF57"
                                : "rgba(0, 102, 255, 0.4)"}`}`
                    }}>
                    {activeChar.character_name}
                </div>
                <div className="analytics--group">
                    <div className="analytics--item">
                        <h4 className="analytics--label">Business</h4>
                        <div className="analytics--progress">
                            <div
                                className="value"
                                style={{
                                    width: `${!activeChar
                                        ? 100
                                        : activeChar.business}%`,
                                    background: "#5578F1"
                                }}>

                            </div>
                        </div>
                    </div>
                    <div className="analytics--item">
                        <h4 className="analytics--label">Engineering</h4>
                        <div className="analytics--progress">
                            <div
                                className="value"
                                style={{
                                    width: `${!activeChar
                                        ? 100
                                        : activeChar.engineering}%`,
                                    background: "#53E484"
                                }}>

                            </div>
                        </div>
                    </div>
                    <div className="analytics--item">
                        <h4 className="analytics--label">Science</h4>
                        <div className="analytics--progress">
                            <div
                                className="value"
                                style={{
                                    width: `${!activeChar
                                        ? 100
                                        : activeChar.science}%`,
                                    background: "#F5C057",
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CharacterInfo
