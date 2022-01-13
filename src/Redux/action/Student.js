import { authAxios } from "../../Config/axios"
import { toast } from 'react-toastify'

export const getIntro = () => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/student-dashboard/list-intro-slide` )
            .then(
                response => {
                    resolve( response.data )
                    _dispatch( {
                        type: 'SAVE_DATA',
                        payload: { moduleIntro: response.data.data }
                    } )
                },
                error => reject( error )
            )
            .catch( error => console.log( error ) )
    } )
}


export const getAllLesson = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( "/student-dashboard/list-all-student-lesson" )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getCharacters = () => async dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( "student-dashboard/list-all-characters" )
            .then(
                response => {
                    dispatch( {
                        type: "SAVE_CHARACTER",
                        payload: response.data.data
                    } )
                    resolve( response.data )
                },
                error => reject( error )
            )
            .catch( error => console.log( error ) )
    } )
}

export const getCharactersIntro = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/student-dashboard/list-all-character-description/${data}` )
            .then(
                response => {
                    resolve( response.data )
                },
                error => {
                    reject( error )
                }
            )
            .catch( error => console.log( error ) )
    } )
}




export const getAllQuizQuestion = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/list-all-quiz-question", data )
            .then(
                response => {
                    resolve( response.data )
                    _dispatch( {
                        type: 'SAVE_DATA',
                        payload: { quizQuestion: response.data.data }
                    } )
                },
                error => {
                    reject( error )
                }
            )
            .catch( error => console.log( error ) )
    } )
}

export const quizOptionSubmitted = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/quiz-option-submitted", data )
            .then(
                response => {
                    resolve( response.data )
                    toast.success( response.data.message)
                   
                },
                error => {
                    reject( error )
                    toast.error( error.response.data.message )
                }
            )
            .catch( error => console.log( error ) )
    } )
}

export const quizGameOptionSubmitted = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/quiz-game-option-submitted", data )
            .then(
                response => {
                    resolve( response.data )
                    toast.success(response.data.message)
                   
                },
                error => {
                    reject( error )
                    toast.error(error.response.data.message)
                }
            )
            .catch( error => console.log( error ) )
    } )
}

export const getAllLessonConversation = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/list-all-conversations-slide", data )
            .then(
                response => {
                    resolve( response.data )
                },
                error => {
                    reject( error )
                }
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const getLessonDocument = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/list-all-documents", data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const setCharacter = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/save-character", data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const getStudentCharacter = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( "student-dashboard/get-save-character" )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getAllStudentScore = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/get-all-student-score" ,data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const getStudentUpdatedScore = (data) => async _dispatch  => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "student-dashboard/get-the-updated-score" ,data )
            .then(
                response => {
                    resolve( response.data)
                    _dispatch( {
                        type: 'UPDATED_SCORE_DATA',
                        payload:  response.data.data 
                    } )
                },
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}