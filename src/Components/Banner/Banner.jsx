import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

const Banner = () => {
    return (
        <div className="w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Swiper
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                modules={[Navigation, Autoplay, Pagination]}
                className="w-full h-full"
            >

                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img1} alt="Pets" className="w-full h-full object-cover" />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {/* Tagline */}
                        <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-12 pb-8 md:pb-0">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Find Your Perfect Pet
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Connecting loving homes with adorable companions.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img2} alt="Pet Care" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-12 pb-8 md:pb-0">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Quality Pet Supplies
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Food, toys, and everything your pet needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={img3} alt="Happy Pets" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-12 pb-8 md:pb-0">
                            <div className="text-white max-w-xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    Love Starts Here
                                </h2>
                                <p className="text-sm md:text-lg text-gray-200">
                                    Adopt. Care. Love.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;
