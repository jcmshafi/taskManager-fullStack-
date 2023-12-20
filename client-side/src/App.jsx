import { Navigate,BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import NewPage from "./pages/NewPage";
import ProgressPage from "./pages/ProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CanceledPage from "./pages/CanceledPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Page404 from "./pages/Page404";
import FullscreenLoader from './components/masterLayout/FullscreenLoader';
import {getToken} from "./helper/SessionHelper";
import SendOTPPage from "./pages/AccountRecover/SendOTPPage";
import VerifyOTPPage from "./pages/AccountRecover/VerifyOTPPage";
import CreatePasswordPage from "./pages/AccountRecover/CreatePasswordPage";


const App = () => {

  if(getToken()){
    return (
        
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DashboardPage/>}/>
                    <Route exact path="/Create" element={<CreatePage />}/>
                    <Route exact path="/All" element={<NewPage />}/>
                    <Route exact path="/Progress"  element={<ProgressPage />}/>
                    <Route exact path="/Completed"  element={<CompletedPage />}/>
                    <Route exact path="/Canceled" element={<CanceledPage />}/>
                    <Route exact path="/Profile" element={<ProfilePage />}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
                <FullscreenLoader/>
                <ToastContainer/>
            </BrowserRouter>
    );

}
else {



  return (
    
       <BrowserRouter>
        <Routes>
                  <Route exact path="/" element={<Navigate to="/Login" replace />}/>
                  <Route exact path="/Login" element={<LoginPage/>}/>
                  <Route exact path="/Registration" element={<RegistrationPage/>}/>
            
                  <Route exact path="/SendOTP" element={<SendOTPPage/>}/>
                  <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}/>
                  <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}/>

                  <Route path="*" element={<Page404/>}/>
  
      </Routes>
      <ToastContainer/>
      <FullscreenLoader/>
    </BrowserRouter>
    
  )
}
};

export default App;
