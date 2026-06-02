from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import pandas as pd
from pathlib import Path

app = FastAPI(title="CardioSense AI API")

MODELS_DIR = Path(__file__).parent / "models"

# ================================================================
# LOAD MODELS
# ================================================================
# Your notebook trains 6 models. Load whichever .pkl files you saved.
# If you only saved 3, just keep those 3 lines and remove the rest.
print("Loading trained models...")

xgb_model   = joblib.load(MODELS_DIR / "xgboost_model.pkl")
lgbm_model  = joblib.load(MODELS_DIR / "lightgbm_model.pkl")
cat_model   = joblib.load(MODELS_DIR / "catboost_model.pkl")
scaler      = joblib.load(MODELS_DIR / "scaler.pkl")

# If you saved all 6 models, uncomment below and update filenames:
# cat_model2    = joblib.load(MODELS_DIR / "catboost_v2_model.pkl")
# lgbm_model2   = joblib.load(MODELS_DIR / "lightgbm_v2_model.pkl")
# lgbm_tuned    = joblib.load(MODELS_DIR / "lightgbm_tuned_model.pkl")

print("✓ All models loaded successfully!")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    Sex: str            # "Male" or "Female"
    age: int
    education: float
    currentSmoker: str  # "Yes" or "No"
    cigsPerDay: float
    BPMeds: float
    prevalentStroke: int
    prevalentHyp: int
    diabetes: str       # "Yes" or "No"
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float

class PredictionResponse(BaseModel):
    ensemble_probability: float
    ensemble_prediction: int
    risk_level: str
    xgboost_probability: float
    lightgbm_probability: float
    catboost_probability: float
    feature_importance: dict
    recommendations: list


