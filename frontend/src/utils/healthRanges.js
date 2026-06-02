export const healthRanges = {
  age: { min: 20, max: 80, normal: [20, 65] },
  totChol: { min: 100, max: 600, normal: [0, 200], unit: 'mg/dL' },
  sysBP: { min: 80, max: 300, normal: [0, 120], unit: 'mmHg' },
  diaBP: { min: 40, max: 200, normal: [0, 80], unit: 'mmHg' },
  BMI: { min: 10, max: 60, normal: [18.5, 24.9], unit: 'kg/m²' },
  heartRate: { min: 40, max: 200, normal: [60, 100], unit: 'bpm' },
  glucose: { min: 40, max: 400, normal: [70, 100], unit: 'mg/dL' },
  cigsPerDay: { min: 0, max: 100, normal: [0, 0] }
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3B82F6' };
  if (bmi < 25) return { label: 'Normal', color: '#10B981' };
  if (bmi < 30) return { label: 'Overweight', color: '#F59E0B' };
  return { label: 'Obese', color: '#E53E3E' };
};

export const educationOptions = [
  { value: 1, label: 'Some High School' },
  { value: 2, label: 'High School/GED' },
  { value: 3, label: 'Some College' },
  { value: 4, label: 'College Degree' }
];
