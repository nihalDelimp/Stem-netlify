import { authAxios } from "../../Config/axios"

export const createClassroom = data => async () =>
    new Promise(async (resolve, reject) =>
        await authAxios().post("teacher/create-teacher-class", data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error => console.log(error)
            ))



export const getTeacherClassrooms = () => async () =>
    new Promise(async (resolve, reject) =>
        await authAxios().get("teacher/list-specific-teacher-classes")
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error => console.log(error)
            ))

export const getClassroomStudents = data => async () => {
    return new Promise(async (resolve, reject) =>
        await authAxios().post(`teacher/student-list-specific-class`, data)
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
        await authAxios().post(`teacher/list-class-courses`, data)
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


export const deleteClassroomStudent = (data, id) => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().delete(`teacher/remove-student-from-class/${id}`, { data })
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


export const renameClassroom = (data, id) => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().put(`teacher/rename-classroom/${id}`, data)
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



export const deleteTeacherClassroom = (data, id) => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().delete(`teacher/remove-teacher-class/${id}`, { data })
            .then(
                response => {
                    resolve(response.data)
                },
                error => {
                    reject(error)
                }
            )
            .catch(
                error => console.log(error)
            )
    })
}

export const createStudent = data => async () => {
    return new Promise(async (resolve, reject) =>
        await authAxios().post("teacher/add-student-teacher-class", data)
            .then(
                response =>
                    resolve(response.data)
                ,
                error =>
                    reject(error)
            )
            .catch(
                error => console.log(error)
            ))
}


export const unlockedLesson = (id, data) => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().put(`/teacher/unlock-lesson/${id}`, data)
            .then(
                response => {
                    resolve(response.data)
                },
                error => {
                    reject(error)
                }
            )
            .catch(
                error => console.log(error)
            )
    })
}

export const currentRankAction = data => async () => {
    return new Promise(async (resolve, reject) => {
        await authAxios().post(`/teacher/get-student-ranks`, data)
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
        await authAxios().post(`/teacher/get-weekly-student-rank`, data)
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
        await authAxios().post(`teacher/get-student-details`, data)
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

export const getPDClassroomLessons = data => async () => {
    return new Promise(async (resolve, reject) =>
        await authAxios().post(`teacher/list-pd-class-courses`, data)
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
