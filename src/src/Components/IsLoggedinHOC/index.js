import React from 'react'
import { useJwt } from 'react-jwt';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const IsloggedinHOC = ( WrappedComponent ) => {
    const HocComponent = ( { ...props } ) => {
        const token = useSelector( state => state.auth.token )
        const { isExpired } = useJwt( token );
        if ( isExpired ) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <WrappedComponent {...props} isTokenExpired={isExpired} />
            )
        }
    }
    return HocComponent
}
