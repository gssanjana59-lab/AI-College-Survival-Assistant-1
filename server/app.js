require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

console.log(
  "API KEY STATUS:",
  process.env.GEMINI_API_KEY ? "LOADED ✅" : "NOT FOUND ❌"
);

app.get("/", (req, res) => {
  res.send("AI College Survival Assistant Running");
});

app.post("/study-plan", async (req, res) => {

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

    console.log("POST REQUEST RECEIVED");

    const prompt = `
You are an expert AI College Mentor.

Student Details:

Branch: ${branch}
Semester: ${semester}
CGPA: ${cgpa}
Daily Study Hours: ${hours}
Placement Readiness: ${placement}/10
Attendance: ${attendance}%
Skill: ${skill}
Days Left For Exam: ${daysLeft}

Generate:

1. Personalized Study Plan
2. Placement Strategy
3. Project Recommendations
4. Exam Preparation Strategy
5. Career Guidance

Make it detailed and motivational.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    res.json({
      plan: result.text
    });

  } catch (error) {

    console.log("GEMINI FAILED");
    console.error(error.message);

    let plan = `
🎓 AI COLLEGE SURVIVAL REPORT

━━━━━━━━━━━━━━━━━━━━━━

📚 ACADEMIC PROFILE

Branch: ${branch}
Semester: ${semester}
CGPA: ${cgpa}
Daily Study Time: ${hours} Hours

━━━━━━━━━━━━━━━━━━━━━━

📖 PERSONALIZED STUDY PLAN

• ${Math.max(1, Math.floor(hours * 0.4))} Hours Core Subjects

• ${Math.max(1, Math.floor(hours * 0.3))} Hours DSA / Problem Solving

• ${Math.max(1, Math.floor(hours * 0.2))} Hours Projects

• ${Math.max(1, Math.floor(hours * 0.1))} Hours Revision

━━━━━━━━━━━━━━━━━━━━━━

🚀 PLACEMENT STRATEGY

• Solve 3 Coding Problems Daily

• Practice Aptitude Tests

• Update Resume Weekly

• Attend Mock Interviews

• Build LinkedIn Profile

`;

    if (Number(attendance) < 75) {
      plan += `
⚠ ATTENDANCE ALERT

Current Attendance: ${attendance}%

Try attending every remaining class.
`;
    }

    if (Number(daysLeft) <= 7) {
      plan += `
━━━━━━━━━━━━━━━━━━━━━━

📖 EXAM MODE ACTIVATED

Day 1-2:
Important Topics

Day 3-4:
Previous Year Questions

Day 5:
Revision

Day 6:
Mock Test

Day 7:
Final Revision
`;
    }

    plan += `
━━━━━━━━━━━━━━━━━━━━━━

💻 PROJECT RECOMMENDATIONS

1. ${skill} Portfolio Project

2. Student Management System

3. AI Career Advisor

4. Placement Tracker

5. Smart Attendance System

━━━━━━━━━━━━━━━━━━━━━━

🎯 CAREER GUIDANCE
`;

    if (Number(cgpa) >= 8) {

      plan += `
• Target Product Companies

• Apply for Internships

• Build Advanced Projects

• Prepare for SDE Roles
`;

    } else {

      plan += `
• Focus on Improving CGPA

• Strengthen Fundamentals

• Complete Industry Projects

• Build Strong Resume
`;
    }

    plan += `
━━━━━━━━━━━━━━━━━━━━━━

🤖 AI ANALYSIS

Attendance Score: ${attendance}%

Placement Readiness: ${placement}/10

Preferred Skill: ${skill}

Recommendation:

You should focus on practical learning, projects,
coding practice, and interview preparation.
Consistency for the next ${daysLeft} days can
significantly improve your academic and placement performance.

Good Luck! 🚀
`;

    res.json({
      plan
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});