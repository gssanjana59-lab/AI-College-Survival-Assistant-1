require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

console.log(
  "API KEY STATUS:",
  process.env.GEMINI_API_KEY ? "LOADED ✅" : "NOT FOUND ❌"
);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI College Survival Assistant API Running"
  });
});

function validateStudentData(data) {

  const requiredFields = [
    "branch",
    "semester",
    "cgpa",
    "hours",
    "placement",
    "attendance",
    "skill",
    "daysLeft"
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing field: ${field}`;
    }
  }

  return null;
}

app.post("/study-plan", async (req, res) => {

  const validationError = validateStudentData(req.body);

  if (validationError) {
    return res.status(400).json({
      error: validationError
    });
  }

  const {
    branch,
    semester,
    cgpa,
    hours,
    placement,
    attendance,
    skill,
    daysLeft
  } = req.body;

  try {

    console.log("Generating AI Study Plan...");

    const prompt = `
You are an expert AI College Mentor.

Student Profile:

Branch: ${branch}
Semester: ${semester}
CGPA: ${cgpa}
Study Hours: ${hours}
Placement Readiness: ${placement}/10
Attendance: ${attendance}%
Skill: ${skill}
Days Left For Exam: ${daysLeft}

Generate:

1. Personalized Study Plan
2. Placement Preparation Strategy
3. Project Recommendations
4. Exam Preparation Roadmap
5. Career Guidance

Keep response motivational and practical.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    return res.status(200).json({
      success: true,
      source: "Gemini AI",
      plan: result.text
    });

  } catch (error) {

    console.error("Gemini API Error:", error.message);

    let fallbackPlan = `
🎓 AI COLLEGE SURVIVAL REPORT

Branch: ${branch}
Semester: ${semester}
CGPA: ${cgpa}

═══════════════════════

📚 STUDY PLAN

• Core Subjects: ${Math.max(1, Math.floor(hours * 0.4))} Hours

• Coding Practice: ${Math.max(1, Math.floor(hours * 0.3))} Hours

• Projects: ${Math.max(1, Math.floor(hours * 0.2))} Hours

• Revision: ${Math.max(1, Math.floor(hours * 0.1))} Hours

═══════════════════════

🚀 PLACEMENT STRATEGY

• Solve Coding Questions Daily

• Practice Aptitude Tests

• Build Resume

• Attend Mock Interviews

• Improve LinkedIn Profile

═══════════════════════

💻 PROJECT IDEAS

• ${skill} Portfolio Project

• Student Management System

• Placement Tracker

• AI Career Advisor

═══════════════════════

🎯 CAREER GUIDANCE

Focus on practical skills, projects,
problem solving, and interview preparation.

Stay consistent for the next ${daysLeft} days.

Good Luck! 🚀
`;

    return res.status(200).json({
      success: true,
      source: "Fallback Recommendation Engine",
      plan: fallbackPlan
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});