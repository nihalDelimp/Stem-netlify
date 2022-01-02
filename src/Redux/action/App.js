export const closeModal = data => _dispatch => {
    return _dispatch( { type: "CLOSE_MODAL", payload: data } )
}

export const getModuleData = data => _dispatch => {
    return (
        _dispatch( { type: "MODAL_DATA_UPDATE", payload: data } )
    )
}



export const LogOut = () => _dispatch => {
    return (
        _dispatch( { type: "LOGOUT" } )
    )
}