import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Popular = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then fall back to document attribute
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return document.documentElement.getAttribute('data-theme') === 'dark' || 
           document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || 
                         document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    // Initial sync on mount
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    window.addEventListener('storage', updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', updateTheme);
    };
  }, []);

  useEffect(() => {
    axios
      .get('https://backend-a10.vercel.app/services?limit=6')
      .then(res => {
        setPets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching pets:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="w-full lg:w-11/12 mx-auto mb-20 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
          Recent Listings
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white"
          style={isDark ? { color: '#ffffff' } : { color: '#000000' }}>
          Explore Popular Pets
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-transparent dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 p-5 flex flex-col"
            style={isDark ? { backgroundColor: '#000' } : { backgroundColor: 'transparent' }}
          >
            {/* Image */}
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

            {/* Content */}
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-1">
              {item.name}
            </h3>
            <div className="space-y-2 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {item.category}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {item.location || 'Not specified'}
              </div>
            </div>

            {/* Button */}
            <Link to={`/viewDetails/${item._id}`} className="mt-auto">
              <button className="btn-primary w-full py-3 transition-transform hover:scale-105 text-orange-800 text-bold">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/services" className="btn-primary bg-[#af6723] px-5 py-3 text-white font-bold hover:bg-orange-200 transition-transform hover:scale-105 rounded-lg">
          View All Pets
        </Link>
      </div>
    </section>
  );
};

export default Popular;
