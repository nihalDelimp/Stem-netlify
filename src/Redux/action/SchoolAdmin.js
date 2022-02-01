import { authAxios } from "../../Config/axios"


export const getTeacherList = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().get( 'school-admin/list-all-teacher' )
            .then(
                response => resolve( response.data ),
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
        await authAxios().post( "school-admin/list-teacher-courses-details" )
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
        await authAxios().delete( "school-admin/remove-teacher-class-details", { data } )
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
        await authAxios().post( "school-admin/teacher-class", data )
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
        await authAxios().post( 'school-admin/add-teacher-school-admin', data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}


export const deleteTeacherAction = data => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().delete( `/school-admin/remove-teacher-details/${data}`)
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
        await authAxios().post( '/school-admin/get-teacher-school-admin-details', data )
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
