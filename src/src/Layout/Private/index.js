import Sidebar from "./Sidebar"

const PrivateLayout = ( { children } ) => {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="body">
                {children}
            </div>
        </div>
    )
}

export default PrivateLayout
