let initialState = {
    current: "",
    character: {
        selected: 0,
        active: 0,
    },
    data: {},
    studentData: [],
    week_number: '',
    updatedScore: "",
    lessons: []
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
        case "GET_STUDENT_DATA_SUCESS":
            return { ...state, studentData: action.payload }
        case "SET_ACTIVE_WEEK_NUMBER":
            return { ...state, week_number: action.payload }
        case "UPDATED_SCORE_DATA":
            return { ...state, updatedScore: action.payload }
        case "SET_TEACHER_LESSONS":
            return { ...state, lessons: action.payload }
        case "CLEAN_TEACHER_LESSONS":
            return { ...state, lessons: [] ,  week_number: '' }

        default:
            return state
    }
}