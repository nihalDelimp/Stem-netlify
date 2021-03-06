import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Modal from '../../Components/Modal'
import { getModuleData } from '../../Redux/action/App'


const Dashboard = ( props ) => {

    const { getModuleData, name } = props
    const modal = useSelector( state => state.app )
    const [, setModalOpen] = useState( true )

    const location = useLocation()

    return (
        <>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {modal.current.isModalOpen
                    ? <Modal setModalOpen={setModalOpen} />
                    : ""}
            </AnimatePresence>

            <div className="container">
                <div className="grid">
                    <div className="grid---">
                        <div className="card card--welcome">
                            <div className="card--body">
                                <h2>{`Welcome back! ${name}`}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="grid--">
                        <div className="grid--header">
                            <h2>This week’s modules</h2>
                            <button className="btn btn--circle option">
                                {/* <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.7083 12.8333C13.4562 12.8333 11.5638 11.3461 11.0273 9.33333H2.41667V7H11.0273C11.5638 4.98723 13.4562 3.5 15.7083 3.5C18.3777 3.5 20.5417 5.58934 20.5417 8.16667C20.5417 10.744 18.3777 12.8333 15.7083 12.8333ZM22.9583 7H26.5833V9.33333H22.9583V7ZM9.66667 24.5C7.41453 24.5 5.52216 23.0128 4.98561 21H2.41667V18.6667H4.98561C5.52216 16.6539 7.41453 15.1667 9.66667 15.1667C12.336 15.1667 14.5 17.256 14.5 19.8333C14.5 22.4107 12.336 24.5 9.66667 24.5ZM16.9167 21H26.5833V18.6667H16.9167V21ZM12.0833 19.8333C12.0833 21.122 11.0014 22.1667 9.66667 22.1667C8.33198 22.1667 7.25 21.122 7.25 19.8333C7.25 18.5447 8.33198 17.5 9.66667 17.5C11.0014 17.5 12.0833 18.5447 12.0833 19.8333ZM18.125 8.16667C18.125 9.45533 17.043 10.5 15.7083 10.5C14.3736 10.5 13.2917 9.45533 13.2917 8.16667C13.2917 6.878 14.3736 5.83333 15.7083 5.83333C17.043 5.83333 18.125 6.878 18.125 8.16667Z" fill="#414141" />
                                </svg> */}
                            </button>
                        </div>
                        <div className="grid--body">
                            <div className="module--group">
                                <Link
                                    to={{
                                        pathname: '/intro/7468abc',
                                        state: {
                                            prevPath: location.pathname
                                        }
                                    }}
                                    onClick={() => getModuleData( { isModalOpen: true } )}>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="module--item"
                                        style={{ backgroundColor: `#ED724B` }}
                                    >
                                        <span className="text--outline">
                                            Module 1
                                        </span>
                                        <button className="btn btn--circle option">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>
                                        </button>
                                        <h5 className="module--title">Module 1: Welcome to STEMUnicorn!!</h5>
                                    </motion.div>
                                </Link>

                                <Link to="/intro/@GSL23473" onClick={() => getModuleData( { isModalOpen: true } )}>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="module--item"
                                        style={{ backgroundColor: `#F6C940` }}
                                    >
                                        <span className="text--outline">
                                            Module 2
                                        </span>
                                        <button className="btn btn--circle option">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>
                                        </button>
                                        <h5 className="module--title">Module 2: Design thinking</h5>
                                    </motion.div>
                                </Link>
                                <Link to="/intro/7468abc" onClick={() => getModuleData( { isModalOpen: true } )}>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="module--item"
                                        style={{ backgroundColor: `#979494` }}
                                    >
                                        <span className="text--outline">
                                            Module 3
                                        </span>
                                        <button className="btn btn--circle option close">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" /></svg>
                                        </button>
                                        <h5 className="module--title">Module 3: Look for your market</h5>
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* <div className="grid- overview">
                        <div className="grid--header">
                            <h2>Budget overview</h2>
                        </div>
                        <div className="grid--body">
                            <div className="card card--overview">
                                <div className="card--body">
                                    <div className="graph--card"></div>
                                    <h3>Recent activities</h3>
                                    <ul className="list--group">
                                        <li className="list--item">
                                            <p>Rennovated headquarter office</p>
                                            <span className="list--tag">200K</span>
                                        </li>
                                        <li className="list--item">
                                            <p>Recuitment of software developer</p>
                                            <span className="list--tag">50K</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const { user } = state.auth
    return user
}


export default connect( mapStateToProps, { getModuleData } )( Dashboard )

