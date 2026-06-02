import { motion } from 'framer-motion';
import { Database, Brain, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Database,
      title: 'Input Patient Data',
      description: 'Enter clinical parameters and patient information',
      color: '#3B82F6'
    },
    {
      icon: Brain,
      title: 'AI Ensemble Analysis',
      description: 'Three ML models analyze the data simultaneously',
      color: '#8B5CF6'
    },
    {
      icon: TrendingUp,
      title: 'Risk Prediction Output',
      description: 'Get comprehensive risk assessment and insights',
      color: '#10B981'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How CardioSense AI Works</h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Our three-step process uses ensemble machine learning to deliver accurate predictions
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#10B981] -z-10"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: `0 0 30px ${step.color}40` }}
                className="glass-morphism p-8 rounded-xl text-center"
              >
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 20px ${step.color}40`
                    }}
                  >
                    <Icon size={40} style={{ color: step.color }} />
                  </div>
                </motion.div>

                {/* Step Number */}
                <div className="text-4xl font-bold text-gradient mb-2">{idx + 1}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-[#94A3B8]">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
