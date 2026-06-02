import { motion } from 'framer-motion';
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

export default function DatasetInsights() {
  const chdDistribution = [
    { name: 'Non-CHD', value: 2382, fill: '#10B981' },
    { name: 'CHD', value: 1858, fill: '#E53E3E' }
  ];

  const ageDistribution = [
    { range: '30-40', patients: 420 },
    { range: '40-50', patients: 850 },
    { range: '50-60', patients: 1200 },
    { range: '60-70', patients: 950 },
    { range: '70-80', patients: 340 }
  ];

  const riskByAge = [
    { age: '30', risk: 0.12 },
    { age: '40', risk: 0.18 },
    { age: '50', risk: 0.32 },
    { age: '60', risk: 0.48 },
    { age: '70', risk: 0.65 },
    { age: '80', risk: 0.72 }
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphism p-3 rounded-lg border border-[#1E2A45]">
          <p className="text-[#F1F5F9] font-semibold">{payload[0].payload.name || payload[0].payload.range || payload[0].payload.age}</p>
          <p style={{ color: payload[0].fill }}>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-2">About the Framingham Dataset</h2>
          <p className="text-[#94A3B8] text-lg">
            Statistical insights from the Framingham Heart Study cohort
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* CHD Distribution */}
          <motion.div
            variants={itemVariants}
            className="glass-morphism p-8 rounded-xl border border-[#1E2A45]"
          >
            <h3 className="text-xl font-bold mb-6 text-center">CHD Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chdDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {chdDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {chdDistribution.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    ></div>
                    <span className="text-[#94A3B8]">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Age Distribution */}
          <motion.div
            variants={itemVariants}
            className="glass-morphism p-8 rounded-xl border border-[#1E2A45]"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Age Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A45" />
                <XAxis dataKey="range" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="patients"
                  fill="#3B82F6"
                  animationDuration={1500}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk by Age Trend */}
          <motion.div
            variants={itemVariants}
            className="glass-morphism p-8 rounded-xl border border-[#1E2A45]"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Risk by Age Group</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={riskByAge}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A45" />
                <XAxis dataKey="age" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" domain={[0, 1]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#E53E3E"
                  strokeWidth={3}
                  dot={{ fill: '#E53E3E', r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
