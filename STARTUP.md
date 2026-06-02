# CardioSense AI - Startup Guide

This guide shows you how to start both the frontend and backend servers.

## ⚡ Quick Start (Two Terminal Windows)

### Terminal 1: Start the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Output should show:**
```
Uvicorn running on http://127.0.0.1:8000
Press CTRL+C to quit
```

### Terminal 2: Start the Frontend
```bash
cd frontend
npm install  # (only needed first time)
npm run dev
```

**Output should show:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## 🌐 Accessing the Application

Once both servers are running:
1. Open your browser to **http://localhost:5173**
2. The frontend will communicate with the backend at **http://localhost:8000**

## 📋 Backend Dependencies

Before running the backend, ensure you have Python 3.8+ installed:

```bash
# Check Python version
python --version

# If needed, create a virtual environment
python -m venv backend/.venv

# Activate virtual environment
# On Windows:
backend\.venv\Scripts\activate
# On macOS/Linux:
source backend/.venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt
```

## 🎨 Frontend Dependencies

Ensure Node.js 16+ is installed:

```bash
# Check Node version
node --version

# Install dependencies (first time only)
cd frontend
npm install
```

## 🚀 Development Workflow

### Backend Development
- Edit files in `backend/main.py`
- The server will auto-reload thanks to `--reload` flag
- Check terminal for any errors

### Frontend Development
- Edit React components in `frontend/src/`
- Vite provides Hot Module Replacement (HMR)
- Changes appear instantly in the browser
- Check browser console and terminal for errors

## ✅ Health Check

Test if both servers are running:

```bash
# Backend health check
curl http://localhost:8000/health

# Should return:
# {"status":"CardioSense AI API is running","models":["XGBoost","LightGBM","CatBoost"]}
```

## 🐛 Troubleshooting

### Port Already in Use
If you get "Address already in use" errors:

**Backend (port 8000):**
```bash
# Kill process on port 8000
# On macOS/Linux:
lsof -ti:8000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend (port 5173):**
```bash
# Kill process on port 5173
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Backend Connection Error
If frontend shows "Failed to connect to backend":
1. Check backend is running on `http://localhost:8000`
2. Check browser console for CORS errors
3. Restart both servers

### Missing Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

## 📦 Project Structure

```
CardioSense AI/
├── frontend/          # React + Vite app
├── backend/           # FastAPI server
├── README.md          # Full documentation
└── STARTUP.md         # This file
```

## 🎯 Next Steps

1. **Integrate ML Models** - Replace mock predictions in `backend/main.py`
2. **Customize Styling** - Edit `frontend/src/index.css`
3. **Add Features** - Create new React components in `frontend/src/components/`
4. **Deploy** - Follow deployment guides in README.md

## 📞 Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the component files for implementation details
- Check browser console and terminal for error messages

---

**Happy Coding! 🚀**
