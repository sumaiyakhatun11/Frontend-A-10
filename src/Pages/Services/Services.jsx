import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Services = () => {

    useEffect(() => {
        document.title = "Services | PawMart";
    }, []);

    const { loading } = useContext(AuthContext);

    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();


    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    const searchFromUrl = queryParams.get('search');


    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setServicesLoading(false);

                let results = data;

                // Category filter from URL
                if (categoryFromUrl) {
                    setCategory(categoryFromUrl);
                    results = results.filter(service =>
                        service.category === categoryFromUrl
                    );
                }

                // Search filter from URL
                if (searchFromUrl) {
                    setSearch(searchFromUrl);
                    results = results.filter(service =>
                        service.name.toLowerCase().includes(searchFromUrl.toLowerCase())
                    );
                }

                setFilteredServices(results);
            })
            .catch(err => {
                console.error('Failed to load services', err);
                setServicesLoading(false);
            });

    }, [categoryFromUrl, searchFromUrl]);

    if (loading || servicesLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }


    const applyFilter = (selectedCategory, searchText) => {

        let results = [...services];

        // Category filter
        if (selectedCategory !== "All") {
            results = results.filter(service =>
                service.category === selectedCategory
            );
        }

        // Search filter
        if (searchText) {
            results = results.filter(service =>
                service.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredServices(results);

        // Update URL dynamically
        let params = [];

        if (selectedCategory !== "All") params.push(`category=${selectedCategory}`);
        if (searchText) params.push(`search=${encodeURIComponent(searchText)}`);

        navigate(`/services${params.length ? `?${params.join("&")}` : ""}`);
    };

    const handleCategorySelection = (e) => {
        const selected = e.target.value;
        setCategory(selected);
        applyFilter(selected, search);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        applyFilter(category, value);
    };


    return (
        <div className="p-6">

            {/* FILTER BAR */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={handleSearch}
                    className="input input-bordered w-full md:w-[300px] border-2 border-[#713600]"
                />

                {/* CATEGORY */}
                <select
                    className="select select-info border-[#713600] border-2 w-full md:w-[200px]"
                    onChange={handleCategorySelection}
                    value={category}
                >
                    <option value="All">All</option>
                    <option value="Pets">Pets</option>
                    <option value="Food">Food</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Care Products">Care Products</option>
                </select>

            </div>


            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-8">
                {filteredServices.length === 0 && (
                    <p className="text-center col-span-full text-gray-500">
                        No services found.
                    </p>
                )}

                {filteredServices.map((item) => (
                    <div
                        key={item._id}
                        className="cursor-pointer rounded-lg shadow-2xl p-7 bg-white hover:scale-105 transition"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-40 w-full object-cover rounded-md"
                        />

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

                        <Link to={`/viewDetails/${item._id}`}>
                            <button
                                className="mt-2 w-full px-4 py-2 rounded-lg font-semibold text-white
                                bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00]
                                hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200]
                                transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
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