def build_features(data: PatientData) -> np.ndarray:
    """
    Recreates the EXACT same 85-feature engineering from the training notebook.
    Must match Step 5 of All_Humanized_Steps_AI_Lab.ipynb exactly.
    """
    # --- Encode categoricals (same as Step 4 in notebook) ---
    Sex            = 1 if data.Sex == "Male" else 0
    currentSmoker  = 1 if data.currentSmoker == "Yes" else 0
    diabetes       = 1 if data.diabetes == "Yes" else 0

    # Raw values
    age            = float(data.age)
    education      = float(data.education)
    cigsPerDay     = float(data.cigsPerDay)
    BPMeds         = float(data.BPMeds)
    prevalentStroke= float(data.prevalentStroke)
    prevalentHyp   = float(data.prevalentHyp)
    totChol        = float(data.totChol)
    sysBP          = float(data.sysBP)
    diaBP          = float(data.diaBP)
    BMI            = float(data.BMI)
    heartRate      = float(data.heartRate)
    glucose        = float(data.glucose)

    # ================================================================
    # STEP 5: FEATURE ENGINEERING (15 → 85 features)
    # Must be IDENTICAL to the notebook
    # ================================================================

    # Blood pressure features
    pulse_pressure = sysBP - diaBP
    MAP            = diaBP + pulse_pressure / 3
    pp_ratio       = pulse_pressure / (sysBP + 1)
    sysBP_sq       = sysBP ** 2
    diaBP_sq       = diaBP ** 2
    bp_product     = sysBP * diaBP

    # Log transforms
    glucose_log    = np.log1p(glucose)
    chol_log       = np.log1p(totChol)
    sysBP_log      = np.log1p(sysBP)
    cigs_log       = np.log1p(cigsPerDay)
    BMI_log        = np.log1p(BMI)

    # Squared terms
    glucose_sq     = glucose ** 2
    chol_sq        = totChol ** 2
    BMI_sq         = BMI ** 2
    age_sq         = age ** 2
    HR_sq          = heartRate ** 2
    pulse_sq       = pulse_pressure ** 2

    # Age interactions
    age_sysBP      = age * sysBP
    age_chol       = age * totChol
    age_glucose    = age * glucose
    age_BMI        = age * BMI
    age_pulse      = age * pulse_pressure
    age_HR         = age * heartRate
    age_diaBP      = age * diaBP
    age_smoker     = age * currentSmoker
    age_diabetes   = age * diabetes
    age_hyp        = age * prevalentHyp
    age_MAP        = age * MAP

    # Metabolic features
    chol_glucose   = totChol / (glucose + 1)
    BMI_glucose    = BMI * glucose
    chol_age_ratio = totChol / (age + 1)
    BMI_sysBP      = BMI * sysBP
    glucose_sysBP  = glucose * sysBP
    chol_BMI       = totChol * BMI

    # Smoking features
    pack_years     = cigsPerDay * age / 20
    smoker_cigs    = currentSmoker * cigsPerDay
    pack_sq        = pack_years ** 2
    pack_sysBP     = pack_years * sysBP
    pack_glucose   = pack_years * glucose

    # Composite risk scores
    cv_risk        = prevalentHyp + diabetes + prevalentStroke + BPMeds + currentSmoker
    bp_risk        = prevalentHyp + BPMeds + (1 if sysBP > 140 else 0)
    metabolic_risk = diabetes + (1 if BMI > 30 else 0) + (1 if glucose > 100 else 0)
    total_risk     = cv_risk + bp_risk + metabolic_risk
    risk_sq        = total_risk ** 2
    risk_age       = total_risk * age
    risk_sysBP     = total_risk * sysBP
    risk_glucose   = total_risk * glucose

    # Heart rate features
    HR_age         = heartRate * age
    HR_sysBP       = heartRate * sysBP
    HR_pulse       = heartRate * pulse_pressure
    HR_glucose     = heartRate * glucose
    HR_MAP         = heartRate * MAP

    # Sex interactions
    sex_age        = Sex * age
    sex_sysBP      = Sex * sysBP
    sex_chol       = Sex * totChol
    sex_glucose    = Sex * glucose
    sex_BMI        = Sex * BMI
    sex_smoker     = Sex * currentSmoker
    sex_risk       = Sex * total_risk
    sex_pack       = Sex * pack_years

    # Ordinal bin features (clinically meaningful — match pd.cut bins exactly)
    if age <= 40:
        age_bin = 0
    elif age <= 50:
        age_bin = 1
    elif age <= 60:
        age_bin = 2
    else:
        age_bin = 3

    if sysBP <= 120:
        bp_bin = 0
    elif sysBP <= 130:
        bp_bin = 1
    elif sysBP <= 140:
        bp_bin = 2
    else:
        bp_bin = 3

    if BMI <= 18.5:
        bmi_bin = 0
    elif BMI <= 25:
        bmi_bin = 1
    elif BMI <= 30:
        bmi_bin = 2
    else:
        bmi_bin = 3

    if glucose <= 70:
        glucose_bin = 0
    elif glucose <= 100:
        glucose_bin = 1
    elif glucose <= 126:
        glucose_bin = 2
    else:
        glucose_bin = 3

    if totChol <= 200:
        chol_bin = 0
    elif totChol <= 240:
        chol_bin = 1
    elif totChol <= 300:
        chol_bin = 2
    else:
        chol_bin = 3

    if pulse_pressure <= 30:
        pulse_bin = 0
    elif pulse_pressure <= 50:
        pulse_bin = 1
    elif pulse_pressure <= 70:
        pulse_bin = 2
    else:
        pulse_bin = 3

    # Three-way interactions
    age_sysBP_sex  = age * sysBP * Sex
    age_chol_sex   = age * totChol * Sex
    risk_age_sex   = total_risk * age * Sex
    pack_age_sex   = pack_years * age * Sex

    # ================================================================
    # Assemble in EXACT same column order as X = d.drop('TenYearCHD')
    # which is the original columns + engineered columns in order added
    # ================================================================
    features = [
        # Original 15 columns (after encoding)
        Sex, age, education, currentSmoker, cigsPerDay,
        BPMeds, prevalentStroke, prevalentHyp, diabetes,
        totChol, sysBP, diaBP, BMI, heartRate, glucose,

        # Blood pressure features (6)
        pulse_pressure, MAP, pp_ratio, sysBP_sq, diaBP_sq, bp_product,

        # Log transforms (5)
        glucose_log, chol_log, sysBP_log, cigs_log, BMI_log,

        # Squared terms (6)
        glucose_sq, chol_sq, BMI_sq, age_sq, HR_sq, pulse_sq,

        # Age interactions (11)
        age_sysBP, age_chol, age_glucose, age_BMI, age_pulse,
        age_HR, age_diaBP, age_smoker, age_diabetes, age_hyp, age_MAP,

        # Metabolic features (6)
        chol_glucose, BMI_glucose, chol_age_ratio, BMI_sysBP,
        glucose_sysBP, chol_BMI,

        # Smoking features (5)
        pack_years, smoker_cigs, pack_sq, pack_sysBP, pack_glucose,

        # Composite risk scores (8)
        cv_risk, bp_risk, metabolic_risk, total_risk,
        risk_sq, risk_age, risk_sysBP, risk_glucose,

        # Heart rate features (5)
        HR_age, HR_sysBP, HR_pulse, HR_glucose, HR_MAP,

        # Sex interactions (8)
        sex_age, sex_sysBP, sex_chol, sex_glucose,
        sex_BMI, sex_smoker, sex_risk, sex_pack,

        # Ordinal bins (6)
        age_bin, bp_bin, bmi_bin, glucose_bin, chol_bin, pulse_bin,

        # Three-way interactions (4)
        age_sysBP_sex, age_chol_sex, risk_age_sex, pack_age_sex,
    ]
    # Total = 15 + 6 + 5 + 6 + 11 + 6 + 5 + 8 + 5 + 8 + 6 + 4 = 85 ✓

    return np.array(features).reshape(1, -1)


