import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Logo = () => {
    const role = useSelector( state => state.auth.user.user_type )

    return (
        <Link to="/" className="brand--logo">
            <img src={require( "../../assets/images/logo.png" ).default} alt="" />
            {role === "student" ? null : (
                <span className="logo--role">
                    {role === "SCHOOL_ADMINISTRATOR"
                        ? "School Admin"
                        : role
                    }
                </span>
            )}
        </Link>
    )
}

export default Logo
