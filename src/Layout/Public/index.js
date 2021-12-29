import bg from "../../assets/images/bg.png"

const PublicLayout = ( { children } ) => {

    return (
        <div className="layout--public" style={{ backgroundImage: `url(${bg})` }}>{children}</div>
    )
}

export default PublicLayout
