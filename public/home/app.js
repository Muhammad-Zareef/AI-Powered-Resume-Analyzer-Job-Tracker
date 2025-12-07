// State Management
let state = {
    currentTab: "analyzer",
    history: [],
    jobs: [],
    currentFilter: "all",
    editingJobId: null, // Add editing job ID to state
};

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    checkAuth();
    loadFromStorage();
    renderHistory();
    renderJobs();
});

async function checkAuth() {
    try {
        await axios.get("http://localhost:3000/api/resume/auth", { withCredentials: true });
    } catch (err) {
        window.location.href = "/index.html";
        console.log(err);
    }
}

// Tab Switching
function switchTab(tab) {
    state.currentTab = tab;
    document.getElementById("analyzerSection").className =
        tab === "analyzer" ? "visible-section" : "hidden-section";
    document.getElementById("trackerSection").className =
        tab === "tracker" ? "visible-section" : "hidden-section";
    document.getElementById("analyzerTab").style.borderColor =
        tab === "analyzer" ? "var(--primary)" : "transparent";
    document.getElementById("analyzerTab").style.color =
        tab === "analyzer" ? "var(--primary)" : "var(--secondary)";
    document.getElementById("trackerTab").style.borderColor =
        tab === "tracker" ? "var(--primary)" : "transparent";
    document.getElementById("trackerTab").style.color =
        tab === "tracker" ? "var(--primary)" : "var(--secondary)";
}

