import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
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
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Dog Owner',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 5,
            text: 'PawMart helped me find the perfect companion! The process was smooth, and the seller was very responsive. My golden retriever is now the happiest member of our family.',
            pet: '🐕'
        },
        {
            name: 'Michael Chen',
            role: 'Cat Lover',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            text: 'I adopted two adorable kittens through PawMart. The platform is user-friendly, and I felt secure throughout the entire process. Highly recommended!',
            pet: '🐱'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Pet Enthusiast',
            image: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 5,
            text: 'Best pet marketplace ever! I found quality pet supplies at great prices and even adopted a rabbit. The community here is amazing and supportive.',
            pet: '🐰'
        },
        {
            name: 'David Thompson',
            role: 'Bird Owner',
            image: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
            text: 'PawMart made finding my parrot so easy. The detailed listings and direct communication with sellers gave me confidence in my decision.',
            pet: '🦜'
        }
    ];

    return (
        <section className="section-padding">
            <div className="container-custom mx-auto text-center">
                {/* Section Header */}
                <div className="mb-12 flex flex-col items-center">
                    <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
                        style={isDark ? { color: '#ffffff' } : { color: '#000000' }}>
                        What Our Community Says
                    </h2>
                    <div className="max-w-2xl">
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center">
                            Real stories from real pet parents who found their perfect match
                        </p>
                    </div>
                </div>

                {/* Testimonials Slider */}
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="pb-12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="card-standard h-full flex flex-col items-center text-center p-6 bg-transparent dark:bg-black rounded-xl shadow-md" style={isDark ? { backgroundColor: '#000' } : { backgroundColor: 'transparent' }}>
                                {/* Rating */}
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-4 mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 w-full">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <div className="font-bold text-neutral-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {testimonial.role} {testimonial.pet}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
