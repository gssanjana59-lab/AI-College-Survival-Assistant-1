function getFormData() {
    return {
        branch: document.getElementById("branch").value.trim(),
        semester: document.getElementById("semester").value.trim(),
        cgpa: document.getElementById("cgpa").value.trim(),
        hours: document.getElementById("hours").value.trim(),
        placement: document.getElementById("placement").value.trim(),
        attendance: document.getElementById("attendance").value.trim(),
        skill: document.getElementById("skill").value.trim(),
        daysLeft: document.getElementById("daysLeft").value.trim()
    };
}

function validateData(data) {

    for (const key in data) {
        if (!data[key]) {
            alert(`Please fill ${key}`);
            return false;
        }
    }

    if (data.cgpa < 0 || data.cgpa > 10) {
        alert("CGPA must be between 0 and 10");
        return false;
    }

    if (data.attendance < 0 || data.attendance > 100) {
        alert("Attendance must be between 0 and 100");
        return false;
    }

    return true;
}

async function generatePlan() {

    const studentData = getFormData();

    if (!validateData(studentData)) {
        return;
    }

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="loading-card">
            <h2>🤖 AI is generating your survival report...</h2>
            <p>Please wait a few seconds.</p>
        </div>
    `;

    try {

        const response = await fetch(
            "https://ai-college-survival-assistant-1.onrender.com/study-plan",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            }
        );

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        renderDashboard(studentData, data.plan);

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="error-card">
                <h2>❌ Something went wrong</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

function renderDashboard(studentData, aiPlan) {

    const result = document.getElementById("result");

    result.innerHTML = `

    <div class="report-header">
        🎓 AI College Survival Dashboard
    </div>

    <div class="dashboard-grid">

        <div class="card">
            <h3>📚 Academic Profile</h3>
            <p><strong>Branch:</strong> ${studentData.branch}</p>
            <p><strong>Semester:</strong> ${studentData.semester}</p>
            <p><strong>CGPA:</strong> ${studentData.cgpa}</p>
        </div>

        <div class="card">
            <h3>⏰ Study Schedule</h3>
            <p>${studentData.hours} Hours Daily</p>
            <ul>
                <li>Core Subjects</li>
                <li>DSA Practice</li>
                <li>Projects</li>
                <li>Revision</li>
            </ul>
        </div>

        <div class="card">
            <h3>🚀 Placement Tracker</h3>
            <p>${studentData.placement} Months Left</p>
            <ul>
                <li>Daily Coding</li>
                <li>Aptitude Practice</li>
                <li>Mock Interviews</li>
            </ul>
        </div>

        <div class="card">
            <h3>📊 Attendance Status</h3>
            <div class="progress">
                <div
                    class="progress-fill"
                    style="width:${studentData.attendance}%"
                >
                    ${studentData.attendance}%
                </div>
            </div>
        </div>

        <div class="card">
            <h3>🛠 Skill Focus</h3>
            <p>${studentData.skill}</p>
            <p>Build portfolio projects and upload to GitHub.</p>
        </div>

        <div class="card">
            <h3>🔥 Exam Countdown</h3>
            <h1>${studentData.daysLeft}</h1>
            <p>Days Remaining</p>
        </div>

    </div>

    <div class="ai-section">
        <h2>🤖 AI Recommendations</h2>
        <div class="ai-output">
            ${aiPlan || "No recommendations available"}
        </div>
    </div>

    `;
}