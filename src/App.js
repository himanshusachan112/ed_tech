
import { Routes ,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './components/common/Navbar';
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Contactpage from './pages/Contactpage'
import Loginpage from "./pages/Loginpage"
import Signuppage from "./pages/Signuppage"
import Openroute from "./routes/Openroute"
import Privateroute from "./routes/Privateroute"
import Dashboard from './pages/Dashboard'

import Verifyotp from './pages/Verifyotp';
import Forgotpassword from './pages/Forgotpassword';
import Updatepassword from './pages/Updatepassword';
import Myprofile from './components/core/dashboard/studentandinstructor/Myprofile';
import Mycourses from './components/core/dashboard/instructor/Mycourses';
import Mycart from './components/core/dashboard/student/Mycart';
import Mysettings from './components/core/dashboard/studentandinstructor/Mysettings';
import Enrolledcourses from './components/core/dashboard/student/Enrolledcourses';
import Addcourses from './components/core/dashboard/instructor/Addcourses';
import Instructordashboard from './components/core/dashboard/instructor/Instructordashboard';
import {  useSelector } from 'react-redux';
import { variables } from './data/Variables';
import Purchasehistory from './components/core/dashboard/student/Purchasehistory';
import Catalogpage from './pages/Catalogpage';
import CoursePage from './pages/CoursePage';
import Studentroute from './routes/Studentroute';
import Courseplayer from './pages/Courseplayer';


function App() {
  
  const {profile}=useSelector((state)=>state.Profile);
  console.log("profile data is =>",profile)

  return (
    <div className="App">
    
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/about' element={<Aboutpage/>}/>
        <Route path='/contact' element={<Contactpage/>}/>
        <Route path='/catalog/:categoryname' element={<Catalogpage/>}/>

        <Route path='/login' element={<Openroute>
                                        <Loginpage/>
                                      </Openroute>}/>
        <Route path='/signup' element={<Openroute>
                                          <Signuppage/>
                                        </Openroute>}/>
        <Route path='verify-otp' element={<Openroute>
                                            <Verifyotp/>
                                          </Openroute>}/>

        <Route path='/forgotpassword' element={<Openroute>
                                                  <Forgotpassword/>
                                                </Openroute>}/>                     
        
        <Route path='/updatepassword/:token' element={<Openroute>
                                                        <Updatepassword/>
                                                      </Openroute>}/> 

        <Route path='/course/:courseid' element={<Studentroute>
                                                    <CoursePage/>
                                                  </Studentroute>} />

        <Route path='/student/courseplayer/:courseid' element={<Studentroute>
                                                                  <Courseplayer/>
                                                                </Studentroute>}/>

        <Route  element={<Privateroute>
                          <Dashboard/>
                        </Privateroute>}>

                    <Route path='/dashboard/my-profile' element={<Myprofile/>}/>
                    <Route path='/dashboard/my-settings' element={<Mysettings/>}/>
                    

                  {profile?.accounttype===variables.student && (<>
                    <Route path='/dashboard/student/my-cart' element={<Mycart/>}/>
                    <Route path='/dashboard/student/enrolled-courses' element={<Enrolledcourses/>}/>
                    <Route path="/dashboard/student/purchase-history" element={<Purchasehistory/>}/>
                  </>)}

                  {profile?.accounttype===variables.instructor && (<>
                    <Route path='/dashboard/instructor/add-courses'  element={<Addcourses/>}/>
                    <Route path='/dashboard/instructor/dashboard' element={<Instructordashboard/>}/>
                    <Route path='/dashboard/instructor/my-courses' element={<Mycourses/>}/>
                  </>)}
                  
        </Route>
                                      
      


      </Routes>


          <ToastContainer/>
    </div>
  );
}

export default App;
