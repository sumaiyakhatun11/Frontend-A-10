import React, { useEffect, useState } from "react";

const heroes = [
    {
        id: 1,
        name: "Sarah Thompson",
        role: "Pet Adopter",
        img: "/src/assets/hero1.jpg",
    },
    {
        id: 2,
        name: "David Lee",
        role: "Animal Caregiver",
        img: "/src/assets/hero2.jpeg",
    },
    {
        id: 3,
        name: "Priya Sharma",
        role: "Pet Adopter",
        img: "/src/assets/hero3.jpg",
    },
    {
        id: 4,
        name: "Mark Johnson",
        role: "Volunteer",
        img: "/src/assets/hero4.jpg",
    },
];



const PetHeroes = () => {
    const [isDark, setIsDark] = useState(() => {
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

    return (
        <section className="section-padding">
            <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">🐕 Meet Our Pet Heroes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {heroes.map((hero) => (
    <div
        key={hero.id}
        className=" bg-neutral-50  p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center"
                    style   ={isDark ? { backgroundColor: '#000' } : { backgroundColor: '#f9f9f9' }}
    >
        <img
            src={hero.img}
            alt={hero.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{hero.name}</h3>
        <p className="text-neutral-700 dark:text-neutral-300">{hero.role}</p>
    </div>
))}
            </div>
            </div>
        </section>
    );
};

export default PetHeroes;
