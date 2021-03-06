import { Route, Switch } from 'react-router-dom';
import Invitedlogin from '../Components/Login/InvitedLogin';
import Login from '../Components/Login/Login';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import ForgotPassword from '../Components/ForgetPassword/ForgetPassword';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
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
import AddTeacher from '../Container/School/Teacher/AddTeacher'
import StudentPerformanceReport from '../Container/Teacher/LessonPerformance/performanceReport'
import SchoolAdminClassroom from '../Container/School/index'
import TeacherAndSchoolAdminDetails from '../Container/School/teacherAndSchoolAdminDetails';
import LessonAndStudent from '../Container/School/LessonAndStudent/LessonAndStudent';
import studentReport from '../Container/School/LessonAndStudent/studentReport';
import Schools from '../Container/Siteadmin/SchoolManagement';
import SchoolAdministrations from '../Container/Siteadmin/SchoolAdministration';
import Courses from '../Container/Siteadmin/courses';
import LessonsListNew from '../Container/Siteadmin/LessonManagement/LessonsList';
import SchoolAdminDetail from '../Container/Siteadmin/SchoolAdministration/SchoolAdminDetail';
import LessonAddWeekly from '../Container/Siteadmin/LessonManagement/LessonAdd/index';
import SchoolAdminCourses from '../Container/School/courses/index'



const ALLUser = Authorization(['TEACHER', 'STUDENT', 'SCHOOL_ADMIN', "SITE_ADMIN"]);
const SiteAdmin = Authorization(["SITE_ADMIN"]);
const Student = Authorization(["STUDENT"]);
const SiteAdminAndTeacher = Authorization(["SITE_ADMIN", "TEACHER"])
const TeacherAndSchoolAdmin = Authorization(["SCHOOL_ADMIN", "TEACHER"])
const Teacher = Authorization(['TEACHER'])
const SchoolAdmin = Authorization(["SCHOOL_ADMIN"])
const AllAdmission = Authorization(["SITE_ADMIN", "SCHOOL_ADMIN", "TEACHER"])


const Routing = () => {
    const role = useSelector(state => state.auth.user.user_type)

    return (
        <Switch>
            <AppRoute
                exact
                path="/login"
                component={Login}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/reset-password"
                component={ResetPassword}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/forgot-password"
                component={ForgotPassword}
                layout={PublicLayout} />
            <AppRoute
                exact
                path="/change-password"
                component={ChangePassword}
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
                component={ALLUser(role === "SCHOOL_ADMIN"
                    ? SchoolAdminClassroom
                    : StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/addTeacher"
                component={SchoolAdmin(AddTeacher)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/add-new-class"
                component={SchoolAdmin(ClassroomForSchoolAdmin)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/school"
                component={SiteAdmin(Schools)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/school-admin-details/:id"
                component={SiteAdmin(SchoolAdminDetail)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/courses"
                component={SiteAdmin(Courses)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/courses/:id"
                component={SiteAdmin(LessonsListNew)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/school/:id"
                component={SiteAdmin(SchoolAdministrations)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/adminDetails/:id"
                component={SchoolAdmin(TeacherAndSchoolAdminDetails)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/intro/:id"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/:id"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/quiz/:id"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/intro/"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/character/intro/:id"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/calendar"
                component={ALLUser(StudentDashboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/leaderboard"
                component={Student(Leaderboard)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/classroom"
                component={TeacherAndSchoolAdmin(
                    role === "SCHOOL_ADMIN"
                        ? SchoolAdminCourses
                        : Classrooms)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/classroom/:id"
                component={TeacherAndSchoolAdmin(
                    role === "TEACHER"
                        ? LessonPerformance
                        : role === "SCHOOL_ADMIN"
                            ? LessonAndStudent
                            : LessonsList)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/course"
                component={SiteAdminAndTeacher(LessonsList)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/performance-report/:id"
                component={Teacher(StudentPerformanceReport)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/student-report/:id"
                component={SchoolAdmin(studentReport)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/lesson-add"
                component={SiteAdminAndTeacher(LessonAdd)}
                layout={PrivateLayout} />
            <PrivateRoute
                exact
                path="/lesson-add-weekly"
                component={SiteAdminAndTeacher(LessonAddWeekly)}
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
