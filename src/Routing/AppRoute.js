import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const AppRoute = ( {
    component: Component,
    layout: Layout,
    ...rest } ) => {


    return (
        <Route
            {...rest}
            render={( props ) => (
                <Layout>
                    <Component {...props} />
                </Layout>
               
            )}
        />
    )
}

export default AppRoute
