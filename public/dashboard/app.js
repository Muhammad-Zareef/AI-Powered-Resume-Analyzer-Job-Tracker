// ============================================
// MOCK DATA
// ============================================

// const resumes = [];

// const resumes = [
//   {
//     id: 1,
//     user: "John Doe",
//     atsScore: 85,
//     aiScore: 92,
//     improvedText:
//       "Senior Software Engineer with 8+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering scalable solutions.",
//     suggestions: [
//       "Add more quantifiable achievements",
//       "Include specific technologies used",
//       "Highlight leadership experience",
//     ],
//     createdDate: "2024-01-15",
//   },
//   {
//     id: 2,
//     user: "Jane Smith",
//     atsScore: 72,
//     aiScore: 78,
//     improvedText:
//       "Marketing Manager with expertise in digital marketing, SEO, and content strategy. Increased engagement by 150% through innovative campaigns.",
//     suggestions: ["Add metrics to achievements", "Include certifications", "Expand on campaign results"],
//     createdDate: "2024-01-14",
//   },
//   {
//     id: 3,
//     user: "Bob Johnson",
//     atsScore: 90,
//     aiScore: 88,
//     improvedText:
//       "Data Scientist with strong background in machine learning, Python, and statistical analysis. Published research in top-tier journals.",
//     suggestions: ["Highlight specific ML models used", "Add links to publications", "Include GitHub profile"],
//     createdDate: "2024-01-13",
//   },
//   {
//     id: 4,
//     user: "Alice Williams",
//     atsScore: 68,
//     aiScore: 75,
//     improvedText:
//       "UX Designer passionate about creating intuitive user experiences. Led design for 10+ mobile applications.",
//     suggestions: ["Add portfolio link", "Include design tools expertise", "Quantify user satisfaction improvements"],
//     createdDate: "2024-01-12",
//   },
//   {
//     id: 5,
//     user: "Charlie Brown",
//     atsScore: 95,
//     aiScore: 94,
//     improvedText:
//       "DevOps Engineer with expertise in AWS, Docker, Kubernetes, and CI/CD pipelines. Reduced deployment time by 70%.",
//     suggestions: [
//       "Add cloud certifications",
//       "Include infrastructure as code experience",
//       "Expand on automation achievements",
//     ],
//     createdDate: "2024-01-11",
//   },
// ]

// let jobs = [
//   {
//     id: 1,
//     company: "TechCorp",
//     position: "Senior Developer",
//     description: "Looking for an experienced developer with React and Node.js skills.",
//     status: "Interview",
//     jobLink: "https://techcorp.com/careers/senior-dev",
//     notes: "Second round interview scheduled for next week",
//     appliedDate: "2024-01-10",
//   },
//   {
//     id: 2,
//     company: "StartupXYZ",
//     position: "Full Stack Engineer",
//     description: "Join our fast-growing startup building the next generation of web apps.",
//     status: "Applied",
//     jobLink: "https://startupxyz.com/jobs/fullstack",
//     notes: "Applied through LinkedIn",
//     appliedDate: "2024-01-12",
//   },
//   {
//     id: 3,
//     company: "BigCorp Inc",
//     position: "Lead Frontend Developer",
//     description: "Lead a team of frontend developers building enterprise applications.",
//     status: "Offer",
//     jobLink: "https://bigcorp.com/careers/lead-frontend",
//     notes: "Received offer, negotiating salary",
//     appliedDate: "2024-01-05",
//   },
//   {
//     id: 4,
//     company: "DesignStudio",
//     position: "UI/UX Designer",
//     description: "Create beautiful and functional user interfaces for web and mobile.",
//     status: "Rejected",
//     jobLink: "https://designstudio.com/careers/ux",
//     notes: "Not enough design experience",
//     appliedDate: "2024-01-08",
//   },
// ]

// let users = [
//   {
//     id: 1,
//     name: "Admin User",
//     email: "admin@example.com",
//     role: "Admin",
//     createdDate: "2023-12-01",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "User",
//     createdDate: "2024-01-05",
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "User",
//     createdDate: "2024-01-08",
//   },
//   {
//     id: 4,
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     role: "User",
//     createdDate: "2024-01-10",
//   },
// ]

async function checkUserRole() {
    try {
        const res = await axios.get("http://localhost:3000/admin/dashboard", { withCredentials: true });
        console.log(res);
        document.getElementById('admin-name').textContent = res.data.admin.name;
    } catch (err) {
        // window.location.href = "/index.html";
        console.log(err);
    }
}

