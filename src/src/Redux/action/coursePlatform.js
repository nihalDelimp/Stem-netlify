import { authAxios } from "../../Config/axios";
import { toast } from 'react-toastify'


export const addNewCourse = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( '/platform-dashboard/add-new-courses', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getCourseList = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( '/platform-dashboard/list-all-course-details')
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const deleteCourseAction = ( id ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( `/platform-dashboard/delete-course-details/${id}` )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getCourseDetailAction = (id) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( `/platform-dashboard/get-edit-course-details/${id}` )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const updateCourseAction = (id , data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( `/platform-dashboard/edit-course-details/${id}`, data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getAllCourseAvailable = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post(`/platform-dashboard/courses-details-available`, data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const assignCourseToSchool = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post('/school-dashboard/assign-courses-to-school', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getAssignedCourse = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( '/school-dashboard/get-assign-courses-to-school' , data)
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


// ------------------------WEEKLY COURSES FOR PLATFORM DASHBOARD--------------------------

export const createWeeklyCourses = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/platform-dashboard/create-weekly-course", data )
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

export const getWeeklyCourses = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get(`/platform-dashboard/get-weekly-course/${data}` )
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

export const updateWeeklyCourses = ( data, id ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put(`platform-dashboard/update-weekly-course/${id}`, data )
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
        await authAxios().post("/platform-dashboard/create-weekly-question-quiz", data )
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
        await authAxios().get( `/platform-dashboard/get-weekly-question-details/${data}` )
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
        await authAxios().put( `/platform-dashboard/update-weekly-question-details/${id}`, data )
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
        await authAxios().post( "/platform-dashboard/create-weekly-question-quiz-games", data )
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
        await authAxios().get( `/platform-dashboard/get-weekly-game-details/${data}` )
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
        await authAxios().put(`/platform-dashboard/update-weekly-games-details/${id}`, data )
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

export const createCourseDocs = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/platform-dashboard/create-weekly-courses", data )
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
        await authAxios().post("/platform-dashboard/create-lesson-images-slides", data )
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

export const updateLessonConversationImage = (id , data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put(`/platform-dashboard/update-lesson-images-slides/${id}`, data )
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
        await authAxios().post("/platform-dashboard/get-weekly-slide-image", data )
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
        await authAxios().post("/platform-dashboard/list-weekly-lesson-slide", data )
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
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete(`/platform-dashboard/delete-lesson-conversation/${id}` )
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
        await authAxios().put(`/platform-dashboard/update-lesson-conversation/${id}` ,data)
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
        .post("/platform-dashboard/courses-details-available", data )
}

export const createLessonConversation = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post("/platform-dashboard/create-lesson-slides", data )
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
        await authAxios().delete(`/platform-dashboard/delete-class-courses/${data}` )
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
        await authAxios().delete(`platform-dashboard/delete-teacher-class/${data}` )
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
        await authAxios().get(`platform-dashboard/get-weekly-courses-documents/${id}` )
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
        await authAxios().put(`/platform-dashboard/update-weekly-courses-documents/${id}` ,fileData)
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