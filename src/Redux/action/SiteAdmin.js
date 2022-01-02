import { authAxios } from "../../Config/axios";
import { toast } from 'react-toastify'

export const createWeekLesson = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-courses-details", data )
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


export const createQuizQuestions = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-weekly-question-quiz", data )
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

export const getWeeklyQuestionDetails = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/site-admin/get-weekly-question-details/${data}` )
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

export const updateQuizQuestions = ( data, id ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `/site-admin/update-weekly-question-details/${id}`, data )
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

export const createGameQuestions = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-weekly-question-quiz-games", data )
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

export const getGameQuestionsDetails = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/site-admin/get-weekly-game-details/${data}` )
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


export const updateGameQuizQuestions = ( data, id ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `/site-admin/update-weekly-games-details/${id}`, data )
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


export const createCourse = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-weekly-courses", data )
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


export const createLessonConversationImage = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-lesson-images-slides", data )
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

export const getLessonConversationImage = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/get-weekly-slide-image", data )
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


export const getLessonConversation = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/list-weekly-lesson-slide", data )
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

export const DeleteLessonSlideConversation = ( id ) => async () => {
    console.log( "id in delete conversastion", id )
    // let id = data.id
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( `/site-admin/delete-lesson-conversation/${id}` )
            .then(
                response => {
                    resolve( response.data )
                    toast.success( response.data.message )
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

export const UpdateLessonSlideConversation = (id,data) => async () => {
    console.log( "data in update conversastion", id )
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `/site-admin/update-lesson-conversation/${id}` ,data)
            .then(
                response => {
                    resolve( response.data )
                    toast.success(response.data.message )
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



export const getAllLCourse = data => async () => {
    return await authAxios()
        .post( "/site-admin/courses-details-available", data )
}


export const createLessonConversation = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/site-admin/create-lesson-slides", data )
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


export const deleteCourse = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( `/site-admin/delete-class-courses/${data}` )
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

export const getCourseData = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/site-admin/get-weekly-courses-details/${data}` )
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


export const updateCourseData = ( data, id ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `site-admin/update-weekly-courses-details/${id}`, data )
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


export const deleteSiteAdminClassroom = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( `site-admin/delete-teacher-class/${data}` )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const getWeekLession = id => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `site-admin/get-weekly-courses-documents/${id}` )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const updatevideodocs = ( fileData ,id ) => async () => {
    console.log( "data in update conversastion", id )
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `/site-admin/update-weekly-courses-documents/${id}` ,fileData)
            .then(
                response => {
                    resolve( response.data )
                    toast.success( response.data.message )
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
