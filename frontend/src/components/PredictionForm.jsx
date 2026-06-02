import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { healthRanges, getBMICategory, educationOptions } from '../utils/healthRanges';

export default function PredictionForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    sex: 'Male',
    age: 55,
    education: 4,
    currentSmoker: 'No',
    cigsPerDay: 0,
    BPMeds: 0,
    prevalentStroke: false,
    prevalentHyp: false,
    diabetes: 'No',
    totChol: 240,
    sysBP: 140,
    diaBP: 90,
    BMI: 25,
    heartRate: 75,
    glucose: 95
  });

  const [touched, setTouched] = useState({});
  const [shake, setShake] = useState(false);

  const validateField = (name, value) => {
    const range = healthRanges[name];
    if (!range) return true;
    return value >= range.min && value <= range.max;
  };

  const isFieldInvalid = (name) => touched[name] && !validateField(name, formData[name]);
  const isFieldValid = (name) => touched[name] && validateField(name, formData[name]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleToggle = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all as touched
    const newTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    // Validate all fields
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    onSubmit(formData);
  };

  const bmiCategory = getBMICategory(formData.BMI);

  const InputField = ({ label, name, type = 'number', min, max, showValidity = true, children }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#F1F5F9]">{label}</label>
      {children}
      {showValidity && (
        <div className="text-xs">
          {isFieldInvalid(name) && (
            <div className="text-red-400">Range: {min}-{max}</div>
          )}
          {isFieldValid(name) && (
            <div className="text-green-400 flex items-center gap-1">
              <CheckCircle size={12} /> Valid
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="predict">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Patient Risk Assessment</h2>
          <p className="text-[#94A3B8] text-lg">
            Enter clinical parameters for real-time CHD prediction
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="glass-morphism p-8 rounded-xl border-t-4 border-[#3B82F6]"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-red-300 text-sm">{error}</div>
            </motion.div>
          )}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Sex Radio Toggle */}
              <InputField label="Sex" name="sex" showValidity={false}>
                <div className="flex gap-4">
                  {['Male', 'Female'].map(option => (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle('sex', option)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.sex === option
                          ? 'bg-[#E53E3E] text-white border border-[#E53E3E]'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </InputField>

              {/* Age with Slider */}
              <InputField label={`Age: ${formData.age}`} name="age" min={20} max={80}>
                <input
                  type="range"
                  name="age"
                  min="20"
                  max="80"
                  value={formData.age}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
                  className="w-full h-2 bg-[#0F1629] rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((formData.age - 20) / 60) * 100}%, #1E2A45 ${((formData.age - 20) / 60) * 100}%, #1E2A45 100%)`
                  }}
                />
              </InputField>

              {/* Education */}
              <InputField label="Education Level" name="education" showValidity={false}>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#0F1629] border border-[#1E2A45] text-[#F1F5F9] rounded-lg focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  {educationOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </InputField>

              {/* Current Smoker */}
              <InputField label="Current Smoker" name="currentSmoker" showValidity={false}>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(option => (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleToggle('currentSmoker', option)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.currentSmoker === option
                          ? 'bg-[#06B6D4] text-[#0A0F1E] border border-[#06B6D4]'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </InputField>

              {/* Cigarettes Per Day (conditional) */}
              <AnimatePresence>
                {formData.currentSmoker === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <InputField label={`Cigarettes/Day: ${formData.cigsPerDay}`} name="cigsPerDay" min={0} max={100}>
                      <input
                        type="range"
                        name="cigsPerDay"
                        min="0"
                        max="100"
                        value={formData.cigsPerDay}
                        onChange={handleInputChange}
                        onBlur={() => setTouched(prev => ({ ...prev, cigsPerDay: true }))}
                        className="w-full"
                      />
                    </InputField>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BP Medications */}
              <InputField label="BP Medications" name="BPMeds" showValidity={false}>
                <div className="flex gap-4">
                  {[{ label: 'Yes', val: 1 }, { label: 'No', val: 0 }].map(option => (
                    <motion.button
                      key={option.val}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleToggle('BPMeds', option.val)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.BPMeds === option.val
                          ? 'bg-[#10B981] text-[#0A0F1E]'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </InputField>

              {/* Prevalent Stroke */}
              <InputField label="History of Stroke" name="prevalentStroke" showValidity={false}>
                <div className="flex gap-4">
                  {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(option => (
                    <motion.button
                      key={String(option.val)}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleToggle('prevalentStroke', option.val)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.prevalentStroke === option.val
                          ? 'bg-[#F59E0B] text-[#0A0F1E]'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </InputField>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Prevalent Hypertension */}
              <InputField label="Hypertension History" name="prevalentHyp" showValidity={false}>
                <div className="flex gap-4">
                  {[{ label: 'Yes', val: 1 }, { label: 'No', val: 0 }].map(option => (
                    <motion.button
                      key={option.val}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleToggle('prevalentHyp', option.val)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.prevalentHyp === option.val
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </InputField>

              {/* Diabetes */}
              <InputField label="Diabetes" name="diabetes" showValidity={false}>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(option => (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleToggle('diabetes', option)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.diabetes === option
                          ? 'bg-[#E53E3E] text-white'
                          : 'bg-[#0F1629] border border-[#1E2A45] text-[#94A3B8]'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </InputField>

              {/* Total Cholesterol */}
              <InputField label={`Total Cholesterol: ${formData.totChol} mg/dL`} name="totChol" min={100} max={600}>
                <input
                  type="range"
                  name="totChol"
                  min="100"
                  max="600"
                  value={formData.totChol}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, totChol: true }))}
                  className="w-full"
                />
              </InputField>

              {/* Systolic BP */}
              <InputField label={`Systolic BP: ${formData.sysBP} mmHg`} name="sysBP" min={80} max={300}>
                <input
                  type="range"
                  name="sysBP"
                  min="80"
                  max="300"
                  value={formData.sysBP}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, sysBP: true }))}
                  className="w-full"
                />
              </InputField>

              {/* Diastolic BP */}
              <InputField label={`Diastolic BP: ${formData.diaBP} mmHg`} name="diaBP" min={40} max={200}>
                <input
                  type="range"
                  name="diaBP"
                  min="40"
                  max="200"
                  value={formData.diaBP}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, diaBP: true }))}
                  className="w-full"
                />
              </InputField>

              {/* BMI */}
              <InputField label={`BMI: ${formData.BMI} kg/m²`} name="BMI" min={10} max={60} showValidity={false}>
                <div className="space-y-2">
                  <input
                    type="range"
                    name="BMI"
                    min="10"
                    max="60"
                    step="0.1"
                    value={formData.BMI}
                    onChange={handleInputChange}
                    onBlur={() => setTouched(prev => ({ ...prev, BMI: true }))}
                    className="w-full"
                  />
                  <div
                    className="px-3 py-1 rounded-lg text-sm font-semibold text-center w-fit"
                    style={{ backgroundColor: bmiCategory.color + '20', color: bmiCategory.color }}
                  >
                    {bmiCategory.label}
                  </div>
                </div>
              </InputField>

              {/* Heart Rate */}
              <InputField label={`Heart Rate: ${formData.heartRate} bpm`} name="heartRate" min={40} max={200}>
                <input
                  type="range"
                  name="heartRate"
                  min="40"
                  max="200"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, heartRate: true }))}
                  className="w-full"
                />
              </InputField>

              {/* Glucose */}
              <InputField label={`Glucose: ${formData.glucose} mg/dL`} name="glucose" min={40} max={400}>
                <input
                  type="range"
                  name="glucose"
                  min="40"
                  max="400"
                  value={formData.glucose}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(prev => ({ ...prev, glucose: true }))}
                  className="w-full"
                />
              </InputField>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={!loading ? { scale: 1.05, boxShadow: '0 0 40px rgba(229, 62, 62, 0.5)' } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-[#E53E3E] via-[#8B5CF6] to-[#3B82F6] text-white font-semibold rounded-lg hover:shadow-2xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <motion.div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Analyzing...
              </motion.div>
            ) : (
              'Analyze Risk →'
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
