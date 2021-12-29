import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ( {
    component: Component,
    layout: Layout,
    ...rest } ) => {

    const token = useSelector( state => state.auth.token )

    return (
        <Route
            {...rest}
            render={( props ) => (
                token
                    ? (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )
                    : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
            )}
        />
    )
}

export default PrivateRoute
