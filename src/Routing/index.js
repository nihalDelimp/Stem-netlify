import { Route, Switch } from 'react-router-dom';
import Invitedlogin from '../Components/Login/InvitedLogin';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup';
import StudentDashboard from '../Container/Student';
import PrivateLayout from '../Layout/Private';
import PublicLayout from '../Layout/Public';
import AppRoute from './AppRoute';
import Authorization from './Authorization';
import PrivateRoute from './PrivateRoute';
import LessonPerformance from '../Container/Teacher/LessonPerformance/LessonPerformance';
import Classrooms from '../Container/Teacher/Classroom';
import ClassroomForSchoolAdmin from '../Container/School/Classroom/Classroom';
import { useSelector } from 'react-redux';
import LessonsList from '../Container/Siteadmin/Lessons/LessonsList';
import LessonAdd from '../Container/Siteadmin/Lessons/LessonAdd/index';
import SchoolTeacher from '../Container/School/Teacher';
import Leaderboard from '../Container/Student/Leaderboard';
import AddTeacher from '../Container/SchooladminDashboard/Classrooms/AddTeacher'
import classroomsStudentdata from '../Container/Teacher/LessonPerformance/classroomsStudentdata'
import SchoolAdminClassroom from '../Container/School/index'





const ALLUser = Authorization( ['TEACHER', 'STUDENT', 'SCHOOL_ADMIN', "SITE_ADMIN"] );
// const SiteAdmin = Authorization( ["SITE_ADMIN"] );
const Student = Authorization( ["STUDENT"] );
const SiteAdminAndTeacher = Authorization( ["SITE_ADMIN", "TEACHER"] )
// const TeacherAndSchoolAdmin = Authorization( ["SCHOOL_ADMIN", "TEACHER"] )
 const Teacher = Authorization( ['TEACHER'] )
const SchoolAdmin = Authorization( ["SCHOOL_ADMIN"] )
const AllAdmission = Authorization( ["SITE_ADMIN", "SCHOOL_ADMIN", "TEACHER"] )




const Routing = () => {

    const role = useSelector( state => state.auth.user.user_type )

    return (
        <Switch>
            <AppRoute
                exact
                path="/login"
                component={Login}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/invited-login"
                component={Invitedlogin}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/invited-login/:code"
                component={Invitedlogin}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/signup"
                component={Signup}
                layout={PublicLayout} />
            <PrivateRoute
                exact
                path="/"
                component={ALLUser( role === "SCHOOL_ADMIN"
                    ? SchoolAdminClassroom
                    : StudentDashboard  )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/addTeacher"
                component={SchoolAdmin(AddTeacher)}
                layout={PrivateLayout} />
            //AddTeacher
            <PrivateRoute
                exact
                path="/intro/:id"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/:id"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/quiz/:id"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/intro/"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/intro/:id"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/calendar"
                component={ALLUser( StudentDashboard )}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/leaderboard"
                component={Student( Leaderboard )}
                layout={PrivateLayout} />
//--------------------------------------------------------------------------------------------
            <PrivateRoute
                exact
                path="/classroom"
                component={AllAdmission(
                    role === "SCHOOL_ADMIN"
                        ? ClassroomForSchoolAdmin
                        : Classrooms )}
                layout={PrivateLayout} />

            <PrivateRoute
                exact
                path="/classroom/:id"
                component={AllAdmission(
                    role === "TEACHER"
                        ? LessonPerformance
                        : role === "SCHOOL_ADMIN"
                            ? SchoolTeacher
                            : LessonsList )}
                layout={PrivateLayout} />

            <PrivateRoute
                exact
                path="/course"
                component={SiteAdminAndTeacher( LessonsList )}
                layout={PrivateLayout} />
            
            <PrivateRoute
                exact
                path="/classroomsStudentdata"
                component={Teacher( classroomsStudentdata )}
                layout={PrivateLayout} />
           //---------------------------------------------------------------------------------------------

            <PrivateRoute
                exact
                path="/lesson-add"
                component={SiteAdminAndTeacher( LessonAdd )}
                layout={PrivateLayout} />

            <PrivateRoute
                exact
                path="/lessonperformance"
                component={LessonPerformance}
                layout={PrivateLayout} />

            <Route
                path="*"
                component={() => (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}>
                        <h1 style={{ color: "#000", fontSize: "2rem" }}>Page Not Found!!</h1>
                    </div>
                )}
            />
        </Switch>
    )
}

export default Routing
