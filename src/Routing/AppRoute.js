import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const AppRoute = ( {
    component: Component,
    layout: Layout,
    ...rest } ) => {

 const token = useSelector( state => state.auth.token )

    return (
        <Route
            {...rest}
            render={( props ) => (
                token ? 
                 (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                )
                :
               ( <Layout>
                    <Component {...props} />
                </Layout>
               )
            )}
        />
    )
}

export default AppRoute
