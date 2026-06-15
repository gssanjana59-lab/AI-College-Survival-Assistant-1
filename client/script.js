async function generatePlan() {

    const branch = document.getElementById("branch").value;
    const semester = document.getElementById("semester").value;
    const cgpa = document.getElementById("cgpa").value;
    const hours = document.getElementById("hours").value;
    const placement = document.getElementById("placement").value;
    const attendance = document.getElementById("attendance").value;
    const skill = document.getElementById("skill").value;
    const daysLeft = document.getElementById("daysLeft").value;

    const response = await fetch(
  "https://ai-college-survival-assistant-1.onrender.com/study-plan",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
);

    const data = await response.json();

    const result = document.getElementById("result");

    result.innerHTML = `

    <div class="report-header">
        🎓 AI College Survival Dashboard
    </div>

    <div class="dashboard-grid">

        <div class="card">
            <h3>📚 Academic Profile</h3>
            <p><strong>Branch:</strong> ${branch}</p>
            <p><strong>Semester:</strong> ${semester}</p>
            <p><strong>CGPA:</strong> ${cgpa}</p>
        </div>

        <div class="card">
            <h3>⏰ Study Schedule</h3>
            <p>${hours} Hours Daily</p>
            <ul>
                <li>Core Subjects</li>
                <li>DSA Practice</li>
                <li>Projects</li>
                <li>Revision</li>
            </ul>
        </div>

        <div class="card">
            <h3>🚀 Placement Tracker</h3>
            <p>${placement} Months Left</p>
            <ul>
                <li>Daily Coding</li>
                <li>Aptitude Practice</li>
                <li>Mock Interviews</li>
            </ul>
        </div>

        <div class="card">
            <h3>📊 Attendance Status</h3>
            <div class="progress">
                <div class="progress-fill" style="width:${attendance}%">
                    ${attendance}%
                </div>
            </div>
        </div>

        <div class="card">
            <h3>🛠 Skill Focus</h3>
            <p>${skill}</p>
            <p>Build portfolio projects and upload to GitHub.</p>
        </div>

        <div class="card">
            <h3>🔥 Exam Countdown</h3>
            <h1>${daysLeft}</h1>
            <p>Days Remaining</p>
        </div>

    </div>

    <div class="ai-section">
        <h2>🤖 AI Recommendations</h2>
        <div class="ai-output">
            ${data.plan || "No response"}
        </div>
    </div>

    `;
}