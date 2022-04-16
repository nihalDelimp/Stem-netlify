import React from "react";
import IsloggedinHOC from "../../Components/IsLoggedinHOC";


const PopupModel = ( props ) => {
    const {setLockedModel} = props
    return (
        <div className="popup" onClick={() => setLockedModel( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Alert</h3>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="exampleCheck1">This lesson has not been published yet..!</label>
                </div>
                <div className="btn--group">
                    <button className="cancel" onClick={() => setLockedModel(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default IsloggedinHOC(PopupModel); 
