import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ModelComparisonChart({ result }) {
  const data = [
    {
      name: 'XGBoost',
      probability: result.xgboost_probability,
      fill: '#3B82F6'
    },
    {
      name: 'LightGBM',
      probability: result.lightgbm_probability,
      fill: '#10B981'
    },
    {
      name: 'CatBoost',
      probability: result.catboost_probability,
      fill: '#8B5CF6'
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphism p-3 rounded-lg border border-[#1E2A45]">
          <p className="text-[#F1F5F9] font-semibold">{payload[0].payload.name}</p>
          <p style={{ color: payload[0].fill }}>
            {(payload[0].value * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-morphism p-8 rounded-xl border border-[#1E2A45]">
      <h3 className="text-2xl font-bold mb-6">Individual Model Predictions</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2A45" />
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" domain={[0, 1]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="probability"
            fill="#3B82F6"
            animationDuration={1500}
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Bar key={`bar-${index}`} dataKey="probability" fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map((model, idx) => (
          <div key={idx} className="text-center p-3 bg-[#0F1629]/50 rounded-lg">
            <p className="text-[#94A3B8] text-sm">{model.name}</p>
            <p className="text-xl font-bold mt-1" style={{ color: model.fill }}>
              {(model.probability * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
