import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineArrowRight } from 'react-icons/hi';

const SearchBar = ({ onSearch, placeholder = 'Enter Roll Number (e.g., CS2024001)', className = '' }) => {
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNumber.trim()) return;

    if (onSearch) {
      onSearch(rollNumber.trim());
    } else {
      navigate(`/results/${rollNumber.trim()}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-300" />

        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <HiOutlineSearch className="w-5 h-5" />
          </div>
          <input
            id="search-roll-number"
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
            placeholder={placeholder}
            className="w-full pl-12 pr-36 py-4 rounded-2xl border border-white/10 bg-dark-800/80 text-white placeholder-gray-500 text-base focus:outline-none focus:border-accent-cyan focus:shadow-glow-cyan transition-all duration-300"
            style={{ backdropFilter: 'blur(10px)' }}
          />
          <button
            type="submit"
            className="absolute right-2 btn-gradient !px-5 !py-2.5 !rounded-xl flex items-center gap-2 text-sm"
          >
            Search
            <HiOutlineArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;
