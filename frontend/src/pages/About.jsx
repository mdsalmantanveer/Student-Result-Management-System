import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineCode, HiOutlineDatabase, HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineGlobe } from 'react-icons/hi';

const About = () => {
  const techStack = [
    { name: 'React.js', desc: 'Frontend UI Library', icon: HiOutlineCode, color: 'text-cyan-400' },
    { name: 'Node.js', desc: 'Backend Runtime', icon: HiOutlineGlobe, color: 'text-emerald-400' },
    { name: 'Express.js', desc: 'Web Framework', icon: HiOutlineLightningBolt, color: 'text-amber-400' },
    { name: 'MongoDB', desc: 'NoSQL Database', icon: HiOutlineDatabase, color: 'text-green-400' },
    { name: 'JWT', desc: 'Authentication', icon: HiOutlineShieldCheck, color: 'text-violet-400' },
    { name: 'Tailwind CSS', desc: 'Styling Framework', icon: HiOutlineCode, color: 'text-sky-400' },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
            <HiOutlineAcademicCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">About <span className="gradient-text">GradeVault</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            GradeVault is a modern, secure, and scalable Student Result Management System built using the MERN stack. It provides a centralized platform for managing academic results efficiently.
          </p>
        </motion.div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card border-red-500/20">
            <h3 className="text-xl font-semibold text-red-400 mb-4">❌ The Problem</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Data redundancy and human errors in manual systems</li>
              <li>• Difficulty in updating and maintaining records</li>
              <li>• Lack of centralized storage for academic data</li>
              <li>• Slow and inefficient result retrieval process</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card border-emerald-500/20">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">✅ Our Solution</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Online result access with instant search</li>
              <li>• Efficient admin management with CRUD operations</li>
              <li>• Centralized MongoDB database storage</li>
              <li>• Fast search with indexed roll numbers</li>
            </ul>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Technology <span className="gradient-text">Stack</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <motion.div key={tech.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card text-center">
                <tech.icon className={`w-8 h-8 mx-auto mb-3 ${tech.color}`} />
                <h4 className="font-semibold text-white">{tech.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grade System */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card mb-16">
          <h2 className="text-xl font-display font-bold text-white mb-6">Grading System</h2>
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead><tr><th>Grade</th><th>Percentage</th><th>Grade Points</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { grade: 'A+', range: '90% and above', points: 10, status: 'Pass', cls: 'grade-a-plus' },
                  { grade: 'A', range: '80% – 89%', points: 9, status: 'Pass', cls: 'grade-a' },
                  { grade: 'B+', range: '70% – 79%', points: 8, status: 'Pass', cls: 'grade-b-plus' },
                  { grade: 'B', range: '60% – 69%', points: 7, status: 'Pass', cls: 'grade-b' },
                  { grade: 'C', range: '50% – 59%', points: 6, status: 'Pass', cls: 'grade-c' },
                  { grade: 'F', range: 'Below 50%', points: 0, status: 'Fail', cls: 'grade-f' },
                ].map(g => (
                  <tr key={g.grade}><td><span className={`grade-badge ${g.cls}`}>{g.grade}</span></td><td className="text-gray-300">{g.range}</td><td className="text-white font-semibold">{g.points}</td><td><span className={g.status === 'Pass' ? 'status-pass' : 'status-fail'}>{g.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400 mt-4"><strong className="text-gray-300">GPA Formula:</strong> GPA = Sum of Grade Points / Number of Subjects</p>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card">
          <h2 className="text-xl font-display font-bold text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Search results by roll number', 'Semester-wise filtering', 'Automatic GPA calculation', 'JWT-secured admin panel', 'Full CRUD operations', 'Responsive dark theme UI', 'Input validation & error handling', 'Glassmorphism design system'].map(f => (
              <div key={f} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                <span className="text-accent-cyan">✦</span>
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
