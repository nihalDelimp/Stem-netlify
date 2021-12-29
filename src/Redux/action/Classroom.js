import { authAxios } from "../../Config/axios";

export const getAllClassroom = () => async () => new Promise( async ( resolve, reject ) => {
    await authAxios().get( "/site-admin/list-teacher-class" )
        .then(
            response => resolve( response.data ),
            error => reject( error )
        )
        .catch(
            error => console.log( error )
        );
} )