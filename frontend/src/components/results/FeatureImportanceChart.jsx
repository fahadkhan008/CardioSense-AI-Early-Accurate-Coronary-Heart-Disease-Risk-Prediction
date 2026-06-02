import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function FeatureImportanceChart({ result }) {
  const data = Object.entries(result.feature_importance)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphism p-3 rounded-lg border border-[#1E2A45]">
          <p className="text-[#F1F5F9] font-semibold">{payload[0].payload.name}</p>
          <p className="text-[#06B6D4]">{(payload[0].value * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-morphism p-8 rounded-xl border border-[#1E2A45]">
      <h3 className="text-2xl font-bold mb-6">Feature Importance</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 120, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2A45" />
          <XAxis type="number" stroke="#94A3B8" />
          <YAxis dataKey="name" type="category" stroke="#94A3B8" width={120} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="url(#importanceGradient)"
            radius={[0, 8, 8, 0]}
            animationDuration={1500}
          />
          <defs>
            <linearGradient id="importanceGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-[#94A3B8] text-sm mt-4">
        Top 8 features influencing this prediction. Higher values indicate stronger influence.
      </p>
    </div>
  );
}
