import { motion } from 'framer-motion';
import {
  CheckCircle, AlertTriangle, AlertOctagon, Activity, TrendingDown, UserCheck,
  Heart, XCircle, Zap, Info
} from 'lucide-react';

const iconMap = {
  CheckCircle: CheckCircle,
  Activity: Activity,
  AlertTriangle: AlertTriangle,
  TrendingDown: TrendingDown,
  UserCheck: UserCheck,
  AlertOctagon: AlertOctagon,
  Heart: Heart,
  XCircle: XCircle,
  Zap: Zap
};

export default function Recommendations({ result }) {
  const getRiskColor = (riskLevel) => {
    if (riskLevel === 'LOW') return '#10B981';
    if (riskLevel === 'MODERATE') return '#F59E0B';
    return '#E53E3E';
  };

  const riskColor = getRiskColor(result.risk_level);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-6">
      {/* Recommendations Cards */}
      <div className="glass-morphism p-8 rounded-xl border border-[#1E2A45]">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${riskColor}20`, border: `2px solid ${riskColor}` }}
          >
            <Info size={20} style={{ color: riskColor }} />
          </div>
          <h3 className="text-2xl font-bold">Health Recommendations</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {result.recommendations.map((rec, idx) => {
            const Icon = iconMap[rec.icon] || Activity;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: `0 0 20px ${riskColor}30` }}
                className="p-6 bg-[#0F1629]/50 rounded-lg border border-[#1E2A45]/50"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${riskColor}20` }}
                  >
                    <Icon size={24} style={{ color: riskColor }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#F1F5F9] mb-1">{rec.title}</h4>
                    <p className="text-[#94A3B8] text-sm">{rec.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-morphism p-6 rounded-xl border-l-4 border-[#06B6D4]"
      >
        <p className="text-[#94A3B8] text-sm">
          <span className="font-semibold text-[#06B6D4]">⚠️ Disclaimer:</span> This tool is for informational purposes only. 
          It should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
          Always consult a qualified physician or healthcare provider for personalized medical evaluation and advice.
        </p>
      </motion.div>
    </div>
  );
}
