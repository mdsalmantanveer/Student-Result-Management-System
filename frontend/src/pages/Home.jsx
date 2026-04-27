import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import {
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
  HiOutlineSearch,
  HiOutlineCog,
} from 'react-icons/hi';

const Home = () => {
  const features = [
    {
      icon: HiOutlineSearch,
      title: 'Instant Search',
      desc: 'Find results instantly by entering your roll number. Lightning-fast retrieval from our indexed database.',
      color: 'cyan',
    },
    {
      icon: HiOutlineShieldCheck,
      title: 'Secure System',
      desc: 'JWT-based authentication ensures only authorized admins can modify records. Your data stays safe.',
      color: 'purple',
    },
    {
      icon: HiOutlineDatabase,
      title: 'Centralized Storage',
      desc: 'All academic data stored in MongoDB with proper indexing for fast access and data integrity.',
      color: 'emerald',
    },
    {
      icon: HiOutlineChartBar,
      title: 'GPA Calculator',
      desc: 'Automatic GPA calculation with detailed grade analysis per semester and cumulative overview.',
      color: 'pink',
    },
    {
      icon: HiOutlineCog,
      title: 'Admin Dashboard',
      desc: 'Comprehensive dashboard for faculty to manage students, subjects, and results efficiently.',
      color: 'amber',
    },
    {
      icon: HiOutlineLightningBolt,
      title: 'Real-time Updates',
      desc: 'Results updated in real-time by admins. Students can view their latest marks instantly.',
      color: 'cyan',
    },
  ];

  const colorIconMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10',
    purple: 'text-violet-400 bg-violet-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    pink: 'text-pink-400 bg-pink-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8"
          >
            <HiOutlineAcademicCap className="w-4 h-4 text-accent-cyan" />
            Student Result Management System
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight mb-6"
          >
            Welcome to{' '}
            <span className="gradient-text">GradeVault</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A modern, secure, and efficient platform to manage and access
            student academic results. Search your results instantly with just
            your roll number.
          </motion.p>

          {/* Search Bar */}
          <SearchBar />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link to="/results" className="btn-gradient">
              View Results
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Why <span className="gradient-text">GradeVault</span>?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Built with modern technologies to solve the challenges of traditional result management systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    colorIconMap[feature.color]
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-gray-400">Simple steps to view your results</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Roll Number',
                desc: 'Type your unique roll number in the search bar on the home page.',
              },
              {
                step: '02',
                title: 'View Results',
                desc: 'See your subject-wise marks, grades, and overall GPA displayed beautifully.',
              },
              {
                step: '03',
                title: 'Filter & Analyze',
                desc: 'Filter by semester, analyze performance trends, and track your progress.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-display font-extrabold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card text-center !p-12 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Check Your Results?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Enter your roll number and get instant access to your academic performance,
              grades, and GPA analysis.
            </p>
            <Link to="/results" className="btn-gradient text-lg !px-8 !py-4">
              Get Started →
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
