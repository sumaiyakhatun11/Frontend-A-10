import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Pets', label: '🐶 Pets (Adoption)' },
  { name: 'Food', label: '🍖 Pet Food' },
  { name: 'Accessories', label: '🧸 Accessories' },
  { name: 'Care Products', label: '💊 Pet Care Products' },
];

const CategoryCardSection = () => {
  const navigate = useNavigate();
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

  const handleClick = (category) => {
    navigate(`/services?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="w-full lg:w-11/12 mx-auto mb-20 ">
      {/* reduced top padding from pt-32 → pt-20 */}
      <div className="max-w-7xl mx-auto ">

        {/* Section Title */}
        <h2
          className="text-2xl md:text-3xl font-semibold mb-10 text-center text-neutral-900 dark:text-white"
          style={isDark ? { color: '#ffffff' } : { color: '#000000' }}
        >
          Explore by Category
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="
                cursor-pointer h-[180px] p-6 rounded-xl
                bg-transparent dark:bg-black dark:hover:bg-black
                border border-neutral-200 dark:border-neutral-700
                text-neutral-900 dark:text-white
                flex flex-col items-center justify-center text-center
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
              style={isDark ? { backgroundColor: '#000', borderColor: '#404040', color: '#fff' } : { backgroundColor: 'transparent' }}
            >
              <span className="text-4xl mb-4">
                {cat.label.split(' ')[0]}
              </span>

              <h3 className="text-base font-medium tracking-wide">
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
