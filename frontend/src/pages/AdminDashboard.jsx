import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import StatsCard from '../components/StatsCard';
import ResultsTable from '../components/ResultsTable';
import {
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrendingUp,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
} from 'react-icons/hi';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await adminAPI.getStats();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              Welcome back,{' '}
              <span className="gradient-text">admin</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Here's an overview of the system
            </p>
          </div>
          <Link
            to="/admin/manage"
            className="btn-gradient flex items-center gap-2"
          >
            <HiOutlinePencilAlt className="w-5 h-5" />
            Manage Records
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
          <StatsCard
            icon={HiOutlineUsers}
            label="Students"
            value={stats?.totalStudents || 0}
            color="cyan"
            delay={0}
          />
          <StatsCard
            icon={HiOutlineBookOpen}
            label="Subjects"
            value={stats?.totalSubjects || 0}
            color="purple"
            delay={0.05}
          />
          <StatsCard
            icon={HiOutlineDocumentText}
            label="Results"
            value={stats?.totalResults || 0}
            color="pink"
            delay={0.1}
          />
          <StatsCard
            icon={HiOutlineCheckCircle}
            label="Passed"
            value={stats?.passCount || 0}
            color="emerald"
            delay={0.15}
          />
          <StatsCard
            icon={HiOutlineXCircle}
            label="Failed"
            value={stats?.failCount || 0}
            color="red"
            delay={0.2}
          />
          <StatsCard
            icon={HiOutlineTrendingUp}
            label="Pass %"
            value={`${stats?.passPercentage || 0}%`}
            color="amber"
            delay={0.25}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              icon: HiOutlinePlusCircle,
              title: 'Add Student',
              desc: 'Register a new student in the system',
              link: '/admin/manage',
              gradient: 'from-cyan-500/20 to-cyan-500/5',
            },
            {
              icon: HiOutlinePlusCircle,
              title: 'Add Subject',
              desc: 'Create a new subject entry',
              link: '/admin/manage',
              gradient: 'from-violet-500/20 to-violet-500/5',
            },
            {
              icon: HiOutlinePlusCircle,
              title: 'Add Result',
              desc: 'Enter marks for a student',
              link: '/admin/manage',
              gradient: 'from-emerald-500/20 to-emerald-500/5',
            },
          ].map((action, index) => (
            <Link
              key={action.title}
              to={action.link}
              className={`glass-card bg-gradient-to-br ${action.gradient} group`}
            >
              <action.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors mb-3" />
              <h3 className="font-semibold text-white mb-1">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.desc}</p>
            </Link>
          ))}
        </motion.div>

        {/* Recent Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-white">
              Recent Results
            </h2>
            <Link
              to="/admin/manage"
              className="text-sm text-accent-cyan hover:text-accent-purple transition-colors"
            >
              View All →
            </Link>
          </div>
          <ResultsTable
            results={stats?.recentResults || []}
            showStudent={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
