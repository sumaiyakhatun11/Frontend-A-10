import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: "Pets", label: "🐶 Pets (Adoption)" },
    { name: "Food", label: "🍖 Pet Food" },
    { name: "Accessories", label: "🧸 Accessories" },
    { name: "Care Products", label: "💊 Pet Care Products" },
];

const CategoryCardSection = () => {
    const navigate = useNavigate();

    const handleClick = (category) => {
        // Navigate to /services with a query param ?category=Pets
        navigate(`/services?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="px-8 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-50 ">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        onClick={() => handleClick(cat.name)}
                        className=" cursor-pointer p-5 rounded-xl text-center shadow-md hover:scale-105 transition bg-[#d3b69b] text-gray-800  flex flex-col justify-center items-center"
                    >
                        <p className="text-3xl mb-2">{cat.label.split(" ")[0]}</p>
                        <h3 className="font-semibold">{cat.label.slice(2)}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCardSection;
