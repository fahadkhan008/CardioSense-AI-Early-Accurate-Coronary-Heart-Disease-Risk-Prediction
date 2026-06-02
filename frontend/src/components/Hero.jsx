import { motion } from 'framer-motion';
import { ArrowRight, Activity, Zap, BarChart3 } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const statCards = [
    { icon: Activity, label: '4,240 Patients Analyzed', color: '#06B6D4' },
    { icon: Zap, label: '94.2% Ensemble Accuracy', color: '#E53E3E' },
    { icon: BarChart3, label: '3 Models Combined', color: '#10B981' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E53E3E] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">Predict Heart Disease Risk</span>
            <br />
            <span>with AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-[#94A3B8] mb-8 max-w-3xl mx-auto"
          >
            Powered by <span className="text-[#3B82F6]">XGBoost</span> • <span className="text-[#10B981]">LightGBM</span> • <span className="text-[#8B5CF6]">CatBoost</span> Ensemble
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="#predict"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(229, 62, 62, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#E53E3E] to-[#8B5CF6] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
            >
              Start Prediction <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-[#06B6D4] text-[#06B6D4] rounded-lg font-semibold hover:bg-[#06B6D4]/10 transition-colors"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
          >
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, boxShadow: `0 0 30px ${card.color}40` }}
                  className="glass-morphism p-6 rounded-xl border-l-4"
                  style={{ borderLeftColor: card.color }}
                >
                  <Icon size={32} style={{ color: card.color }} className="mx-auto mb-3" />
                  <p className="text-[#94A3B8] text-sm">{card.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ECG Line Animation */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <svg width="300" height="60" viewBox="0 0 300 60" className="w-full max-w-lg">
              <path
                d="M0,30 L10,30 L15,20 L20,35 L25,30 L45,30 L50,15 L55,40 L60,30 L80,30 L85,25 L90,32 L100,30 L120,30 L125,20 L130,35 L135,30 L150,30 L155,25 L160,32 L170,30 L190,30 L195,20 L200,35 L205,30 L225,30 L230,15 L235,40 L240,30 L260,30 L265,25 L270,32 L280,30 L300,30"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#E53E3E" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
