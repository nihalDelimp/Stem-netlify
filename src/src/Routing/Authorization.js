import React from 'react'
import { useSelector } from "react-redux"

const Authorization = allowedRoles => WrappedComponent => {

    const WithAuthorization = ( props ) => {
        const user_type = useSelector( state => state.auth.user.user_type )
        if ( allowedRoles.includes( user_type ) ) {
            return <WrappedComponent {...props} />;
        } else {
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <h1 style={{ color: "#000", fontSize: "2rem" }}>This page not for you</h1>
                </div>
            );
        }

    }
    return WithAuthorization
}

export default Authorization