@app.post("/predict", response_model=PredictionResponse)
async def predict(data: PatientData):

    # 1. Build 85 features
    features = build_features(data)

    # 2. Scale using the fitted scaler (MUST match training)
    features_scaled = scaler.transform(features)

    # 3. Get probabilities from each model
    xgb_prob  = float(xgb_model.predict_proba(features_scaled)[0][1])
    lgbm_prob = float(lgbm_model.predict_proba(features_scaled)[0][1])
    cat_prob  = float(cat_model.predict_proba(features_scaled)[0][1])

    # 4. Equal-weighted ensemble (matches notebook Step 10)
    # If you loaded 6 models, average all 6 here instead
    ensemble_prob = round((xgb_prob + lgbm_prob + cat_prob) / 3, 4)
    prediction    = 1 if ensemble_prob >= 0.5 else 0

    # 5. Risk level
    if ensemble_prob < 0.3:
        risk_level = "LOW"
    elif ensemble_prob < 0.6:
        risk_level = "MODERATE"
    else:
        risk_level = "HIGH"

    # 6. Feature importance (static from your notebook results)
    feature_importance = {
        "Age": 0.18,
        "Systolic BP": 0.15,
        "Total Cholesterol": 0.13,
        "Glucose": 0.12,
        "BMI": 0.10,
        "Cigarettes/Day": 0.09,
        "Diastolic BP": 0.08,
        "Heart Rate": 0.07,
    }

    # 7. Recommendations
    recommendations_map = {
        "LOW": [
            {"icon": "CheckCircle", "title": "Maintain Healthy Lifestyle",
             "desc": "Continue regular exercise and balanced diet."},
            {"icon": "Activity", "title": "Annual Checkups",
             "desc": "Schedule yearly cardiovascular screening."},
        ],
        "MODERATE": [
            {"icon": "AlertTriangle", "title": "Monitor Blood Pressure",
             "desc": "Check BP weekly and reduce sodium intake."},
            {"icon": "TrendingDown", "title": "Reduce Cholesterol",
             "desc": "Limit saturated fats and increase fiber intake."},
            {"icon": "UserCheck", "title": "Consult a Cardiologist",
             "desc": "Schedule a consultation within 3 months."},
        ],
        "HIGH": [
            {"icon": "AlertOctagon", "title": "Immediate Medical Attention",
             "desc": "Consult a cardiologist as soon as possible."},
            {"icon": "Heart", "title": "Medication Review",
             "desc": "Discuss BP and cholesterol medications with doctor."},
            {"icon": "XCircle", "title": "Stop Smoking Immediately",
             "desc": "Smoking significantly elevates CHD risk."},
            {"icon": "Zap", "title": "Emergency Plan",
             "desc": "Know the signs of a heart attack and keep emergency contacts ready."},
        ],
    }

    return PredictionResponse(
        ensemble_probability=ensemble_prob,
        ensemble_prediction=prediction,
        risk_level=risk_level,
        xgboost_probability=xgb_prob,
        lightgbm_probability=lgbm_prob,
        catboost_probability=cat_prob,
        feature_importance=feature_importance,
        recommendations=recommendations_map[risk_level],
    )


@app.get("/health")
async def health():
    return {
        "status": "CardioSense AI API is running",
        "models": ["XGBoost", "LightGBM", "CatBoost"],
        "features": 85,
    }