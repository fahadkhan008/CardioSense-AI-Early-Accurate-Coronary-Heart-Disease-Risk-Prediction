# CardioSense AI - Developer Guide

Quick reference for developers working on the CardioSense AI project.

---

## 🚀 Quick Commands

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

---

## 📁 File Structure Quick Reference

### Frontend Components
```
frontend/src/components/
├── Navbar.jsx                    # Top navigation
├── Hero.jsx                      # Hero section with stats
├── HowItWorks.jsx               # 3-step process
├── Features.jsx                  # 6-card feature grid
├── PredictionForm.jsx            # Main form with 15 inputs
├── ResultsSection.jsx            # Results container
├── results/
│   ├── RiskGauge.jsx            # Radial gauge chart
│   ├── ModelComparisonChart.jsx  # Bar chart
│   ├── FeatureImportanceChart.jsx# Feature rankings
│   ├── PatientSummary.jsx        # Data summary
│   └── Recommendations.jsx        # Health recommendations
├── DatasetInsights.jsx           # Dataset stats (3 charts)
├── TeamSection.jsx               # Team member cards
└── Footer.jsx                    # Footer with tech stack
```

### Utilities & Hooks
```
frontend/src/
├── hooks/usePrediction.js        # API hook
├── utils/healthRanges.js         # Validation ranges
├── App.jsx                       # Main component
├── main.jsx                      # Entry point
└── index.css                     # Global styles
```

### Backend
```
backend/
├── main.py                       # FastAPI app
├── requirements.txt              # Dependencies
└── models/                       # ML models (.pkl files)
```

---

## 🎨 Styling Guide

### Color System
Use CSS variables defined in `index.css`:
```css
--bg-primary: #0A0F1E          /* Main background */
--bg-secondary: #0F1629        /* Card background */
--border-color: #1E2A45        /* Borders */
--text-primary: #F1F5F9        /* Main text */
--text-secondary: #94A3B8      /* Secondary text */
--accent-red: #E53E3E          /* Red accent */
--accent-green: #10B981        /* Green accent */
--accent-blue: #3B82F6         /* Blue accent */
--accent-cyan: #06B6D4         /* Cyan accent */
--accent-purple: #8B5CF6       /* Purple accent */
```

### Common Classes
```html
<!-- Glassmorphism card -->
<div className="glass-morphism p-8 rounded-xl border border-[#1E2A45]">

<!-- Gradient text -->
<h1 className="text-gradient">Text</h1>

<!-- Glow effects -->
<div className="glow-red">     <!-- Red glow -->
<div className="glow-cyan">    <!-- Cyan glow -->
<div className="glow-blue">    <!-- Blue glow -->

<!-- Animations -->
className="animate-pulse"
className="animate-float"
```

---

## 🔄 Component Communication

### Props Flow
```
App.jsx
├── Navbar.jsx
├── Hero.jsx
├── HowItWorks.jsx
├── Features.jsx
├── PredictionForm.jsx
│   └── onSubmit={handlePrediction}
├── ResultsSection.jsx
│   ├── results={results}
│   ├── RiskGauge.jsx
│   ├── ModelComparisonChart.jsx
│   ├── FeatureImportanceChart.jsx
│   ├── PatientSummary.jsx
│   └── Recommendations.jsx
├── DatasetInsights.jsx
├── TeamSection.jsx
└── Footer.jsx
```

### usePrediction Hook
```javascript
const { predict, loading, error, results } = usePrediction();

// Call predict with form data
await predict(formData);

// Data available in results
results.ensemble_probability
results.risk_level
results.recommendations
```

---

## 🔌 API Integration

### Endpoints

**POST /predict** - Get risk prediction
```javascript
const response = await axios.post('http://localhost:8000/predict', {
  Sex: "Male",
  age: 55,
  education: 4,
  currentSmoker: "Yes",
  cigsPerDay: 10,
  BPMeds: 1,
  prevalentStroke: 0,
  prevalentHyp: 1,
  diabetes: "No",
  totChol: 240,
  sysBP: 140,
  diaBP: 90,
  BMI: 25,
  heartRate: 75,
  glucose: 95
});
```

**GET /health** - Check backend status
```javascript
const response = await axios.get('http://localhost:8000/health');
```

---

## 📊 Form Validation

### Health Ranges
Defined in `utils/healthRanges.js`:
```javascript
healthRanges = {
  age: { min: 20, max: 80, normal: [20, 65] },
  totChol: { min: 100, max: 600, normal: [0, 200], unit: 'mg/dL' },
  sysBP: { min: 80, max: 300, normal: [0, 120], unit: 'mmHg' },
  // ... more fields
}
```

