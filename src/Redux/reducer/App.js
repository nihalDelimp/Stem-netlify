let initialState = {
    current: "",
    character: {
        selected: 0,
        active: 0,
    },
    data: {},
    studentData : []
}

export default function foo(state = initialState, action) {
    switch (action.type) {
        case "MODAL_DATA_UPDATE":
            return { ...state, current: { ...state.current, ...action.payload } }
        case "USER_ACTIVITY":
            return { ...state, current: { ...state.current, ...action.payload } }
        case "SAVE_DATA":
            return { ...state, data: { ...state.data, ...action.payload } }
        case "CLOSE_MODAL":
            return { ...state, current: action.payload }
       
        case "SAVE_CHARACTER_DATA":
            return { ...state, character: { ...state.character, ...action.payload } }
            case "GET_STUDENT_DATA_SUCESS" :
                return { ...state, studentData:  action.payload } 
        default:
            return state
    }
}