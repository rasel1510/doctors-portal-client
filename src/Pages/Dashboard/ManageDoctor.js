import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';
import DeleteConfirm from './DeleteConfirm';

const ManageDoctor = () => {
     const[deletingDoctor,setDeletingDoctor]=useState(null);

    const { data: doctors, isLoading ,refetch} = useQuery('doctors', () => fetch('https://doctors-portal-server-psi.vercel.app/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-3xl text-red-400'>Doctors List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specility</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                  
                        {
                            doctors.map((doctor,index)=><DoctorRow
                            key={doctor._key}
                            doctor={doctor}
                            index={index}
                            refetch={refetch}
                            setDeletingDoctor={setDeletingDoctor}
                            ></DoctorRow>)
                        }
                    </tbody>
                </table>
            </div>
        
        {
            deletingDoctor && <DeleteConfirm 
            deletingDoctor={deletingDoctor}
            setDeletingDoctor={setDeletingDoctor}
            refetch={refetch}
            ></DeleteConfirm>
        }
        </div>
    );
};

export default ManageDoctor;