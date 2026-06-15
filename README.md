# 🎓 AI College Survival Assistant

## 📌 Problem Statement

College students often struggle with:

* Managing study schedules efficiently
* Preparing for placements alongside academics
* Maintaining attendance requirements
* Planning exam preparation effectively
* Identifying relevant projects and skills for career growth

Many students lack personalized guidance, resulting in poor time management and reduced productivity.

---

## 💡 Solution

AI College Survival Assistant is a full-stack web application that analyzes a student's academic profile and generates personalized recommendations.

The platform provides:

* 📚 Personalized Study Plans
* 🚀 Placement Preparation Strategies
* 📝 Exam Preparation Roadmaps
* 💻 Project Recommendations
* 🎯 Career Guidance
* 📊 Attendance Insights

This helps students make data-driven academic and career decisions.

---

## 🚀 Features

* Personalized Study Plan Generator
* Placement Readiness Analysis
* Attendance Warning System
* Exam Preparation Mode
* Skill-Based Project Recommendations
* Career Guidance Suggestions
* Responsive Dashboard UI
* REST API Backend
* AI-Powered Recommendations
* Fallback Recommendation Engine

---

## 🏗️ Architecture

Frontend (HTML, CSS, JavaScript)

⬇

Express REST API

⬇

AI Recommendation Engine

⬇

Personalized Student Report

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* CORS

### AI

* Gemini API
* Custom Fallback Recommendation Engine

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

AI-College-Survival-Assistant

├── client

│ ├── index.html

│ ├── style.css

│ └── script.js

│

├── server

│ ├── app.js

│ └── test.js

│

├── .gitignore

├── package.json

└── README.md

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/gssanjana59-lab/AI-College-Survival-Assistant-1.git
```

Navigate to project:

```bash
cd AI-College-Survival-Assistant-1
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm start
```

Run tests:

```bash
npm test
```

---

## 🔌 API Endpoint

### Generate Study Plan

POST /study-plan

Request Body:

```json
{
  "branch": "CSE",
  "semester": "6",
  "cgpa": "8.2",
  "hours": "5",
  "placement": "8",
  "attendance": "85",
  "skill": "AI/ML",
  "daysLeft": "15"
}
```

Response:

```json
{
  "success": true,
  "plan": "Generated Report"
}
```

---

## 📸 Screenshots
<img width="1366" height="768" alt="Screenshot (92)" src="https://github.com/user-attachments/assets/47fb726a-8fa6-43fe-a335-bf25f3f84b21" />
<img width="1366" height="768" alt="Screenshot (93)" src="https://github.com/user-attachments/assets/b1f1268a-a972-42e0-a928-495c7889dfa5" /> 
<img width="1366" height="768" alt="Screenshot (94)" src="https://github.com/user-attachments/assets/67f8f521-9b54-4b55-8e8f-2cfa9dbb7685" /> 
<img width="1366" height="768" alt="Screenshot (95)" src="https://github.com/user-attachments/assets/3f66ee83-8537-460e-b912-4ef258f9d6ed" />

* Homepage
* Dashboard
* AI Recommendation Output

---

## 🧪 Testing

Basic validation tests are implemented using Node.js assertions.

Run:

```bash
npm test
```

Test Coverage:

* CGPA Validation
* Input Validation
* Recommendation Engine Checks

---

## 🔒 Security

* API keys stored in environment variables
* .env file excluded using .gitignore
* Backend request validation implemented
* Sensitive credentials not committed to GitHub

---

## 🌟 Future Enhancements

* User Authentication
* MongoDB Integration
* AI Chat Assistant
* Weekly Planner
* PDF Export Reports
* Analytics Dashboard
* Performance Tracking

---

## 🌐 Live Demo

https://ai-college-survival-assistant-1-m1j.vercel.app

---

## 👩‍💻 Author

Sanjana

GitHub:
https://github.com/gssanjana59-lab

---

⭐ If you like this project, consider giving it a star.
