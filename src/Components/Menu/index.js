import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'


const Menu = () => {

    const location = useLocation();
    // const user_type = useSelector( state => state.auth.user.user_type );

    return (
        <ul className="menu">
            <li className="menu--item">
                <Link to="/" className={`menu--link ${location.pathname === "/" ? "active" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM3.06565 10.9074C3.35719 11.2805 4.16782 11.758 5.40826 12.1475C5.89668 12.3009 6.4316 12.4357 7.00555 12.5502C7.00186 12.3679 7 12.1844 7 12C7 8.67236 7.60556 5.6673 8.65455 3.64231C5.66412 4.84042 3.46628 7.59699 3.06565 10.9074ZM7.12914 14.6108C5.52334 14.3317 4.14644 13.9093 3.10296 13.3658C3.58837 16.5542 5.74677 19.1927 8.65455 20.3577C7.88867 18.8792 7.35916 16.8783 7.12914 14.6108ZM9.17891 14.8773C10.076 14.9581 11.0209 15 12 15C12.9633 15 13.9124 14.9454 14.8253 14.8441C14.3742 18.4417 13.127 21 12 21C10.8765 21 9.63347 18.4574 9.17891 14.8773ZM14.9863 12.8045C14.0367 12.9275 13.028 13 12 13C10.9558 13 9.95341 12.9483 9.01531 12.8502C9.00522 12.5706 9 12.287 9 12C9 6.98399 10.5936 3 12 3C13.4064 3 15 6.98399 15 12C15 12.2713 14.9953 12.5397 14.9863 12.8045ZM16.8792 14.5269C16.6539 16.8289 16.1208 18.861 15.3454 20.3577C18.3046 19.1721 20.4876 16.4606 20.9212 13.1964C19.861 13.7479 18.4647 14.209 16.8792 14.5269ZM20.9285 10.8601C20.458 11.3883 18.9737 12.0157 16.9962 12.4541C16.9987 12.3035 17 12.1521 17 12C17 8.67236 16.3944 5.6673 15.3454 3.64231C18.3216 4.83471 20.5128 7.57077 20.9285 10.8601Z" fill="#FAFAFA" />
                    </svg>
                    <span>Dashboard</span>
                </Link>
            </li>
            {/* <li className="menu--item">
                <Link to="/calendar" className={`menu--link ${location.pathname === "/calendar" ? "active" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 6H6V5H4V8H20V5H18V6H16V5H8V6ZM20 10H4V20H20V10ZM16 3H8V2H6V3H4C2.89543 3 2 3.89543 2 5V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V5C22 3.89543 21.1046 3 20 3H18V2H16V3ZM7 14V12H9V14H7ZM11 14H13V12H11V14ZM15 14V12H17V14H15ZM7 16V18H9V16H7ZM13 18H11V16H13V18Z" fill="#FFCA2A" />
                    </svg>
                    <span>Calendar</span>
                </Link>
            </li> */}
            <li className="menu--item">
                <Link to="/leaderboard" className={`menu--link ${location.pathname === "/leaderboard" ? "active" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 8V11.5L3 14.5V20H7C7 21.1046 7.89543 22 9 22H11V23H13V22H15C16.1046 22 17 21.1046 17 20H21V14.5L17 11.5V8C17 4.84392 15.0864 1 12 1C8.91356 1 7 4.84392 7 8ZM13 20H15V10V8C15 5.80724 13.6025 3 12 3C10.3975 3 9 5.80724 9 8V10V20H11V14H13V20ZM5 15.5L7 14V18H5V15.5ZM17 18V14L19 15.5V18H17ZM12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z" fill="#FFCA2A" />
                    </svg>
                    <span>Leaderboard</span>
                </Link>
            </li>
            {/* {user_type === "SITE_ADMIN" && ( */}
            <li className="menu--item">
                <Link to="/classroom" className={`menu--link ${location.pathname === "/classroom" ? "active" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H21V18C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20V22ZM18 19C18 18.6494 18.0602 18.3128 18.1707 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H18.1707C18.0602 19.6872 18 19.3506 18 19ZM6 4H19V16H6C5.64936 16 5.31278 16.0602 5 16.1707V5C5 4.44772 5.44772 4 6 4Z" fill="#FFCA2A" />
                    </svg>
                    <span>Course Management</span>
                </Link>
                {/* <Link to="/classroom" className={`menu--link ${location.pathname === "/classroom" ? "active" : ""}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H1.41604C2.1876 9.2341 3.94968 8 6 8C7.8244 8 9.42059 8.97712 10.2938 10.4366C10.7845 10.158 11.3765 10 12 10C12.6235 10 13.2155 10.158 13.7062 10.4366C14.5794 8.97712 16.1756 8 18 8C20.0503 8 21.8124 9.2341 22.584 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13C23 15.7614 20.7614 18 18 18C15.2386 18 13 15.7614 13 13C13 12.8313 13.0084 12.6645 13.0247 12.5H13C13 12.2966 12.6046 12 12 12C11.3954 12 11 12.2966 11 12.5H10.9753C10.9916 12.6645 11 12.8313 11 13C11 15.7614 8.76142 18 6 18C3.23858 18 1 15.7614 1 13ZM6 16C7.65685 16 9 14.6569 9 13C9 11.3431 7.65685 10 6 10C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16ZM21 13C21 14.6569 19.6569 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C19.6569 10 21 11.3431 21 13Z" fill="#FFCA2A" />
                        </svg>
                        <span>Classroom management</span>
                    </Link> */}
            </li>
            {/* )} */}
            {/* {user_type === "SITE_ADMIN" && (
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
