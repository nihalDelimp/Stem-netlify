let initialState = {
    addedQuiz: [],
    addedGame: [],
    addedDoc: [],
    coursedetails: {},
    firstDocs: "",
    secondDocs: "",
    thirdDocs: "",
    fourthDocs: ""
}

export default function foo(state = initialState, action) {
    switch (action.type) {
        case "SAVE_COURSE_DATA":
            return { ...state, coursedetails: action.payload }
        case "SAVE_ADDED_QUIZ":
            return { ...state, addedQuiz: [...state.addedQuiz, action.payload] }
        case "SAVE_ADDED_GAMEQUIZ":
            return { ...state, addedGame: [...state.addedGame, action.payload] }
        case "SAVE_ADDED_DOC":
            return { ...state, addedDoc: [...state.addedDoc, action.payload] }
        case "SAVE_ADDED_FIRST_DOC":
            return { ...state, firstDocs: action.payload }
        case "SAVE_ADDED_SECOND_DOC":
            return { ...state, secondDocs: action.payload }
        case "SAVE_ADDED_THIRD_DOC":
            return { ...state, thirdDocs: action.payload }
        case "SAVE_ADDED_FOURTH_DOC":
            return { ...state, fourthDocs: action.payload }
        case "REMOVE_ADDED_DOC":
            return { ...state, addedDoc: [] }
        case "REMOVE_COURSE_DATA":
            return {
                addedQuiz: [],
                addedGame: [],
                addedDoc: [],
                coursedetails: {},
                firstDocs: "",
                secondDocs: "",
                thirdDocs: "",
                fourthDocs: ""
            }
        default:
            return state
    }
}

