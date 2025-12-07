import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from '../../Shared/toast';

const UpdateServices = () => {

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);

    // 🔹 Load service by ID
    useEffect(() => {
        fetch(`https://backend-a10.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data));
    }, [id]);

    //Update submit
    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedService = {
            name: form.name.value,
            category: form.category.value,
            price: parseInt(form.price.value),
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
            email: user?.email,
            createdAt: service.createdAt
        };

        axios.put(`https://backend-a10.vercel.app/updateService/${id}`, updatedService).then(() => {
            showToast('Service updated successfully!', 'success');
            navigate('/myServices');
        });
    };

    if (!service) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 ">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Update Service
            </h2>

            <form className="space-y-4 flex flex-col justify-center items-center" onSubmit={handleUpdate}>

                {/* Name */}
                <input
                    name="name"
                    defaultValue={service.name}
                    className="input input-bordered w-full"
                    placeholder="Service name"
                    required
                />

                {/* Category */}
                <select
                    name="category"
                    defaultValue={service.category}
                    className="select select-bordered w-full"
                    required
                >
                    <option>Pets</option>
                    <option>Food</option>
                    <option>Accessories</option>
                    <option>Care Products</option>
                </select>

                {/* Price */}
                <input
                    name="price"
                    type="number"
                    defaultValue={service.price}
                    className="input input-bordered w-full"
                    required
                />

                {/* Location */}
                <input
                    name="location"
                    defaultValue={service.location}
                    className="input input-bordered w-full"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    defaultValue={service.description}
                    rows="4"
                    className="textarea textarea-bordered w-full"
                    required
                />

                {/* Image URL */}
                <input
                    name="image"
                    defaultValue={service.image}
                    className="input input-bordered w-full"
                    required
                />

                {/* Date */}
                <input
                    name="date"
                    type="date"
                    defaultValue={service.date}
                    className="input input-bordered w-full"
                    required
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-[#5b2501] text-white px-6 py-2 rounded hover:bg-[#7a3a01] transition"
                >
                    Update Service
                </button>

            </form>
        </div>
    );
};

export default UpdateServices;
