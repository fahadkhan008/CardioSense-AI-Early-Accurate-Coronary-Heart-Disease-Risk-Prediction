import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Heart, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function RiskGauge({ result }) {
  const riskLevel = result.risk_level;
  const probability = Math.round(result.ensemble_probability * 100);

  const getRiskColor = () => {
    if (probability < 30) return { color: '#10B981', label: 'LOW RISK', icon: Heart };
    if (probability < 60) return { color: '#F59E0B', label: 'MODERATE RISK', icon: AlertTriangle };
    return { color: '#E53E3E', label: 'HIGH RISK', icon: AlertOctagon };
  };

  const riskConfig = getRiskColor();
  const Icon = riskConfig.icon;

  const data = [
    { name: 'Risk', value: probability, fill: riskConfig.color }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-morphism p-8 rounded-xl border border-[#1E2A45]"
    >
      <h3 className="text-2xl font-bold mb-8 text-center">Ensemble Risk Assessment</h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Gauge Chart */}
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                label={{ position: 'center' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Info */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, ${riskConfig.color}20, ${riskConfig.color}05)`,
                border: `3px solid ${riskConfig.color}`,
                boxShadow: `0 0 30px ${riskConfig.color}40`
              }}
            >
              <Icon size={40} style={{ color: riskConfig.color }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-[#94A3B8] text-sm mb-2">Risk Probability</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-5xl font-bold mb-2"
              style={{ color: riskConfig.color }}
            >
              {probability}%
            </motion.div>
            <p
              className="text-2xl font-bold mb-4"
              style={{ color: riskConfig.color }}
            >
              {riskConfig.label}
            </p>
            <p className="text-[#94A3B8] text-sm">
              Based on ensemble prediction from XGBoost, LightGBM, and CatBoost models
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
