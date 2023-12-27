import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';



const MyAppointment = () => {


    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth)
    const navigate=useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking?patient=${user.email}`,{
                method:'GET',
                headers:{
                    'authorization':`Brearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res =>{
                    if(res.status===401 || res.status===403){
                       signOut(auth);
                       localStorage.removeItem('accessToken'); 
                      navigate('/')
                    }
                   return res.json()
                })
                .then(data => setAppointments(data));
        }
    }, [user,navigate])



 



    return (
        <div>
            <h1>MY Appointment {
            appointments.length
            }</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
        
                        {
                            appointments.map((a,index)=>
                            <tr>
                                <th>{index+1}</th>
                                <td>{a.patientName}</td>
                                <td>{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatment}</td>
                               
                            </tr>
                            )
                        }
                        
                       
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyAppointment;