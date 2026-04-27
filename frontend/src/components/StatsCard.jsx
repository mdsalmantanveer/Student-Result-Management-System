import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, label, value, trend, color = 'cyan', delay = 0 }) => {
  const colorMap = {
    cyan: {
      bg: 'from-cyan-500/20 to-cyan-500/5',
      border: 'border-cyan-500/20',
      icon: 'text-cyan-400',
      glow: 'shadow-glow-cyan',
    },
    purple: {
      bg: 'from-violet-500/20 to-violet-500/5',
      border: 'border-violet-500/20',
      icon: 'text-violet-400',
      glow: 'shadow-glow-purple',
    },
    emerald: {
      bg: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/20',
      icon: 'text-emerald-400',
      glow: '',
    },
    pink: {
      bg: 'from-pink-500/20 to-pink-500/5',
      border: 'border-pink-500/20',
      icon: 'text-pink-400',
      glow: '',
    },
    amber: {
      bg: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/20',
      icon: 'text-amber-400',
      glow: '',
    },
    red: {
      bg: 'from-red-500/20 to-red-500/5',
      border: 'border-red-500/20',
      icon: 'text-red-400',
      glow: '',
    },
  };

  const colors = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`glass-card bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-1 font-display">
            {value}
          </p>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-white/5 ${colors.icon}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
