import './App.css';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import AllUsers from './Pages/Dashboard/AllUsers';
import Dashboard from './Pages/Dashboard/Dashboard';
import History from './Pages/Dashboard/History';
import ManageDoctor from './Pages/Dashboard/ManageDoctor';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyReview from './Pages/Dashboard/MyReview';
import Home from './Pages/Home/Home';
import ForgotPassword from './Pages/Login/ForgotPassword';
import Login from './Pages/Login/Login';
import RequireAdmin from './Pages/Login/RequireAdmin';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route
            path="appointment"
            element={
              <RequireAuth>
                <Appointment />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<MyAppointment />}></Route>
            <Route path="review" element={<MyReview />}></Route>
            <Route path="history" element={<History />}></Route>
            <Route path="users" element={<RequireAdmin><AllUsers /></RequireAdmin>}></Route>
            <Route path="addDoctor" element={<RequireAdmin><AddDoctor /></RequireAdmin>}></Route>
            <Route path="manageDoctor" element={<RequireAdmin><ManageDoctor /></RequireAdmin>}></Route>
          </Route>
          <Route path="singup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </main>
      <PWAInstallPrompt />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
