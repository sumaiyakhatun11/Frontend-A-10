import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Popular = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);


    useEffect(() => {
        fetch("https://backend-a10.vercel.app/services?limit=6")

            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setServicesLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load services", err);
                setServicesLoading(false);
            });
    }, []);



    if (loading || servicesLoading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-17">Recent Listings</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 m-8 mt-0">

                {services.map((item) => (
                    <div
                        key={item._id}

                        className="cursor-pointer rounded-lg shadow-2xl p-7 bg-white hover:scale-105 transition"
                    >

                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-40 w-full object-cover rounded-md"
                        />

                        {/* Info */}
                        <h3 className="mt-2 text-lg font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                            Category: {item.category}
                        </p>
                        <p className="text-sm text-gray-600">
                            Location: {item.location}
                        </p>
                        <p className="text-md font-semibold text-gray-800">
                            Price: {item.price} taka
                        </p>

                        {/* Button */}

                        <Link
                            to={`/viewDetails/${item._id}`}
                            className="mt-2 w-full text-white py-1 rounded
                         block"
                        ><button
                            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#79410d] via-[#aa5505] to-[#d27625] hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                                See Details
                            </button>
                        </Link>

                    </div>
                ))
                }

            </div >

        </div>

    );
};

export default Popular;
