let initialState = {
    characterList: []

}

export default function foo ( state = initialState, action ) {
    switch ( action.type ) {
        case "SAVE_CHARACTER":
            return { ...state, characterList: action.payload }
        default:
            return state
    }
}