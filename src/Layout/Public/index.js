 import bg from "../../assets/images/bg.png"
// import bg from "../../assets/images/bg2.jpg"

const PublicLayout = ( { children } ) => {

    return (
        <div className="layout--public" style={{ backgroundImage: `url(${bg})` }}>{children}</div>
    )
}

export default PublicLayout
