import { authAxios } from "../../Config/axios"


export const getTeacherList = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( 'school-admin/list-all-teacher' ,data )
            .then(
                response => resolve( response.data),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getTeacherAndSchoolAdmin = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( 'school-admin/list-all-teacher-school-admin' ,data )
            .then(
                response => resolve( response.data),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const createClassroom = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "school-admin/create-teacher-class", data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getClassroomList = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/school-admin/list-teacher-courses-details" )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const deleteClassroom = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( "/school-admin/remove-teacher-class-details", { data } )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getSchoolTeacherClassroom = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "/school-admin/teacher-class", data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const sendinvite = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( '/school-admin/add-teacher-school-admin', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getSchoolCodeAction = (id) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get(`/school-admin/get-school-code-detail/${id}`)
            .then(
                response => resolve(response.data),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const deleteTeacherAction = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete(`/school-admin/remove-teacher-details/${data}`)
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getTeacherandSchoolAdminDetails = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post('/school-admin/get-teacher-school-admin-details', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getClassroomStudents = data => async () => {
    return new Promise(async (resolve, reject) =>
        await authAxios().post(`/school-admin/student-list-specific-class`, data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error =>
                    console.log(error)
            ))
}

export const getClassroomLessons = data => async () => {
    return new Promise(async (resolve, reject) =>
        await authAxios().post(`/school-admin/list-class-courses`, data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error =>
                    console.log(error)
            ))
}


export const currentRankAction = data => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().post(`/school-admin/get-student-ranks`, data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error =>
                    console.log(error)
            )
    })
}

export const weeklyRankAction = data => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().post(`school-admin/get-weekly-student-rank`, data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error =>
                    console.log(error)
            )
    })
}

export const studentReportDetails = data => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().post(`/school-admin/get-student-details`, data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error =>
                    console.log(error)
            )
    })
}

export const getCourseList = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post('/school-admin/list-all-course-details' ,data)
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const getClassListAction = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post('/school-admin/list-all-class-details' ,data)
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const assignCourseToClass = ( data ) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post('/school-admin/assign-course-to-class', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}