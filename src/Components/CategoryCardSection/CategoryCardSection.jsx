import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Pets', label: '🐶 Pets (Adoption)' },
  { name: 'Food', label: '🍖 Pet Food' },
  { name: 'Accessories', label: '🧸 Accessories' },
  { name: 'Care Products', label: '💊 Pet Care Products' },
];

const CategoryCardSection = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/services?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 " >

        {/* Section Title */}
        <p className="text-2xl md:text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-white">
          Explore Categories
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="
                cursor-pointer h-[200px] p-8 rounded-xl
                text-center shadow-md
                transition-transform duration-300
                hover:scale-105 hover:shadow-xl
                bg-amber-100 dark:bg-neutral-800
                text-neutral-900 dark:text-white
                flex flex-col justify-center items-center
              "
            >
              <p className="text-4xl mb-3">{cat.label.split(' ')[0]}</p>
              <h3 className="font-semibold text-lg">
                {cat.label.slice(2)}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryCardSection;
