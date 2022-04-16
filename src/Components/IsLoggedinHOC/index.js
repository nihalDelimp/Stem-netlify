import React from 'react'
import { useJwt } from 'react-jwt';
import { useSelector ,useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LogOut } from '../../Redux/action/App'


export const IsloggedinHOC = ( WrappedComponent ) => {
    const HocComponent = ( { ...props } ) => {
        const dispatch = useDispatch();
        const token = useSelector( state => state.auth.token )
        const { isExpired } = useJwt( token );
        console.log("isExpiredINHOC" ,isExpired )
        if ( isExpired ) {
          dispatch(LogOut());
            return (
                <Redirect to="/login" />
            )
        }
         else {
            return (
                <WrappedComponent {...props} isTokenExpired={isExpired} />
            )
        }
    }
    return HocComponent
}
export default IsloggedinHOC;