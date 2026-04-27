import { motion } from 'framer-motion';
import { HiOutlineFilter } from 'react-icons/hi';

const FilterDropdowns = ({
  semesters = [],
  selectedSemester,
  onSemesterChange,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-wrap items-center gap-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-gray-400">
        <HiOutlineFilter className="w-5 h-5" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      {/* Semester Filter */}
      <div className="relative">
        <select
          id="semester-filter"
          value={selectedSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
          className="input-glass !py-2 !px-4 !pr-10 text-sm appearance-none cursor-pointer min-w-[160px]"
        >
          <option value="" className="bg-dark-800">All Semesters</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem} className="bg-dark-800">
              Semester {sem}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Clear Filters */}
      {selectedSemester && (
        <button
          onClick={() => onSemesterChange('')}
          className="text-xs text-accent-cyan hover:text-accent-purple transition-colors duration-200 underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </motion.div>
  );
};

export default FilterDropdowns;
