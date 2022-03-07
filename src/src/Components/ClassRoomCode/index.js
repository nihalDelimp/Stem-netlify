import { useState } from "react"

const ClassRoomCode = ( props ) => {
    const { data, setIsOpen, isOpen } = props
    return (
        isOpen &&
        <div className="popup"
            onClick={() => setIsOpen( false )}
        >
            <div className="popup--card"
                onClick={( e ) => e.stopPropagation()}
            >

                <h2 style={{ textAlign: "center", fontSize: "3rem" }}>{data}</h2>
                <span style={{ textAlign: "center", display: "block", marginTop: "0.5rem", opacity: "0.5" }}>Classroom Code</span>
            </div>
        </div>
    )
}

export default ClassRoomCode
