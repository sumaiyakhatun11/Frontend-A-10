import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Services = () => {
    useEffect(() => {
        document.title = "Explore Pets | PawMart";
    }, []);

    const { loading } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    const searchFromUrl = queryParams.get('search');

    useEffect(() => {
        fetch('https://backend-a10.vercel.app/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setServicesLoading(false);

                let results = data;

                if (categoryFromUrl) {
                    setCategory(categoryFromUrl);
                    results = results.filter(service =>
                        service.category === categoryFromUrl
                    );
                }

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
                service.name.toLowerCase().includes(searchText.toLowerCase()) ||
                service.location?.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredServices(results);
        setCurrentPage(1); // Reset to first page when filters change

        // Update URL
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

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading || servicesLoading) {
        return (
            <div className="min-h-screen  flex justify-center items-center">
                <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full"></div>
            </div>
        );
    }

    return (
        <div className=" w-full md:w-11/12 mx-auto min-h-screen py-8">
            <div className="container-custom">
                {/* Page Header */}
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Explore <span className='text-[#af6723]'>Pets</span> & Supplies
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Find your perfect companion or essential pet supplies
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="card-standard mb-8 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={search}
                                onChange={handleSearch}
                                className="input-standard"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Category
                            </label>
                            <select
                                className="input-standard"
                                onChange={handleCategorySelection}
                                value={category}
                            >
                                <option value="All">All Categories</option>
                                <option value="Pets">Pets</option>
                                <option value="Food">Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Care Products">Care Products</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                {currentItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                            No Results Found
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() => {
                                setCategory("All");
                                setSearch("");
                                setFilteredServices(services);
                            }}
                            className="btn-primary"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 p-5 flex flex-col hover:bg-gray-200"
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-4 h-52">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                                            {item.price} tk
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <div className="space-y-2 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            {item.category}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {item.location || 'Not specified'}
                                        </div>
                                    </div>

                                    <Link to={`/viewDetails/${item._id}`} className="mt-auto">
                                        <button className="btn-primary w-full py-3 transition-transform hover:scale-105 text-orange-800 font-bold">
                                            View Details
                                        </button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => paginate(pageNumber)}
                                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                                    currentPage === pageNumber
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return <span key={pageNumber}>...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Services;
