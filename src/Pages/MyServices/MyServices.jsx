import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { showToast } from '../../Shared/toast';

const MyServices = () => {
    const { user, loading } = useContext(AuthContext);

    const [myService, setMyService] = useState([]);
    const [serviceLoading, setServiceLoading] = useState(true);

    useEffect(() => {
        document.title = "My Services | PawMart";
    }, []);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://backend-a10.vercel.app/myServices/?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyService(data);
                    setServiceLoading(false);
                })
                .catch(() => setServiceLoading(false));
        }
    }, [user?.email]);

    const handleDetele = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://backend-a10.vercel.app/deleteService/${id}`).then(() => {
                    setMyService(prev => prev.filter(service => service._id !== id));
                    showToast('Service deleted successfully!', 'success');
                });
            }
        });
    };

    if (loading || serviceLoading) return <p className="text-center mt-10">Loading services...</p>;

    if (!myService.length) return <p className="text-center mt-10">You have no services yet.</p>;

    return (
        <div className="p-4">

            {/* ================= TABLE VIEW (DESKTOP) ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myService.map(service => (
                            <tr key={service._id}>
                                <td>
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-bold">{service.name}</p>
                                            <p className="text-sm text-gray-500">{service.location}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>{service.category}</td>
                                <td className="max-w-xs truncate">{service.description}</td>

                                <td className="flex gap-2">
                                    <Link
                                        to={`/updateServices/${service._id}`}
                                        className="btn btn-xs bg-green-400 hover:bg-green-300"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDetele(service._id)}
                                        className="btn btn-xs bg-red-500 text-black hover:bg-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= CARD VIEW (MOBILE) ================= */}
            <div className="space-y-4 md:hidden">
                {myService.map(service => (
                    <div key={service._id} className="bg-white shadow-md rounded-lg p-4">

                        <div className="flex gap-4">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-bold">{service.name}</h3>
                                <p className="text-sm text-gray-500">{service.location}</p>
                                <p className="text-sm">Category: {service.category}</p>
                            </div>
                        </div>

                        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                            {service.description}
                        </p>

                        <div className="flex gap-3 mt-4">
                            <Link
                                to={`/updateServices/${service._id}`}
                                className="btn btn-sm bg-green-400 hover:bg-green-300 "
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => handleDetele(service._id)}
                                className="btn btn-sm bg-red-500 text-black hover:bg-red-300 "
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default MyServices;
