import { withoutAuthAxios ,authAxios  } from "../../Config/axios"

export const login = data => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().post( "/auth/login", data )
            .then(
                response => {
                     resolve( response.data )
                    _dispatch( { type: "USER_DATA_UPDATE", payload: response.data.data.user } );
                    _dispatch( { type: "SAVE_TOKEN", payload: response.data.data.token ? response.data.data.token : null } );
                    _dispatch( { type: "USER_PASSWORD", payload: data.password } );
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
        await withoutAuthAxios().post( "/auth/forgot-password", data )
            .then(
                response => {
                    resolve( response.data )
                },
                error => {
                    reject(error.response)
                }
            )
            .catch(
                error => {
                    console.log( error )
                }
            )
    } )
}

export const changePassword = ( id, data) => async _dispatch => {
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

  

export const resetPassword = (id,data) => async _dispatch => {
    return new Promise( async ( resolve, reject ) => {
        await withoutAuthAxios().put( `/auth/reset-user-password/${id}`, data )
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


export const updateUsersProfile = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().put( "/auth/update-user-profile", data )
            .then(
                response => {
                    resolve( response.data )
                },
                error =>{
                 reject( error )
                }

            )
            .catch(
                error => console.log( error )
            )
    } )
}

export const profileListUserDetails = (data) => async () => {
    return new Promise( async ( resolve, reject ) => {
        await authAxios().post( "profile/list-user-details" ,data )
            .then(
                response => resolve( response.data ),
                error => reject( error )
            )
            .catch(
                error => console.log( error )
            )
    } )
}