// Resume Analysis
function analyzeResume(e) {
    e.preventDefault();
    const resumeText = document.getElementById("resumeInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const errorText = document.getElementById("errorText");

    if (!resumeText) {
        errorText.textContent = "Please paste your resume text";
        errorMsg.classList.remove("hidden");
        return;
    }

    if (resumeText.length < 50) {
        errorText.textContent = "Resume text must be at least 50 characters";
        errorMsg.classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");
    document.getElementById("analyzeBtn").disabled = true;
    document.getElementById("analyzeBtn").innerHTML =
        '<i class="fas fa-spinner spinner mr-2"></i>Analyzing...';

    setTimeout(() => {
        const mockResponse = {
            id: Date.now().toString(),
            score: Math.floor(Math.random() * 20) + 75,
            atsScore: Math.floor(Math.random() * 20) + 70,
            suggestions: [
                "Add measurable achievements and quantifiable results",
                "Rewrite summary to highlight key competencies professionally",
                "Improve grammar and punctuation in job experience section",
                "Include relevant keywords matching job descriptions",
                "Format dates consistently throughout the document",
            ],
            grammarFixes:
                'Professional Summary: "I am a software engineer with 5 years of experience in full-stack development, specializing in React and Node.js. I have successfully delivered 15+ projects with a 98% client satisfaction rate."',
            resumePreview: resumeText.substring(0, 150) + "...",
            timestamp: Date.now(),
        };

        displayResults(mockResponse);
        state.history.unshift(mockResponse);
        saveToStorage();
        renderHistory();

        document.getElementById("analyzeBtn").disabled = false;
        document.getElementById("analyzeBtn").innerHTML =
            '<i class="fas fa-magic mr-2"></i>Analyze Resume';
    }, 1500);
}

function displayResults(data) {
    const overallDash = (data.score / 100) * 283;
    const atsDash = (data.atsScore / 100) * 283;

    document.getElementById("scoreValue").textContent = data.score;
    document.getElementById("atsScoreValue").textContent = data.atsScore;
    document
        .getElementById("overallCircle")
        .setAttribute("stroke-dasharray", `${overallDash} 283`);
    document
        .getElementById("atsCircle")
        .setAttribute("stroke-dasharray", `${atsDash} 283`);

    document.getElementById("scoreStatus").innerHTML =
        data.score >= 80
            ? '<i class="fas fa-check-circle mr-1"></i>Excellent'
            : '<i class="fas fa-alert mr-1"></i>Good';
    document.getElementById("atsStatus").innerHTML =
        data.atsScore >= 75
            ? '<i class="fas fa-thumbs-up mr-1"></i>Optimized'
            : '<i class="fas fa-wrench mr-1"></i>Needs Work';

    const suggestionsHtml = data.suggestions
        .map(
            (s, i) => `
                <li class="p-3 rounded-lg border-l-4 flex gap-3" style="background-color: var(--light-bg); border-color: var(--primary);">
                    <div class="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style="background-color: var(--primary);">${i + 1
                }</div>
                    <span style="color: var(--dark-text);">${s}</span>
                </li>
            `
        )
        .join("");
    document.getElementById("suggestionsContainer").innerHTML = suggestionsHtml;
    document.getElementById("grammarContainer").textContent = data.grammarFixes;
    document.getElementById("analysisTime").textContent = `Analyzed on ${new Date(
        data.timestamp
    ).toLocaleDateString()}`;

    document.getElementById("resultsSection").classList.remove("hidden-section");
    document.getElementById("resultsSection").classList.add("visible-section");

    setTimeout(
        () =>
            document
                .getElementById("resultsSection")
                .scrollIntoView({ behavior: "smooth" }),
        100
    );
}

// Job Tracker
function toggleJobForm() {
    document.getElementById("jobForm").classList.toggle("hidden");
}

function addJob(e) {
    e.preventDefault();
    const job = {
        id: Date.now().toString(),
        company: document.getElementById("jobCompany").value,
        position: document.getElementById("jobPosition").value,
        status: document.getElementById("jobStatus").value,
        appliedDate: Date.now(),
        notes: document.getElementById("jobNotes").value,
        link: document.getElementById("jobLink").value,
    };

    state.jobs.unshift(job);
    document.getElementById("jobForm").reset();
    toggleJobForm();
    saveToStorage();
    renderJobs();
}

function deleteJob(id) {
    state.jobs = state.jobs.filter((j) => j.id !== id);
    saveToStorage();
    renderJobs();
}

function updateJobStatus(id) {
    const job = state.jobs.find((j) => j.id === id);
    if (job) {
        const statuses = ["applied", "interviewing", "offered"];
        const idx = statuses.indexOf(job.status);
        job.status = statuses[(idx + 1) % statuses.length];
        saveToStorage();
        renderJobs();
    }
}

function filterJobs(status) {
    state.currentFilter = status;
    document.querySelectorAll(".filterBtn").forEach((btn) => {
        btn.style.backgroundColor =
            btn.dataset.filter === status ? "var(--primary)" : "";
        btn.style.color =
            btn.dataset.filter === status ? "white" : "var(--secondary)";
        btn.style.borderColor =
            btn.dataset.filter === status ? "var(--primary)" : "var(--border)";
    });
    renderJobs();
}

function renderJobs() {
    const filtered =
        state.currentFilter === "all"
            ? state.jobs
            : state.jobs.filter((j) => j.status === state.currentFilter);
    const html =
        filtered.length === 0
            ? '<div class="bg-white rounded-lg border p-12 text-center" style="border-color: var(--border);"><i class="fas fa-briefcase text-4xl mb-4 block" style="color: var(--border);"></i><p class="font-medium" style="color: var(--secondary);">No jobs yet</p><p class="text-sm" style="color: var(--secondary);">Start tracking your applications</p></div>'
            : filtered.map((job) => getJobCard(job)).join("");

    document.getElementById("jobsList").innerHTML = html;
    document.getElementById("jobCount").textContent = state.jobs.length;
    document.getElementById("jobCount").style.display =
        state.jobs.length > 0 ? "inline-block" : "none";
}

function getJobCard(job) {
    const statusColors = {
        applied: { bg: "#e3f2fd", text: "#1976d2", icon: "fa-paper-plane" },
        interviewing: { bg: "#f3e5f5", text: "#000000ff", icon: "fa-phone" },
        offered: { bg: "var(--accent)", text: "white", icon: "fa-check-circle" },
        rejected: { bg: "#ffebee", text: "#c62828", icon: "fa-times-circle" },
    };
    const colors = statusColors[job.status];

    return `
                <div class="bg-white rounded-lg border p-6" style="border-color: var(--border);">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold mb-1" style="color: var(--dark-text);">${job.position
        }</h3>
                            <p style="color: var(--secondary);">${job.company
        }</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-semibold border" style="background-color: ${colors.bg
        }; color: ${colors.text};">
                            <i class="fas ${colors.icon} mr-2"></i>${job.status.charAt(0).toUpperCase() + job.status.slice(1)
        }
                        </span>
                    </div>
                    ${job.notes
            ? `<p class="text-sm mb-3 p-3 rounded" style="color: var(--secondary); background-color: var(--light-bg);">${job.notes}</p>`
            : ""
        }
                    <div class="flex items-center justify-between text-sm" style="color: var(--secondary);">
                        <div class="flex items-center gap-4">
                            <span><i class="fas fa-calendar-alt mr-2" style="color: var(--primary);"></i>${new Date(
            job.appliedDate
        ).toLocaleDateString()}</span>
                            ${job.link
            ? `<a href="${job.link}" target="_blank" rel="noopener noreferrer" style="color: var(--primary);" class="hover:underline"><i class="fas fa-external-link-alt mr-1"></i>View Posting</a>`
            : ""
        }
                        </div>
                        <div class="flex gap-2">
                            <button onclick="openEditModal('${job.id
        }')" class="transition-colors" style="color: var(--primary);" title="Edit"><i class="fas fa-edit"></i></button>
                            <button onclick="updateJobStatus('${job.id
        }')" class="transition-colors" style="color: var(--primary);" title="Update Status"><i class="fas fa-arrow-right"></i></button>
                            <button onclick="deleteJob('${job.id
        }')" class="transition-colors" style="color: #c62828;" title="Delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
}

function openEditModal(jobId) {
    const job = state.jobs.find((j) => j.id === jobId);
    if (job) {
        state.editingJobId = jobId;
        document.getElementById("editJobCompany").value = job.company;
        document.getElementById("editJobPosition").value = job.position;
        document.getElementById("editJobStatus").value = job.status;
        document.getElementById("editJobLink").value = job.link || "";
        document.getElementById("editJobNotes").value = job.notes || "";
        document.getElementById("editJobModal").classList.remove("hidden");
    }
}

function closeEditModal() {
    state.editingJobId = null;
    document.getElementById("editJobModal").classList.add("hidden");
    document.getElementById("editJobForm").reset();
}

function saveJobEdit(e) {
    e.preventDefault();
    const job = state.jobs.find((j) => j.id === state.editingJobId);
    if (job) {
        job.company = document.getElementById("editJobCompany").value;
        job.position = document.getElementById("editJobPosition").value;
        job.status = document.getElementById("editJobStatus").value;
        job.link = document.getElementById("editJobLink").value;
        job.notes = document.getElementById("editJobNotes").value;
        saveToStorage();
        renderJobs();
        closeEditModal();
    }
}

// History Management
function toggleHistory() {
    document.getElementById("historySidebar").classList.toggle("hidden", window.innerWidth < 768);
}

function renderHistory() {
    document.getElementById("historyTotal").textContent = state.history.length;
    // document.getElementById("historyCount").textContent = state.history.length;
    // document.getElementById("historyCount").style.display = state.history.length > 0 ? "inline-block" : "none";

    const html =
        state.history.length === 0
            ? '<div class="text-center py-12" style="color: var(--secondary);"><i class="fas fa-inbox text-4xl mb-3 block opacity-30"></i><p class="text-sm">No analyses yet</p><p class="text-xs mt-1">Analyze your first resume to see it here</p></div>'
            : state.history
                .map(
                    (item) => `
            <div class="p-4 rounded-lg border cursor-pointer transition-colors" style="background-color: var(--light-bg); border-color: var(--border);">
                <div onclick="viewHistory('${item.id}')" class="mb-2">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold text-sm" style="color: var(--dark-text);">Score: ${item.score
                        }/100</span>
                        <span class="text-xs font-semibold px-2 py-1 rounded text-white" style="background-color: ${item.score >= 80 ? "var(--accent)" : "#fbc02d"
                        };">${item.score >= 80 ? "Great" : "Good"}</span>
                    </div>
                    <p class="text-xs" style="color: var(--secondary);">${item.resumePreview
                        }</p>
                    <p class="text-xs mt-2" style="color: var(--secondary);">${new Date(
                            item.timestamp
                        ).toLocaleDateString()}</p>
                </div>
                <button onclick="deleteHistory('${item.id
                        }')" class="w-full mt-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded font-medium transition-colors">
                    <i class="fas fa-trash mr-1"></i>Delete
                </button>
            </div>
        `
                )
                .join("");

    document.getElementById("historyContent").innerHTML = html;
    document
        .getElementById("historyClearBtn")
        .classList.toggle("hidden", state.history.length === 0);
}

function viewHistory(id) {
    const item = state.history.find((h) => h.id === id);
    if (item) {
        document.getElementById("resumeInput").value = item.resumePreview.replace(
            "...",
            ""
        );
        displayResults(item);
        switchTab("analyzer");
    }
}

function deleteHistory(id) {
    state.history = state.history.filter((h) => h.id !== id);
    saveToStorage();
    renderHistory();
}

function clearAllHistory() {
    if (confirm("Are you sure you want to clear all history?")) {
        state.history = [];
        document.getElementById("resultsSection").classList.add("hidden-section");
        saveToStorage();
        renderHistory();
    }
}

// Storage
function saveToStorage() {
    localStorage.setItem("resumeAnalyzerHistory", JSON.stringify(state.history));
    localStorage.setItem("jobTrackerData", JSON.stringify(state.jobs));
}

function loadFromStorage() {
    const history = localStorage.getItem("resumeAnalyzerHistory");
    const jobs = localStorage.getItem("jobTrackerData");
    if (history) state.history = JSON.parse(history);
    if (jobs) state.jobs = JSON.parse(jobs);
}

const logout = async () => {
    // Swal.fire({
    //     title: "Logged Out!",
    //     text: "You have been successfully logged out",
    //     icon: "success",
    //     showConfirmButton: false,
    //     timer: 1250
    // });
    try {
        const res = await axios.post("http://localhost:3000/api/logout", { withCredentials: true });
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1000);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
