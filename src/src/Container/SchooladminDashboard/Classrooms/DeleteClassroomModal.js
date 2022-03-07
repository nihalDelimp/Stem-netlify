
const DeleteClassroom = () => {

    return (

        <>
            <div className="delete-popup">
                <div className="delete-popup-body">
                    <h3>Delete classroom?</h3>
                    <div className="checkbox-group">
                        <input className="styled-checkbox" type="checkbox" id="checkbox" name="checkbox"></input>
                        <label for="checkbox"> 
                            <span>I understand the deleted classroom will not be recovered, any record of lessons will permanently be removed from the server.</span>
                        </label>
                    </div>
                    <div className="delete-btn-group">
                        <button className="btn" style={{backgroundColor:"#8C0000"}}>Delete Classroom</button>
                        <button className="btn"style={{backgroundColor:"#ABABAB"}}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
 
    )
}
export default DeleteClassroom; 