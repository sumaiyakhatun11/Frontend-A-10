import React from "react";

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
    return (
        <section className="py-12 px-6 bg-white text-center text-black">
            <h2 className="text-3xl font-bold mb-8 text-[#713600]">🐕 Meet Our Pet Heroes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        className="bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
                    >
                        <img
                            src={hero.img}
                            alt={hero.name}
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold">{hero.name}</h3>
                        <p className="text-gray-600">{hero.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PetHeroes;