const getResumes = async () => {
    try {
        const res = await axios.get("http://localhost:3000/admin/getResumes", { withCredentials: true });
        console.log(res);
        renderResumeTable(res.data);
    } catch (err) {
        console.log(err);
    }
}

const getJobs = async () => {
    try {
        const res = await axios.get("http://localhost:3000/admin/getJobs", { withCredentials: true });
        console.log(res);
        renderJobTable(res.data);
        // renderUsers(res.data);
    } catch (err) {
        console.log(err);
    }
}

const getUsers = async () => {
    try {
        const res = await axios.get("http://localhost:3000/admin/users", { withCredentials: true });
        console.log(res);
        renderUserTable(res.data);
    } catch (err) {
        console.log(err);
    }
}

async function loadDashboardStats() {
  try {
      const res = await axios.get("http://localhost:3000/admin/dashboard-stats", { withCredentials: true });
    console.log(res)
    if (!res.data.success) return;
    const stats = res.data.data;

    document.getElementById("totalResumes").textContent = stats.totalResumes;
    document.getElementById("resumeGrowth").textContent = stats.resumeGrowth + "%";

    document.getElementById("totalJobs").textContent = stats.totalJobs;
    document.getElementById("jobGrowth").textContent = stats.jobGrowth + "%";

    document.getElementById("totalUsers").textContent = stats.totalUsers;
    document.getElementById("userGrowth").textContent = stats.userGrowth + "%";
  } catch (err) {
    console.error("Dashboard stats error:", err);
  }
}

const activityConfig = {
  resume: {
    bg: "bg-primary-100 dark:bg-primary-900",
    icon: "fas fa-file-upload text-primary-600 dark:text-primary-400"
  },
  job: {
    bg: "bg-green-100 dark:bg-green-900",
    icon: "fas fa-briefcase text-green-600 dark:text-green-400"
  },
  user: {
    bg: "bg-purple-100 dark:bg-purple-900",
    icon: "fas fa-user-plus text-purple-600 dark:text-purple-400"
  }
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return "just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
}

