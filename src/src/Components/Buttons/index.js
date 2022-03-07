import React from 'react'

export const SubmitButton = ( { children, ...rest } ) => {
    return (
        <button {...rest}>
            {children}
        </button>
    )
}
