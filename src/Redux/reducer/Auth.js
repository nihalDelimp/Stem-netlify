let initialState = {
    user: "",
    token: ""
}

export default function foo ( state = initialState, action ) {
    switch ( action.type ) {
        case "USER_DATA_UPDATE":
            return { ...state, user: action.payload }
        case "SAVE_TOKEN":
            return { ...state, token: action.payload }
        case "LOGOUT":
            return { ...state, user: "", token: "" }
        default:
            return state
    }
}