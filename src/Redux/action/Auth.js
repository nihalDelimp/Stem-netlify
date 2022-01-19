import { withoutAuthAxios ,authAxios  } from "../../Config/axios"

export const login = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().post( "/auth/login", data )
            .then(
                response => {
                     resolve( response.data )
                    _dispatch( { type: "USER_DATA_UPDATE", payload: response.data.data.user } );
                    _dispatch( { type: "SAVE_TOKEN", payload: response.data.data.token ? response.data.data.token : null } )
                },
                error => {
                    reject( error )
                }
            )
            .catch(
                error => {
                    console.log( error );
                }
            )
    } )
}

export const signup = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().post( "/auth/register", data )
            .then(
                response => {
                    resolve( response.data )
                    _dispatch( { type: "USER_DATA_UPDATE", payload: response.data.data.user } );
                    _dispatch( { type: "SAVE_TOKEN", payload: response.data.data.token } )
                },
                error => {
                    reject( error )
                }
            )
            .catch(
                error => {
                    console.log( error );
                }
            )
    } )
}

export const forgotPassword = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().post( "url", data )
            .then(
                response => {
                    resolve( response.data )
                },
                error => {
                    reject( error.response )
                }
            )
            .catch(
                error => {
                    console.log( error )
                }
            )
    } )
}

export const resetPassword = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().post( "/auth/reset-password", data )
            .then(
                response => {
                     resolve( response.data )
                },
                error => {
                    reject( error )
                }
            )
            .catch(
                error => {
                    console.log( error );
                }
            )
    } )
}


export const profileListUserDetails = () => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "profile/list-user-details" )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}