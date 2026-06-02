import { motion } from 'framer-motion';
import { Zap, Leaf, TrendingUp, Cpu, Clock, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Zap, title: 'XGBoost Model', desc: 'Gradient boosting for powerful predictions', color: '#3B82F6' },
    { icon: Leaf, title: 'LightGBM Model', desc: 'Fast and efficient ensemble learning', color: '#10B981' },
    { icon: Cpu, title: 'CatBoost Model', desc: 'Advanced handling of categorical features', color: '#8B5CF6' },
    { icon: TrendingUp, title: 'Ensemble Voting', desc: 'Combined wisdom from three models', color: '#06B6D4' },
    { icon: Clock, title: 'Real-Time Results', desc: 'Get instant predictions and analysis', color: '#E53E3E' },
    { icon: BarChart3, title: 'Visual Analytics', desc: 'Comprehensive charts and insights', color: '#F59E0B' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1629]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-[#94A3B8] text-lg">Advanced ML models working together for superior accuracy</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  boxShadow: `0 0 40px ${feature.color}30`,
                  borderColor: feature.color
                }}
                className="glass-morphism p-6 rounded-xl border border-[#1E2A45] transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`,
                    border: `1px solid ${feature.color}40`
                  }}
                >
                  <Icon size={24} style={{ color: feature.color }} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                {/* Description */}
                <p className="text-[#94A3B8] text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
