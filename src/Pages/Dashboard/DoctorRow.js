import React from 'react';


const DoctorRow = ({ doctor, index,setDeletingDoctor }) => {
    const { name, speciality, img} = doctor;

    

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="w-16 rounded">
                        <img className='w-8' src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{speciality}</td>
            <td>
                <label onClick={()=>setDeletingDoctor(doctor)} for='delete-confirm-modal' className='btn btn-xs btn-error text-white'>Delete</label>
            </td>

        </tr>
    );
};

export default DoctorRow;