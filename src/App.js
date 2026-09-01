import './App.css';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import AllUsers from './Pages/Dashboard/AllUsers';
import Dashboard from './Pages/Dashboard/Dashboard';
import History from './Pages/Dashboard/History';
import ManageDoctor from './Pages/Dashboard/ManageDoctor';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyInvoices from './Pages/Dashboard/MyInvoices';
import MyProfile from './Pages/Dashboard/MyProfile';
import AdminOverview from './Pages/Dashboard/AdminOverview';
import AllBookings from './Pages/Dashboard/AllBookings';
import BillingManagement from './Pages/Dashboard/BillingManagement';
import ManagePatients from './Pages/Dashboard/ManagePatients';
import Home from './Pages/Home/Home';
import Departments from './Pages/Home/Services';
import FeaturedDoctors from './Pages/Home/FeaturedDoctors';
import ForgotPassword from './Pages/Login/ForgotPassword';
import Login from './Pages/Login/Login';
import RequireAdmin from './Pages/Login/RequireAdmin';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import OfflineBanner from './components/OfflineBanner';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<FeaturedDoctors />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="singup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />

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
            {/* Patient Routes */}
            <Route index element={<MyAppointment />} />
            <Route path="history" element={<History />} />
            <Route path="invoices" element={<MyInvoices />} />
            <Route path="profile" element={<MyProfile />} />

            {/* Admin Routes */}
            <Route path="overview" element={<RequireAdmin><AdminOverview /></RequireAdmin>} />
            <Route path="allbookings" element={<RequireAdmin><AllBookings /></RequireAdmin>} />
            <Route path="billing" element={<RequireAdmin><BillingManagement /></RequireAdmin>} />
            <Route path="manageDoctor" element={<RequireAdmin><ManageDoctor /></RequireAdmin>} />
            <Route path="addDoctor" element={<RequireAdmin><AddDoctor /></RequireAdmin>} />
            <Route path="patients" element={<RequireAdmin><ManagePatients /></RequireAdmin>} />
            <Route path="users" element={<RequireAdmin><AllUsers /></RequireAdmin>} />
          </Route>
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
