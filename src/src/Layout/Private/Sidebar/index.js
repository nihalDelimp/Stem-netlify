import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../../Components/Logo'
import Menu from '../../../Components/Menu'
import { LogOut } from '../../../Redux/action/App'
import SettingSidebar from  './SettingSidebar'
import SettingSidebarStudent from  './SettingSidebarStudent'

const Sidebar = () => {

    const [menuOpen, setMenuOpen] = useState( true )
    const role = useSelector(state => state.auth.user.user_type);

    
    return (
        <>
        <div className={`sidebar ${menuOpen ? "opened" : ""}`}>
            <div style={{ width: "100%" }}>
                <Logo />
                <Menu />
            </div>
            <button className="btn btn--setting" onClick={() => {
             document.querySelector(".setting--sidebar").classList.toggle('activeSettingbar');
            }}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" fill="white" />
                </svg> */}

                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27.2069 30.4749L30.4403 27.2415L29.3015 23.1044L29.7976 21.9195L33.5416 19.8069V15.2344L29.8082 13.113L29.3204 11.9302L30.4735 7.79097L27.2379 4.56L23.1004 5.69845L21.9182 5.20276L19.8053 1.45837H15.2329L13.1114 5.19177L11.9289 5.67947L7.79037 4.52497L4.55975 7.75559L5.69839 11.8937L5.20269 13.076L1.45831 15.1888V19.7599L5.18835 21.8861L5.67657 23.0699L4.52368 27.2084L7.75552 30.4403L11.8937 29.3016L13.076 29.7974L15.1889 33.5402H19.7602L21.8848 29.8101L23.0684 29.322L27.2069 30.4749ZM27.4934 19.8707L26.2221 22.9072L27.1778 26.3792L26.3489 27.2081L22.8842 26.2429L19.8464 27.4958L18.0648 30.6236H16.8917L15.1249 27.4938L12.0918 26.222L8.61795 27.1779L7.79044 26.3504L8.7556 22.8857L7.50284 19.8482L4.37498 18.0652V16.892L7.50617 15.1251L8.77797 12.0919L7.82212 8.61801L8.64791 7.79222L12.1125 8.75872L15.1514 7.50543L16.9302 4.37504H18.1022L19.869 7.50623L22.9022 8.77803L26.3768 7.82199L27.2064 8.65038L26.2414 12.1144L27.4946 15.1529L30.625 16.9317V18.1037L27.4934 19.8707ZM17.5 23.3334C14.2783 23.3334 11.6666 20.7217 11.6666 17.5C11.6666 14.2784 14.2783 11.6667 17.5 11.6667C20.7216 11.6667 23.3333 14.2784 23.3333 17.5C23.3333 20.7217 20.7216 23.3334 17.5 23.3334ZM20.4166 17.5C20.4166 19.1109 19.1108 20.4167 17.5 20.4167C15.8891 20.4167 14.5833 19.1109 14.5833 17.5C14.5833 15.8892 15.8891 14.5834 17.5 14.5834C19.1108 14.5834 20.4166 15.8892 20.4166 17.5Z" fill="white" />
                </svg>

            </button>
            <button className="btn btn--circle" onClick={() => setMenuOpen( !menuOpen )}>
                {menuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
                    </svg>
                    
                    
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                    </svg>
                )}
            </button>
           
            
        </div>
         {role === "SITE_ADMIN" || role === "SCHOOL_ADMIN" ||  role === "TEACHER" ? <SettingSidebar  /> : null }
         {role === "STUDENT" && <SettingSidebarStudent/>}
         </>
    )
}

export default Sidebar
