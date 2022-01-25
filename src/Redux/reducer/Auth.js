let initialState = {
    user: "",
    token: "",
    classCode: "",
    user_password : ""
}



export default function foo(state = initialState, action) {
    switch (action.type) {
        case "USER_DATA_UPDATE":
            return { ...state, user: action.payload }
        case "SAVE_TOKEN":
            return { ...state, token: action.payload }
        case "USER_PASSWORD":
            return { ...state, user_password: action.payload }
        case "SET_CLASS_CODE_SUCCESS":
            return { ...state, classCode: action.payload }
        case "LOGOUT":
            return { ...state, user: "", token: "", classCode: "" }
        default:
            return state
    }
}