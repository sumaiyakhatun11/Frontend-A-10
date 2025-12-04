import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";

const ViewDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [serviceLoading, setServiceLoading] = useState(true);

    // ✅ Auth + Fetch service by ID
    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3000/services/${id}`)
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

    // ✅ Fix document title
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

    return (
        <motion.div
            className="max-w-4xl mx-auto px-6 py-10 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* ✅ Title */}
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {service.name}
            </motion.h1>


            {/* ✅ Image */}
            <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            />

            {/* ✅ Price */}
            <p className="text-yellow-400 text-lg font-semibold mb-3">
                Price: ${service.price}
            </p>


            {/* ✅ Info Card */}
            <motion.div
                className="bg-gray-900 p-5 rounded-lg mb-6"
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

                <p className="text-gray-300">
                    <span className="font-semibold text-white">Description:</span>{" "}
                    {service.description}
                </p>

            </motion.div>


            {/* ✅ Buttons */}
            <motion.div className="flex gap-4">

                <motion.button
                    onClick={() => navigate("/services")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Services
                </motion.button>

            </motion.div>

        </motion.div>
    );
};

export default ViewDetails;