### Validation Usage
```javascript
const isValid = validateField('age', 55);  // true/false

// Get BMI category
const category = getBMICategory(25);
// Returns: { label: 'Normal', color: '#10B981' }
```

---

## 🔧 Modifying Components

### Adding a New Field to Form
1. **Update healthRanges.js:**
   ```javascript
   newField: { min: 0, max: 100, normal: [20, 80], unit: 'units' }
   ```

2. **Add to PredictionForm.jsx:**
   ```javascript
   const [formData, setFormData] = useState({
     // ... existing fields
     newField: 50
   });
   
   <InputField label="New Field" name="newField" min={0} max={100}>
     <input type="range" name="newField" ... />
   </InputField>
   ```

3. **Update usePrediction.js:**
   ```javascript
   newField: parseFloat(formData.newField)
   ```

4. **Update backend main.py:**
   ```python
   class PatientData(BaseModel):
       # ... existing fields
       newField: float
   ```

---

### Changing Colors
1. **Update index.css** (root variables)
2. **Components will auto-update** (uses CSS variables)
3. Or use **inline style** for one-off colors:
   ```jsx
   style={{ color: '#E53E3E', boxShadow: '0 0 30px rgba(229, 62, 62, 0.4)' }}
   ```

---

### Adding a New Chart
1. **Create component** in `components/` or `components/results/`
2. **Import Recharts:**
   ```javascript
   import { BarChart, Bar, XAxis, YAxis, ... } from 'recharts';
   ```
3. **Add to parent:**
   ```javascript
   import YourChart from './YourChart';
   <YourChart data={data} />
   ```

---

## 🐛 Debugging

### Browser Console Logs
```javascript
console.log('Debug:', value);  // Standard log
console.error('Error:', error); // Error log
console.table(data);            // Table display
```

### Check Backend Connection
```bash
# Terminal
curl http://localhost:8000/health

# Browser DevTools -> Network tab
# Watch XHR/Fetch requests to localhost:8000
```

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**CORS Errors:**
- Check backend has `allow_origins=["http://localhost:5173"]`
- Restart backend after changes

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf frontend/node_modules
npm install
```

---

## 📈 Performance Tips

1. **Use ResponsiveContainer** for charts:
   ```jsx
   <ResponsiveContainer width="100%" height={300}>
     <Chart data={data} />
   </ResponsiveContainer>
   ```

2. **Memoize components** that don't need frequent updates:
   ```javascript
   export default memo(YourComponent);
   ```

3. **Optimize animations**:
   - Use `animationDuration={1500}` on charts
   - Avoid excessive box-shadow animations

4. **Split bundles** (if needed):
   - Use dynamic imports for heavy components
   - Vite handles code-splitting automatically

---

## 🔐 Security Considerations

1. **Input Validation** - Always validate on both frontend & backend
2. **CORS** - Only allow localhost in development, production domains in production
3. **No Secrets** - Don't store API keys in frontend code
4. **Parameterized Queries** - Backend already uses Pydantic validation

---

## 📚 Component Documentation

Each component accepts these common props:

### ResultsSection
```javascript
<ResultsSection results={{
  ensemble_probability: 0.72,
  risk_level: 'HIGH',
  formData: {...},
  // ... full response from /predict
}} />
```

### RiskGauge
```javascript
<RiskGauge result={results} />
// Uses: result.ensemble_probability, result.risk_level
```

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build` - Verify no errors
- [ ] Test on different browsers
- [ ] Update API endpoint to production URL
- [ ] Add real ML models to backend
- [ ] Test with production data
- [ ] Set up error monitoring
- [ ] Configure environment variables
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Deploy backend to cloud provider

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start dev servers | See Quick Commands section |
| Build frontend | `cd frontend && npm run build` |
| Check linting | `cd frontend && npm run lint` |
| Kill port 5173 | `lsof -ti:5173 \| xargs kill -9` |
| Kill port 8000 | `lsof -ti:8000 \| xargs kill -9` |
| Test backend | `curl http://localhost:8000/health` |
| Clean install | `rm -rf node_modules && npm install` |

---

## 📖 Additional Resources

- **React Docs:** https://react.dev
- **Framer Motion:** https://www.framer.com/motion
- **Recharts:** https://recharts.org
- **Tailwind CSS:** https://tailwindcss.com
- **FastAPI:** https://fastapi.tiangolo.com
- **Vite:** https://vitejs.dev

---

**Last Updated:** June 2025
**Status:** Production Ready ✅

For more detailed information, see README.md and PROJECT_COMPLETION.md
