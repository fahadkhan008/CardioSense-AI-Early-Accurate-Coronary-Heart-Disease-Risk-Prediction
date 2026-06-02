import { motion } from 'framer-motion';
import RiskGauge from './results/RiskGauge';
import ModelComparisonChart from './results/ModelComparisonChart';
import FeatureImportanceChart from './results/FeatureImportanceChart';
import PatientSummary from './results/PatientSummary';
import Recommendations from './results/Recommendations';

const ResultsSection = ({ results }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1629]/50" id="results">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Prediction Results</h2>
          <p className="text-[#94A3B8]">Comprehensive analysis powered by ensemble ML models</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Risk Gauge */}
          <motion.div variants={itemVariants}>
            <RiskGauge result={results} />
          </motion.div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <ModelComparisonChart result={results} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureImportanceChart result={results} />
            </motion.div>
          </div>

          {/* Patient Summary */}
          <motion.div variants={itemVariants}>
            <PatientSummary result={results} />
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={itemVariants}>
            <Recommendations result={results} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
