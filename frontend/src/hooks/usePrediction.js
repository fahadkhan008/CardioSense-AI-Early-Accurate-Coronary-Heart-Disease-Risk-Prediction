import { useState } from 'react';
import axios from 'axios';

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const predict = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        Sex: formData.sex,
        age: parseInt(formData.age),
        education: parseFloat(formData.education),
        currentSmoker: formData.currentSmoker,
        cigsPerDay: parseFloat(formData.cigsPerDay || 0),
        BPMeds: parseFloat(formData.BPMeds),
        prevalentStroke: formData.prevalentStroke ? 1 : 0,
        prevalentHyp: formData.prevalentHyp ? 1 : 0,
        diabetes: formData.diabetes,
        totChol: parseFloat(formData.totChol),
        sysBP: parseFloat(formData.sysBP),
        diaBP: parseFloat(formData.diaBP),
        BMI: parseFloat(formData.BMI),
        heartRate: parseFloat(formData.heartRate),
        glucose: parseFloat(formData.glucose)
      });

      setResults({
        ...response.data,
        timestamp: new Date(),
        formData
      });
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to get prediction. Please check the backend server.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { predict, loading, error, results, setResults };
};
