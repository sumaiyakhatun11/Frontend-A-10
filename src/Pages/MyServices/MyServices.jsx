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

    // Fetch services for the logged-in user
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/myServices/?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyService(data);
                    setServiceLoading(false);
                })
                .catch(err => {
                    console.error("Service fetch failed ", err);
                    setServiceLoading(false);
                });
        }
    }, [user?.email]);

    const handleDetele = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deleteService/${id}`).then(() => {
                    const remaining = myService.filter(service => service._id !== id);
                    setMyService(remaining);
                    showToast('Service deleted successfully!', 'success');
                }).catch(err => {
                    console.error('Delete failed', err);
                    showToast('Failed to delete service', 'error');
                });
            }
        });
    }

    if (loading || serviceLoading) {
        return <div className="text-center mt-10">Loading services...</div>;
    }

    if (!myService || myService.length === 0) {
        return <div className="text-center mt-10">You have no services yet.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* Head */}
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {myService.map(service => (
                        <tr key={service._id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{service.name}</div>
                                        <div className="text-sm opacity-50">
                                            {service.location}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                {service.category}
                            </td>

                            <td>
                                {service.description}
                            </td>

                            <td className="flex gap-2">
                                <Link to={`/updateServices/${service._id}`} className="btn btn-ghost btn-xs bg-green-400  hover:bg-green-200">
                                    Edit
                                </Link>

                                <button onClick={() => { handleDetele(service._id) }} className="btn btn-ghost btn-xs bg-red-500 text-black hover:bg-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );

};

export default MyServices;
