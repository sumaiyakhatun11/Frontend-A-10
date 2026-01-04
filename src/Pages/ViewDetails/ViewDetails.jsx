import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";

const ViewDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [serviceLoading, setServiceLoading] = useState(true);

    //  Auth + Fetch service by ID
    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
            return;
        }

        fetch(`https://backend-a10.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setServiceLoading(false);
            })
            .catch(err => {
                console.error("Service fetch failed ", err);
                setServiceLoading(false);
            });

    }, [user, loading, id, navigate]);

    //  Fix document title
    useEffect(() => {
        if (service?.name) {
            document.title = `${service.name} | Service Details`;
        } else {
            document.title = "Service Details";
        }
    }, [service]);


    if (loading || serviceLoading) {
        return (
            <div className="text-center mt-10 text-xl text-white">
                Loading...
            </div>
        );
    }

    if (!service) {
        return (
            <div className="text-center mt-10 text-xl text-red-400">
                Service not found!
            </div>
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = service._id;
        const productName = form.productName.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const quantity = parseInt(form.quantity.value);
        const price = parseInt(form.price.value);
        const address = form.address.value;
        const phone = form.phone.value;
        const note = form.note.value;
        const date = new Date().toLocaleDateString();

        const order = {
            id,
            productName,
            buyerName,
            buyerEmail,
            quantity,
            price,
            address,
            phone,
            note,
            date
        }

        axios.post('https://backend-a10.vercel.app/orders', order)
            .then(res => {
                console.log(res.data);
                alert('Order placed successfully');
                form.reset();
                // navigate('/myOrders');
            })
    }

    return (
        <div className="container-custom section-padding">
        <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Title */}
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {service.name}
            </motion.h1>


            {/*Image */}
            <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            />

            {/*Price */}
            <p className="text-yellow-400 text-lg font-semibold mb-3">
                Price: ${service.price}
            </p>


            {/*Info Card */}
            <motion.div
                className="bg-neutral-100 dark:bg-neutral-800 p-5 rounded-lg mb-6 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >

                <p className="mb-2">
                    <span className="font-semibold">Category:</span> {service.category}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Location:</span> {service.location}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Posted:</span> {service.date}
                </p>

                <p className="mb-3">
                    <span className="font-semibold">Contact:</span> {service.email}
                </p>

                <p className="text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold text-neutral-900 dark:text-white">Description:</span>{" "}
                    {service.description}
                </p>

            </motion.div>


            {/*Buttons */}
            <motion.div className="flex gap-4">

                <motion.button
                    onClick={() => navigate("/services")}
                    className="px-6 py-3 bg-neutral-600 dark:bg-neutral-700 hover:bg-neutral-500 dark:hover:bg-neutral-600 text-white transition rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Services
                </motion.button>

                <motion.button>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Adopt/Order Now</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box p-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
                            <form method="dialog">
                                <button className="absolute right-2 top-2 w-8 h-8 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors text-neutral-900 dark:text-white">✕</button>
                            </form>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <p className="text-lg font-semibold mb-2">Order Details</p>

                                {/* Product Name */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Product Name</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        defaultValue={service?.name}
                                        readOnly
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                    />
                                </div>

                                {/* Buyer Name */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Buyer Name</label>
                                    <input
                                        type="text"
                                        name="buyerName"
                                        defaultValue={user?.displayName}
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Your name"
                                    />
                                </div>

                                {/* Buyer Email */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Buyer Email</label>
                                    <input
                                        type="email"
                                        name="buyerEmail"
                                        defaultValue={user?.email}
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Email"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Quantity"
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        defaultValue={`${service?.price}`}
                                        readOnly
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"

                                    />
                                </div>

                                {/* Address */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Address"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input input-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Phone"
                                        required
                                    />
                                </div>

                                {/* Additional Note */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1 text-neutral-900 dark:text-white">Additional Note</label>
                                    <textarea
                                        name="note"
                                        rows="2"
                                        className="textarea textarea-bordered w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-600"
                                        placeholder="Additional Note"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn-primary w-full mt-3">
                                    Adopt/Order
                                </button>
                            </form>
                        </div>
                    </dialog>

                </motion.button>

            </motion.div>



        </motion.div>
        </div>
    );
};

export default ViewDetails;
