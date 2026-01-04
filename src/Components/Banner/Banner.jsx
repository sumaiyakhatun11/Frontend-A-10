import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

const Banner = () => {
    return (
        <div className="relative w-full">
            {/* Hero Carousel - 60-70% screen height */}
            <div className="w-full h-[60vh] md:h-[65vh] rounded-xl overflow-hidden shadow-2xl">
                <Swiper
                    navigation
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    effect="fade"
                    loop
                    modules={[Navigation, Autoplay, Pagination, EffectFade]}
                    className="w-full h-full"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src={img1} alt="Find Your Perfect Pet" className="w-full h-full object-cover" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center px-6 md:px-16">
                                <div className="text-white max-w-2xl fade-in">
                                    <span className="inline-block px-4 py-1 bg-primary rounded-full text-sm font-semibold mb-4">
                                        🐾 Welcome to PawMart
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                        Find Your Perfect
                                        <span className="block text-accent">Furry Companion</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-neutral-100 dark:text-neutral-200 mb-8 max-w-xl">
                                        Connect with loving pets looking for their forever home. Adopt, don't shop!
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/services" className="btn-primary inline-flex items-center gap-2 text-lg">
                                            🔍 Browse Pets
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                        <Link to="/about" className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2">
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src={img2} alt="Quality Pet Supplies" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center px-6 md:px-16">
                                <div className="text-white max-w-2xl fade-in">
                                    <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-semibold mb-4">
                                        🛍️ Premium Quality
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                        Everything Your
                                        <span className="block text-accent">Pet Needs</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                                        From nutritious food to fun toys, find all essential pet supplies in one place.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/services?category=Supplies" className="btn-secondary inline-flex items-center gap-2 text-lg">
                                            🛒 Shop Supplies
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src={img3} alt="Happy Pets, Happy Lives" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center px-6 md:px-16">
                                <div className="text-white max-w-2xl fade-in">
                                    <span className="inline-block px-4 py-1 bg-accent rounded-full text-sm font-semibold mb-4">
                                        ❤️ Love & Care
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                        Love Starts
                                        <span className="block text-accent">Here</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                                        Join our community of pet lovers. Share, adopt, and care together.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/addServices" className="btn-primary inline-flex items-center gap-2 text-lg">
                                            ➕ List a Pet
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </Link>
                                        <Link to="/services" className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300">
                                            Browse All
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Scroll Hint - Visual hint to next section */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden md:block">
                <div className="flex flex-col items-center gap-2 text-white">
                    <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                        Scroll to explore
                    </span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Banner;
