import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { closeModal } from '../../Redux/action/App'


const Menu = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const role = useSelector(state => state.auth.user.user_type);
    const ModalOpen = useSelector(state => state.app.current.isModalOpen);

    return (
        <ul className="menu">
            <li className="menu--item">
                <Link to="/" className={`menu--link ${location.pathname === "/" ? "active" : ""}`} onClick={() => {
                    dispatch(closeModal({
                        isModalOpen: false
                    }))
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM3.06565 10.9074C3.35719 11.2805 4.16782 11.758 5.40826 12.1475C5.89668 12.3009 6.4316 12.4357 7.00555 12.5502C7.00186 12.3679 7 12.1844 7 12C7 8.67236 7.60556 5.6673 8.65455 3.64231C5.66412 4.84042 3.46628 7.59699 3.06565 10.9074ZM7.12914 14.6108C5.52334 14.3317 4.14644 13.9093 3.10296 13.3658C3.58837 16.5542 5.74677 19.1927 8.65455 20.3577C7.88867 18.8792 7.35916 16.8783 7.12914 14.6108ZM9.17891 14.8773C10.076 14.9581 11.0209 15 12 15C12.9633 15 13.9124 14.9454 14.8253 14.8441C14.3742 18.4417 13.127 21 12 21C10.8765 21 9.63347 18.4574 9.17891 14.8773ZM14.9863 12.8045C14.0367 12.9275 13.028 13 12 13C10.9558 13 9.95341 12.9483 9.01531 12.8502C9.00522 12.5706 9 12.287 9 12C9 6.98399 10.5936 3 12 3C13.4064 3 15 6.98399 15 12C15 12.2713 14.9953 12.5397 14.9863 12.8045ZM16.8792 14.5269C16.6539 16.8289 16.1208 18.861 15.3454 20.3577C18.3046 19.1721 20.4876 16.4606 20.9212 13.1964C19.861 13.7479 18.4647 14.209 16.8792 14.5269ZM20.9285 10.8601C20.458 11.3883 18.9737 12.0157 16.9962 12.4541C16.9987 12.3035 17 12.1521 17 12C17 8.67236 16.3944 5.6673 15.3454 3.64231C18.3216 4.83471 20.5128 7.57077 20.9285 10.8601Z" fill="#FAFAFA" />
                    </svg>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="menu--item">
                <Link to="/calendar" className={`menu--link ${location.pathname === "/calendar" ? "active" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 6H6V5H4V8H20V5H18V6H16V5H8V6ZM20 10H4V20H20V10ZM16 3H8V2H6V3H4C2.89543 3 2 3.89543 2 5V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V5C22 3.89543 21.1046 3 20 3H18V2H16V3ZM7 14V12H9V14H7ZM11 14H13V12H11V14ZM15 14V12H17V14H15ZM7 16V18H9V16H7ZM13 18H11V16H13V18Z" fill="#FFCA2A" />
                    </svg>
                    <span>Calendar</span>
                </Link>
            </li>
            {role === "STUDENT" && (
                <li className="menu--item">
                    <Link to=  { !ModalOpen ? "/leaderboard" : "#"  } className={`menu--link ${location.pathname === "/leaderboard" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 8V11.5L3 14.5V20H7C7 21.1046 7.89543 22 9 22H11V23H13V22H15C16.1046 22 17 21.1046 17 20H21V14.5L17 11.5V8C17 4.84392 15.0864 1 12 1C8.91356 1 7 4.84392 7 8ZM13 20H15V10V8C15 5.80724 13.6025 3 12 3C10.3975 3 9 5.80724 9 8V10V20H11V14H13V20ZM5 15.5L7 14V18H5V15.5ZM17 18V14L19 15.5V18H17ZM12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z" fill="#FFCA2A" />
                        </svg>
                        <span>Leaderboard</span>
                    </Link>
                </li>
            )}
            {role === "SITE_ADMIN" || role === "SCHOOL_ADMIN" || role === "TEACHER" ?
                (<li className="menu--item">
                    <Link to="/classroom" className={`menu--link ${location.pathname === "/classroom" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H21V18C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20V22ZM18 19C18 18.6494 18.0602 18.3128 18.1707 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H18.1707C18.0602 19.6872 18 19.3506 18 19ZM6 4H19V16H6C5.64936 16 5.31278 16.0602 5 16.1707V5C5 4.44772 5.44772 4 6 4Z" fill="#FFCA2A" />
                        </svg>
                        <span>Course Management</span>
                    </Link>
                </li>) : null}

                {role === "SITE_ADMIN" && (
                <li className="menu--item">
                    <Link to="/school" className={`menu--link ${location.pathname === "/school" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H21V18C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20V22ZM18 19C18 18.6494 18.0602 18.3128 18.1707 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H18.1707C18.0602 19.6872 18 19.3506 18 19ZM6 4H19V16H6C5.64936 16 5.31278 16.0602 5 16.1707V5C5 4.44772 5.44772 4 6 4Z" fill="#FFCA2A" />
                        </svg>
                        <span>School Management</span>
                    </Link>
                </li>)}

                {role === "SITE_ADMIN" && (
                <li className="menu--item">
                    <Link to="/courses" className={`menu--link ${location.pathname === "/courses" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H21V18C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20V22ZM18 19C18 18.6494 18.0602 18.3128 18.1707 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H18.1707C18.0602 19.6872 18 19.3506 18 19ZM6 4H19V16H6C5.64936 16 5.31278 16.0602 5 16.1707V5C5 4.44772 5.44772 4 6 4Z" fill="#FFCA2A" />
                        </svg>
                        <span>Platform Management </span>
                    </Link>
                </li>)}



            {/* {role === "SITE_ADMIN" && (
                <li className="menu--item">
                    <Link to="/course" className={`menu--link ${location.pathname === "/course" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H21V18C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20V22ZM18 19C18 18.6494 18.0602 18.3128 18.1707 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H18.1707C18.0602 19.6872 18 19.3506 18 19ZM6 4H19V16H6C5.64936 16 5.31278 16.0602 5 16.1707V5C5 4.44772 5.44772 4 6 4Z" fill="#FFCA2A" />
                        </svg>
                        <span>Course Management</span>
                    </Link>
                </li>
            )} */}
            
        </ul>
    )
}

export default Menu
