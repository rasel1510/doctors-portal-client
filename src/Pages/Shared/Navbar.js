import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const Navbar = () => {

  const [user] = useAuthState(auth);
  console.log(user);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  };


  return (
    <div className="navbar bg-gray-100 text-black">

      <div className="navbar-start w-8/12">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/appointment'>Appointment</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            {
              user && <Link to="/dashboard">Dashboard</Link>
            }
            <li>{user ? <button onClick={logout} className="btn btn-ghost">Sign Out</button> : <Link to='/login'>Login</Link>}</li>


          </ul>

        </div>
        <Link className="btn btn-ghost text-xl">Doctors Portal</Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/appointment'>Appointment</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          {
            user && <li><Link to='/dashboard'>Dashboard</Link></li>
          }
          <li>{user ? <button onClick={logout} className="btn btn-ghost">Sign Out</button> : <Link to='/login'>Login</Link>}</li>

        </ul>
      </div>


      <div className='navbar-end w-16'>
        <label tabIndex={0} role="button" htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
      </div>

    </div>
  );
};

export default Navbar;