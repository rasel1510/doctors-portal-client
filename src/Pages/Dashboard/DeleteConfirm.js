import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirm = ({ deletingDoctor, setDeletingDoctor,refetch }) => {
    const { name, email } = deletingDoctor;

    const handleDelete = email => {
        fetch(`http://localhost:5000/delete/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} is deleted`)
                    refetch()
                }
            })
    }


    return (
        <div>


            <input type="checkbox" id='delete-confirm-modal' className='modal-toggle' />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box'>

                    <h3 className='font-bold text-xl text-secondary'>Are you sure you want to delete <span className='text-red-500'>{name}</span></h3>

                    <div className='modal-action'>
                    <button onClick={() => handleDelete(email)} className="btn btn-xs btn-error text-white">Delete</button>
                        <label for='delete-confirm-modal' className='btn btn-xs'>Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirm;