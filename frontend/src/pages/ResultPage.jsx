import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { resultAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import ResultsTable from '../components/ResultsTable';
import FilterDropdowns from '../components/FilterDropdowns';
import StatsCard from '../components/StatsCard';
import {
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi';

const ResultPage = () => {
  const { rollNumber: paramRoll } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (paramRoll) {
      fetchResults(paramRoll);
    }
  }, [paramRoll]);

  const fetchResults = async (roll, semester = '') => {
    setLoading(true);
    setError('');
    try {
      const params = semester ? { semester } : {};
      const { data } = await resultAPI.getByRollNumber(roll, params);
      if (data.success) {
        setResultData(data.data);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch results';
      setError(message);
      toast.error(message);
      setResultData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (roll) => {
    setSelectedSemester('');
    navigate(`/results/${roll}`);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    if (paramRoll) {
      fetchResults(paramRoll, semester);
    }
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 9) return 'text-emerald-400';
    if (gpa >= 8) return 'text-cyan-400';
    if (gpa >= 7) return 'text-blue-400';
    if (gpa >= 6) return 'text-violet-400';
    if (gpa >= 5) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">
            Student <span className="gradient-text">Results</span>
          </h1>
          <p className="text-gray-400">
            Enter your roll number to view your academic performance
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} className="mb-10" />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card text-center py-12 border-red-500/20"
          >
            <HiOutlineXCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Student Not Found
            </h3>
            <p className="text-gray-400">{error}</p>
          </motion.div>
        )}

        {/* Results */}
        {resultData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Student Info Card */}
            <div className="glass-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {resultData.student.name.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <HiOutlineUser className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-white">
                        {resultData.student.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineAcademicCap className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Roll Number</p>
                      <p className="text-sm font-mono text-accent-cyan">
                        {resultData.student.roll_number}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-300">
                        {resultData.student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlinePhone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Class / Section
                      </p>
                      <p className="text-sm text-gray-300">
                        {resultData.student.class} - {resultData.student.section}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                icon={HiOutlineChartBar}
                label="Overall GPA"
                value={
                  <span className={getGPAColor(resultData.gpa)}>
                    {resultData.gpa}
                  </span>
                }
                color="cyan"
                delay={0}
              />
              <StatsCard
                icon={HiOutlineBookOpen}
                label="Total Subjects"
                value={resultData.totalSubjects}
                color="purple"
                delay={0.1}
              />
              <StatsCard
                icon={HiOutlineCheckCircle}
                label="Passed"
                value={resultData.passCount}
                color="emerald"
                delay={0.2}
              />
              <StatsCard
                icon={HiOutlineXCircle}
                label="Failed"
                value={resultData.failCount}
                color="red"
                delay={0.3}
              />
            </div>

            {/* Semester GPA Cards */}
            {resultData.semesterGPA &&
              Object.keys(resultData.semesterGPA).length > 1 && (
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Semester-wise GPA
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(resultData.semesterGPA)
                      .sort(([a], [b]) => a - b)
                      .map(([sem, gpa]) => (
                        <div
                          key={sem}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <span className="text-xs text-gray-400">
                            Sem {sem}
                          </span>
                          <span
                            className={`text-lg font-bold ${getGPAColor(
                              parseFloat(gpa)
                            )}`}
                          >
                            {gpa}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            {/* Filters */}
            <FilterDropdowns
              semesters={resultData.semesters}
              selectedSemester={selectedSemester}
              onSemesterChange={handleSemesterChange}
            />

            {/* Results Table */}
            <ResultsTable results={resultData.results} />
          </motion.div>
        )}

        {/* Empty State */}
        {!paramRoll && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card text-center py-16"
          >
            <HiOutlineAcademicCap className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Search Your Results
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Enter your roll number in the search bar above to view your
              subject-wise marks, grades, and GPA analysis.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-gray-600">
              <span className="px-3 py-1 rounded-full bg-white/5">
                e.g. CS2024001
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5">
                e.g. EC2024002
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
