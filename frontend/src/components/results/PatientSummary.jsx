import { motion } from 'framer-motion';
import { healthRanges } from '../../utils/healthRanges';

export default function PatientSummary({ result }) {
  const getValueColor = (fieldName, value) => {
    const range = healthRanges[fieldName];
    if (!range) return '#94A3B8';
    
    const [normal_min, normal_max] = range.normal;
    
    if (value >= normal_min && value <= normal_max) return '#10B981';
    if (value > normal_max) return '#E53E3E';
    return '#F59E0B';
  };

  const summaryFields = [
    { label: 'Age', key: 'age', unit: 'years' },
    { label: 'Sex', key: 'sex', unit: '' },
    { label: 'Total Cholesterol', key: 'totChol', unit: 'mg/dL' },
    { label: 'Systolic BP', key: 'sysBP', unit: 'mmHg' },
    { label: 'Diastolic BP', key: 'diaBP', unit: 'mmHg' },
    { label: 'BMI', key: 'BMI', unit: 'kg/m²' },
    { label: 'Heart Rate', key: 'heartRate', unit: 'bpm' },
    { label: 'Glucose', key: 'glucose', unit: 'mg/dL' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="glass-morphism p-8 rounded-xl border border-[#1E2A45]">
      <h3 className="text-2xl font-bold mb-6">Patient Summary</h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-4"
      >
        {summaryFields.map((field, idx) => {
          const value = result.formData[field.key];
          const color = typeof value === 'number' ? getValueColor(field.key, value) : '#94A3B8';
          
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-4 bg-[#0F1629]/50 rounded-lg border border-[#1E2A45]/50 flex justify-between items-center"
            >
              <span className="text-[#94A3B8]">{field.label}</span>
              <div className="text-right">
                <span style={{ color }} className="font-semibold">
                  {typeof value === 'number' ? value.toFixed(1) : value}
                </span>
                {field.unit && <span className="text-[#94A3B8] text-sm ml-1">{field.unit}</span>}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 p-4 bg-[#0F1629]/50 rounded-lg border-l-4 border-[#06B6D4]">
        <p className="text-[#94A3B8] text-sm">
          <span className="font-semibold text-[#06B6D4]">Green:</span> Within normal range •
          <span className="font-semibold text-[#F59E0B] ml-2">Amber:</span> Borderline •
          <span className="font-semibold text-[#E53E3E] ml-2">Red:</span> High/Abnormal
        </p>
      </div>
    </div>
  );
}
