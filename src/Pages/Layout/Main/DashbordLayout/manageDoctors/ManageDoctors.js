import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../../Shere/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletedDoctor, setDeletedDoctor] = useState(null)

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('Token')}`
                    }
                })
                const data = await res.json()
                return data;
            }
            catch (err) {
            }
        }
    });

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    const closeModal = () => {
        setDeletedDoctor(null)
    }

    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} Deleted Successfully`)
                }

            })
    }

    return (
        <div>
            <h1 className="text-3xl mb-5">Manage Doctors {doctors?.length}</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Treatment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.length &&
                            doctors?.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletedDoctor(doctor)} htmlFor="confirmation-modal" className="btn  btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletedDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletedDoctor.name}. it cannot be undone`}
                    successAction={handleDeleteDoctor}
                    closeModal={closeModal}
                    successBtnName={`Delete`}
                    closeBtnName={`Cancel`}
                    modalData={deletedDoctor}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;