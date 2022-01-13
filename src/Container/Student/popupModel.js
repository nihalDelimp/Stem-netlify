import React from "react";


const PopupModel = ( props ) => {
    const {setLockedModel} = props
    return (
        <div className="popup" onClick={() => setLockedModel( false )}>
            <div className="popup--card" onClick={( e ) => e.stopPropagation()}>
                <h3>Alert</h3>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="exampleCheck1">This lesson has been not published yet..!</label>
                </div>
                <div className="btn--group">
                    <button className="cancel" onClick={() => setLockedModel(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopupModel 
