import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Autoplay,
  Pagination,
  EffectFade,
  Keyboard,
  A11y,
} from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

const slides = [
  {
    img: img1,
    tag: 'Welcome to PawMart',
    tagClass: 'bg-primary',
    title: (
      <>
        Find Your Perfect
        <span className="block text-accent">Furry Companion</span>
      </>
    ),
    description:
      'Connect with loving pets looking for their forever home. Adopt, don’t shop.',
    actions: (
      <>
        <Link to="/services" className="btn-primary inline-flex items-center gap-2 text-lg bg-[#af6730] px-6 py-3 rounded-lg">
          Browse Pets →
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white text-white rounded-lg font-semibold hover:bg-white/30 transition"
        >
          Learn More
        </Link>
      </>
    ),
  },
  {
    img: img2,
    tag: 'Premium Quality',
    tagClass: 'bg-secondary',
    title: (
      <>
        Everything Your
        <span className="block text-accent">Pet Needs</span>
      </>
    ),
    description:
      'From nutritious food to fun toys, find all essential pet supplies in one place.',
    actions: (
      <Link to="/services?category=Supplies" className="btn-primary text-lg bg-[#af6730] px-6 py-3 rounded-lg">
        Shop Supplies →
      </Link>
    ),
  },
  {
    img: img3,
    tag: 'Love & Care',
    tagClass: 'bg-accent',
    title: (
      <>
        Love Starts
        <span className="block text-accent">Here</span>
      </>
    ),
    description:
      'Join our community of pet lovers. Share, adopt, and care together.',
    actions: (
      <>
        <Link to="/addServices" className="btn-primary bg-[#af6730] text-lg px-6 py-3 rounded-lg">
          List a Pet +
        </Link>
        <Link
          to="/services"
          className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white text-white rounded-lg font-semibold hover:bg-white/30 transition"
        >
          Browse All
        </Link>
      </>
    ),
  },
];

const Banner = () => {
  return (
    <section className="relative w-full flex justify-center">
      {/* WIDTH CONTROL (80%) */}
      <div className="w-full lg:w-10/12">
        <div className="relative w-full">
          <div className="w-full h-[65vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-2xl">
            <Swiper
              modules={[Navigation, Autoplay, Pagination, EffectFade, Keyboard, A11y]}
              navigation
              keyboard={{ enabled: true }}
              a11y={{ enabled: true }}
              effect="fade"
              loop
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="w-full h-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <img
                      src={slide.img}
                      alt=""
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center px-6 md:px-20">
                      <div className="max-w-2xl text-white animate-fadeInUp">
                        <span
                          className={`inline-block px-4 py-1 rounded-md text-sm font-semibold mb-4 ${slide.tagClass}`}
                        >
                          {slide.tag}
                        </span>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                          {slide.title}
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-200 mb-8">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          {slide.actions}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white animate-bounce">
            <span className="text-sm font-medium bg-black/40 backdrop-blur px-4 py-2 rounded-full">
              Scroll to explore
            </span>
            ↓
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
