import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { s } from 'framer-motion/client';

const Services = () => {

    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [filteredServices, setFilteredServices] = useState([]);

    const { loading } = React.useContext(AuthContext);




    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setServicesLoading(false);
                setFilteredServices(data);
            })
            .catch((err) => {
                console.error('Failed to load services', err);
                setServicesLoading(false);
            });


    }, []);

    if (loading || servicesLoading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    const handleCategorySelection = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === "All") {
            setFilteredServices(services);
        } else {
            const filtered = services.filter(
                service => service.category === selectedCategory
            );
            setFilteredServices(filtered);
        }
    };


    return (
        <div >
            <div className='p-6 m-6'>
                <select defaultValue="Choose a Category" className="select select-info " onChange={handleCategorySelection}>
                    <option disabled={true}>Choose a Category</option>
                    <option>All</option>
                    <option>Pets</option>
                    <option>Food</option>
                    <option>Accessories</option>
                    <option>Care Products</option>
                </select>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">



                {filteredServices.map((item) => (
                    <div
                        key={item._id}

                        className="cursor-pointer border rounded-lg shadow-md p-3 bg-white hover:scale-105 transition"
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
                        <p className="text-md font-semibold text-green-600">
                            Price: ${item.price}
                        </p>

                        {/* Button */}

                        <Link
                            to={`/viewDetails/${item._id}`}
                            className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-center block"
                        ><button
                            className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                        >
                                See Details
                            </button>
                        </Link>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default Services;