async function loadRecentActivity() {
  try {
    const res = await axios.get("http://localhost:3000/admin/recent-activity", { withCredentials: true });
    // const res = await fetch("/api/admin/recent-activity");
    const result = res.data;
    console.log(res)
    if (!result.success) return;
  
    const container = document.getElementById("recentActivityList");
    container.innerHTML = "";
  
    result.data.forEach((item, index) => {
      const config = activityConfig[item.type];
  
      container.innerHTML += `
        <div class="flex items-start space-x-3 pb-4 ${index !== result.data.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}">
          <div class="w-10 h-10 ${config.bg} rounded-full flex items-center justify-center flex-shrink-0">
            <i class="${config.icon}"></i>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white">${item.title}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              ${item.description} • ${timeAgo(item.createdAt)}
            </p>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.log(err);
  }
}


// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
  const theme = localStorage.getItem("theme") || "light"
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark")
  localStorage.setItem("theme", isDark ? "dark" : "light")
}

// ============================================
// SIDEBAR MANAGEMENT
// ============================================

function initSidebar() {
  const openBtn = document.getElementById("openSidebar")
  const closeBtn = document.getElementById("closeSidebar")
  const sidebar = document.getElementById("sidebar")
  const overlay = document.getElementById("sidebarOverlay")

  openBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full")
    overlay.classList.remove("hidden")
  })

  closeBtn.addEventListener("click", closeSidebar)
  overlay.addEventListener("click", closeSidebar)

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full")
    overlay.classList.add("hidden")
  }
}

// ============================================
// NAVIGATION MANAGEMENT
// ============================================

function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const pages = document.querySelectorAll(".page-content")
  const pageTitle = document.getElementById("pageTitle")

  const pageTitles = {
    dashboard: "Dashboard Overview",
    resumes: "Resume Analysis History",
    jobs: "Job Management",
    users: "User Management",
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault()
      const targetPage = link.dataset.page

      // Update active nav link
      navLinks.forEach((l) => {
        l.classList.remove("bg-primary-600", "dark:bg-primary-700", "text-white")
        l.classList.add("text-gray-700", "dark:text-gray-300", "hover:bg-gray-100", "dark:hover:bg-gray-700")
      })
      link.classList.add("bg-primary-600", "dark:bg-primary-700", "text-white")
      link.classList.remove("text-gray-700", "dark:text-gray-300", "hover:bg-gray-100", "dark:hover:bg-gray-700")

      // Show target page
      pages.forEach((page) => page.classList.add("hidden"))
      document.getElementById(targetPage + "Page").classList.remove("hidden")

      // Update page title
      pageTitle.textContent = pageTitles[targetPage]

      // Close sidebar on mobile
      if (window.innerWidth < 1024) {
        document.getElementById("sidebar").classList.add("-translate-x-full")
        document.getElementById("sidebarOverlay").classList.add("hidden")
      }

      // Load data for the page
      if (targetPage === "resumes") {
        getResumes();
      } else if (targetPage === "jobs") {
        getJobs();
      } else if (targetPage === "users") {
        getUsers();
      }
    })
  })
}

// ============================================
// PROFILE DROPDOWN
// ============================================

function initProfileDropdown() {
  const profileBtn = document.getElementById("profileButton")
  const dropdown = document.getElementById("profileDropdown")

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    dropdown.classList.toggle("hidden")
  })

  document.addEventListener("click", () => {
    dropdown.classList.add("hidden")
  })
}

// ============================================
// MODAL UTILITIES
// ============================================

function createModal(title, content, actions = "") {
  const modal = document.createElement("div")
  modal.className = "fixed inset-0 z-50 overflow-y-auto modal-backdrop"
  modal.innerHTML = `
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75" onclick="closeModal()"></div>
            <div class="inline-block w-full max-w-2xl px-6 py-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl fade-in">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${title}</h3>
                    <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="mt-4">
                    ${content}
                </div>
                ${actions ? `<div class="mt-6 flex justify-end space-x-3">${actions}</div>` : ""}
            </div>
        </div>
    `
  return modal
}

function showModal(modal) {
  const container = document.getElementById("modalContainer")
  container.innerHTML = ""
  container.appendChild(modal)
}

function closeModal() {
  document.getElementById("modalContainer").innerHTML = ""
}

// Make closeModal globally accessible
window.closeModal = closeModal

// ============================================
// RESUME ANALYSIS FUNCTIONS
// ============================================

function renderResumeTable(resumes) {
  const tbody = document.getElementById("resumeTableBody")
  tbody.innerHTML = ""

  resumes.forEach((resume) => {
    const row = document.createElement("tr")
    row.className = "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"

    const atsColor =
      resume.atsScore >= 85
        ? "text-green-600 dark:text-green-400"
        : resume.atsScore >= 70
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-red-600 dark:text-red-400"

    const aiColor =
      resume.aiScore >= 85
        ? "text-green-600 dark:text-green-400"
        : resume.aiScore >= 70
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-red-600 dark:text-red-400"

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs font-medium">${resume.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">${resume.userName}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold ${atsColor}">${resume.atsScore}%</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold ${aiColor}">${resume.aiScore}%</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${new Date(resume.createdAt).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="viewResumeDetails('${resume._id}', '${resume.userName}', '${resume.atsScore}', '${resume.aiScore}', '${resume.aiImprovedText}', '${encodeURIComponent(JSON.stringify(resume.suggestions))}', '${resume.createdAt}')" class="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-3" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function viewResumeDetails(id, userName, atsScore, aiScore, aiImprovedText, suggestions, createdAt) {
  const safeSuggestions = JSON.parse(decodeURIComponent(suggestions))
  const content = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">User</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${userName}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">ATS Score</p>
                    <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">${atsScore}%</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">AI Score</p>
                    <p class="text-2xl font-bold text-green-600 dark:text-green-400">${aiScore}%</p>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">AI Improved Resume Text</p>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p class="text-sm text-gray-900 dark:text-white">${aiImprovedText}</p>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">AI Suggestions</p>
                <ul class="space-y-2">
                    ${safeSuggestions
                      .map(
                        (s) => `
                        <li class="flex items-start space-x-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span class="text-sm text-gray-900 dark:text-white">${s}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        </div>
    `

  const actions = `
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Close
        </button>
    `

  const modal = createModal("Resume Analysis Details", content, actions)
  showModal(modal)
}

// Make viewResumeDetails globally accessible
window.viewResumeDetails = viewResumeDetails

async function initResumeFilters() {
  const searchInput = document.getElementById("resumeSearch")
  const atsFilter = document.getElementById("atsFilter")
  const aiFilter = document.getElementById("aiFilter")
  const dateFilter = document.getElementById("dateFilter")
  try {
    const res = await axios.get("http://localhost:3000/admin/getResumes", { withCredentials: true });
    console.log(res);
    renderResumeTable(res.data);
  } catch (err) {
    console.log(err);
  }
  const applyFilters = async () => {
    // In a real app, this would filter the data and re-render
    const search = searchInput.value.trim();
    const ats = atsFilter.value;
    const ai = aiFilter.value;
    const date = dateFilter.value;
    console.log(search)
    console.log(ats)
    console.log(ai)
    console.log(date)
    console.log("Applying resume filters...");
    try {
      const query = new URLSearchParams({ search, ats, ai, date }).toString();
      console.log(query);
      const res = await axios.get(`http://localhost:3000/admin/resumes/filter?${query}`, { withCredentials: true });
      // const data = await res.json();
      console.log(res);
      // renderResumeTable(data.resumes); // pass backend data
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
    // renderResumeTable();
  }

  searchInput.addEventListener("input", applyFilters)
  atsFilter.addEventListener("change", applyFilters)
  aiFilter.addEventListener("change", applyFilters)
  dateFilter.addEventListener("change", applyFilters)
}

// ============================================
// JOB MANAGEMENT FUNCTIONS
// ============================================

function renderJobTable(jobs = []) {
  console.log("jobs", jobs)
  const tbody = document.getElementById("jobTableBody")
  tbody.innerHTML = ""

  jobs.forEach((job) => {
    const row = document.createElement("tr")
    row.className = "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"

    let statusColor = ""
    switch (job.status) {
      case "applied":
        statusColor = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        break
      case "interviewing":
        statusColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        break
      case "offered":
        statusColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        break
      case "rejected":
        statusColor = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        break
    }

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm font-medium text-gray-900 dark:text-white">${job.company}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-900 dark:text-white">${job.position}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
                    ${job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${new Date(job.appliedDate).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="viewJobDetails('${job.company}', '${job.position}', '${job.description}', '${job.status}', '${job.link}', '${job.notes}', '${job.appliedDate}', '${job._id}')" class="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-3" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editJob('${job._id}')" class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteJob('${job._id}', '${job.company}', '${job.position}')" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function viewJobDetails(company, position, description, status, jobLink, notes, appliedDate) {
  const content = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${company}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Position</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${position}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${status}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Applied Date</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">${new Date(appliedDate).toLocaleDateString()}</p>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Job Description</p>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p class="text-sm text-gray-900 dark:text-white">${description}</p>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Job Link</p>
                <a href="${jobLink}" target="_blank" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">${jobLink}</a>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Notes</p>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p class="text-sm text-gray-900 dark:text-white">${notes}</p>
                </div>
            </div>
        </div>
    `

  const actions = `
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Close
        </button>
    `

  const modal = createModal("Job Details", content, actions)
  showModal(modal)
}

function createJobForm(job = null) {
  const isEdit = job !== null
  const title = isEdit ? "Edit Job" : "Create New Job"
  const content = `
        <form id="jobForm" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                    <input type="text" id="jobCompany" value="${isEdit ? job.company : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                    <input type="text" id="jobPosition" value="${isEdit ? job.position : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Description</label>
                <textarea id="jobDescription" rows="3" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">${isEdit ? job.description : ""}</textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select id="jobStatus" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="applied" ${isEdit && job.status === "applied" ? "selected" : ""}>Applied</option>
                        <option value="interviewing" ${isEdit && job.status === "interviewing" ? "selected" : ""}>Interviewing</option>
                        <option value="offered" ${isEdit && job.status === "offered" ? "selected" : ""}>Offered</option>
                        <option value="rejected" ${isEdit && job.status === "rejected" ? "selected" : ""}>Rejected</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Applied Date</label>
                    <input type="date" id="jobAppliedDate" value="${isEdit ? job.appliedDate.split("T")[0] : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Link</label>
                <input type="url" id="jobLink" value="${isEdit ? job.link : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                <textarea id="jobNotes" rows="2" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">${isEdit ? job.notes : ""}</textarea>
            </div>
        </form>
    `

  const actions = `
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Cancel
        </button>
        <button onclick="saveJob('${isEdit ? job._id : "null"}')" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
            ${isEdit ? "Update" : "Create"}
        </button>
    `

  const modal = createModal(title, content, actions)
  showModal(modal)
}

async function saveJob(id = null) {
  const company = document.getElementById("jobCompany").value
  const position = document.getElementById("jobPosition").value
  const description = document.getElementById("jobDescription").value
  const status = document.getElementById("jobStatus").value
  const appliedDate = document.getElementById("jobAppliedDate").value
  const link = document.getElementById("jobLink").value
  const notes = document.getElementById("jobNotes").value

  if (!company || !position || !description || !status || !appliedDate || !jobLink) {
    alert("Please fill in all required fields")
    return
  }

  if (id !== 'null') {
    // Update existing job
    try {
          await axios.put(`http://localhost:3000/admin/jobs/${id}`, { company, position, description, status, link, notes, appliedDate });
      } catch (error) {
          console.log(error);
      }
  } else {
    // Create new job
    const newJob = {
      company,
      position,
      description,
      status,
      appliedDate,
      link,
      notes,
    }
    try {
        const res = await axios.post('http://localhost:3000/admin/jobs', newJob);
        console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  // In a real app, this would make an API call
  console.log("Job saved:", id ? "updated" : "created")
  closeModal();
  getJobs();
}

async function editJob(id) {
  try {
    const res = await axios.get(`http://localhost:3000/admin/getJob/${id}`, { withCredentials: true });
    console.log(res);
    createJobForm(res.data.job);
  } catch (err) {
    console.log(err);
  }
}

function deleteJob(id, company, position) {
  // const job = jobs.find((j) => j.id === id)
  // if (!job) return

  const content = `
        <div class="text-center py-4">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
            </div>
            <p class="text-base text-gray-900 dark:text-white">Are you sure you want to delete this job?</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">${company} - ${position}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
    `

  const actions = `
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Cancel
        </button>
        <button onclick="confirmDeleteJob('${id}')" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            Delete
        </button>
    `

  const modal = createModal("Confirm Delete", content, actions)
  showModal(modal)
}

async function confirmDeleteJob(id) {
  // jobs = jobs.filter((j) => j.id !== id)

  // In a real app, this would make an API call
  console.log("Job deleted:", id)
  try {
    const res = await axios.delete(`http://localhost:3000/admin/jobs/${id}`);
    console.log(res)
    closeModal()
    getJobs();
    // renderJobTable()
  } catch (err) {
    console.log(err);
  }
}

// Make job functions globally accessible
window.viewJobDetails = viewJobDetails
window.editJob = editJob
window.deleteJob = deleteJob
window.saveJob = saveJob
window.confirmDeleteJob = confirmDeleteJob

async function initJobManagement() {
  document.getElementById("createJobBtn").addEventListener("click", () => {
    createJobForm()
  });

  const searchInput = document.getElementById("jobSearch")
  const statusFilter = document.getElementById("jobStatusFilter")
  const companyFilter = document.getElementById("jobCompanyFilter")

  try {
    const res = await axios.get("http://localhost:3000/admin/getJobs", { withCredentials: true });
    console.log(res);
    renderJobTable(res.data);
  } catch (err) {
    console.log(err);
  }

  const applyFilters = async () => {
    // In a real app, this would filter the data and re-render
    const params = new URLSearchParams();

    if (searchInput.value.trim()) {
      params.append("search", searchInput.value.trim());
    }

    if (statusFilter.value) {
      params.append("status", statusFilter.value);
    }

    if (companyFilter.value.trim()) {
      params.append("company", companyFilter.value.trim());
    }
    console.log(params);
    const res = await axios.get(`http://localhost:3000/admin/jobs/filter?${params.toString()}`);
    // const data = await res.json();
    console.log(res);
    // if (data.success) {
    //   renderJobTable(res.data);
    // }
    console.log("Applying job filters...")
    // renderJobTable()
  }

  searchInput.addEventListener("input", applyFilters)
  statusFilter.addEventListener("change", applyFilters)
  companyFilter.addEventListener("input", applyFilters)
}

// ============================================
// USER MANAGEMENT FUNCTIONS
// ============================================

function renderUserTable(users) {
  console.log(users)
  const tbody = document.getElementById("userTableBody")
  tbody.innerHTML = ""

  users.forEach((user) => {
    const row = document.createElement("tr")
    row.className = "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs font-medium">${user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">${user.name}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-900 dark:text-white">${user.email}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.role == "admin"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }">
                    ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="editUser('${user._id}')" class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteUser('${user._id}')" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function createUserForm(user = null) {
  const isEdit = user !== null
  const title = isEdit ? "Edit User" : "Create New User"

  const content = `
        <form id="userForm" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" id="userName" value="${isEdit ? user.name : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" id="userEmail" value="${isEdit ? user.email : ""}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            ${isEdit ? "" : `<div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input type="password" id="userPassword" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>`}
            
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <select id="userRole" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="user" ${isEdit && user.role == "user" ? "selected" : ""}>User</option>
                    <option value="admin" ${isEdit && user.role == "admin" ? "selected" : ""}>Admin</option>
                </select>
            </div>
        </form>
    `

  const actions = `
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Cancel
        </button>
        <button onclick="saveUser('${isEdit ? user._id : "null"}')" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
            ${isEdit ? "Update" : "Create"}
        </button>
    `

  const modal = createModal(title, content, actions)
  showModal(modal)
}

async function saveUser(id) {
  const name = document.getElementById("userName").value
  const email = document.getElementById("userEmail").value
  const role = document.getElementById("userRole").value

  if (!name || !email || !role) {
    alert("Please fill in all required fields")
    return
  }

  if (id !== 'null') {
    // Update existing user
    try {
        const res = await axios.put(`http://localhost:3000/admin/users/${id}`, { name, email, role });
        console.log(res)
      } catch (error) {
          console.log(error);
      }
  } else {
    // Create new user
    const newUser = {
      name,
      email,
      role,
    }
    try {
        const res = await axios.post('http://localhost:3000/admin/users', newUser);
        console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  // In a real app, this would make an API call
  console.log("User saved:", id ? "updated" : "created")

  closeModal()
  getUsers();
  // renderUserTable()
}

async function editUser(id) {
  try {
    const res = await axios.get(`http://localhost:3000/admin/getUser/${id}`, { withCredentials: true });
    console.log(res);
    createUserForm(res.data.user);
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(id) {
  console.log(id)
  // const user = users.find((u) => u.id === id)
  // if (!user) return
  try {
    const res = await axios.get(`http://localhost:3000/admin/getUser/${id}`, { withCredentials: true });
    console.log(res);
    const user = res.data.user;
    const content = `
          <div class="text-center py-4">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
              </div>
              <p class="text-base text-gray-900 dark:text-white">Are you sure you want to delete this user?</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">${user.name} (${user.email})</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">This action cannot be undone.</p>
          </div>
      `
      const actions = `
            <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Cancel
            </button>
            <button onclick="confirmDeleteUser('${id}')" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                Delete
            </button>
        `
      const modal = createModal("Confirm Delete", content, actions)
      showModal(modal)
  } catch (err) {
    console.log(err);
  }
}

async function confirmDeleteUser(id) {
  // users = users.filter((u) => u.id !== id)

  // In a real app, this would make an API call
  console.log("User deleted:", id)
  try {
    const res = await axios.delete(`http://localhost:3000/admin/users/${id}`);
    console.log(res)
    closeModal()
    getUsers();
    // renderJobTable()
  } catch (err) {
    console.log(err);
  }
}

// Make user functions globally accessible
window.editUser = editUser
window.deleteUser = deleteUser
window.saveUser = saveUser
window.confirmDeleteUser = confirmDeleteUser

function initUserManagement() {
  document.getElementById("createUserBtn").addEventListener("click", () => {
    createUserForm()
  })
}
console.log(Date.now())
async function logout() {
    // Swal.fire({
    //     title: "Logged Out!",
    //     text: "You have been successfully logged out",
    //     icon: "success",
    //     showConfirmButton: false,
    //     timer: 1250
    // });
    try {
        await axios.post("http://localhost:3000/admin/logout", { withCredentials: true });
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1000);
    } catch (err) {
        console.log(err);
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  
  checkUserRole();

  loadDashboardStats();

  loadRecentActivity();

  // Initialize theme
  initTheme()

  // Initialize sidebar
  initSidebar()

  // Initialize navigation
  initNavigation()

  // Initialize profile dropdown
  initProfileDropdown()

  // Initialize theme toggle
  document.getElementById("themeToggle").addEventListener("click", toggleTheme)

  // Initialize resume filters
  initResumeFilters()

  // Initialize job management
  initJobManagement()

  // Initialize user management
  initUserManagement()

  // Load initial data for dashboard
  getResumes();
  // renderResumeTable()

  document.getElementById('logout-button').addEventListener('click', logout);

  console.log("Admin Dashboard initialized successfully!")
})
