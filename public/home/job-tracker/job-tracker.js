// Job Tracker Page Script

// State Management
let jobs = []
let currentEditId = null

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadJobsFromLocalStorage()
  setupJobForm()
  setupEditForm()
  updateJobStats()
  renderJobsTable()
})

// Setup job form submission
function setupJobForm() {
  const form = document.getElementById("job-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    addJob()
  })

  // Set today's date as default
  document.getElementById("applied-date").valueAsDate = new Date()
}

// Setup edit form submission
function setupEditForm() {
  const form = document.getElementById("edit-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    saveJobEdit()
  })
}

// Add Job
function addJob() {
  const company = document.getElementById("company").value
  const position = document.getElementById("position").value
  const appliedDate = document.getElementById("applied-date").value
  const status = document.getElementById("status").value
  const notes = document.getElementById("notes").value

  const job = {
    id: Date.now(),
    company,
    position,
    appliedDate,
    status,
    notes,
  }

  jobs.push(job)
  saveJobsToLocalStorage()
  updateJobStats()
  renderJobsTable()

  // Reset form
  document.getElementById("job-form").reset()
  document.getElementById("applied-date").valueAsDate = new Date()
}

// Delete Job
function deleteJob(id) {
  if (confirm("Are you sure you want to delete this application?")) {
    jobs = jobs.filter((job) => job.id !== id)
    saveJobsToLocalStorage()
    updateJobStats()
    renderJobsTable()
  }
}

// Open Edit Modal
function openEditModal(id) {
  currentEditId = id
  const job = jobs.find((j) => j.id === id)

  if (job) {
    document.getElementById("edit-company").value = job.company
    document.getElementById("edit-position").value = job.position
    document.getElementById("edit-applied-date").value = job.appliedDate
    document.getElementById("edit-status").value = job.status
    document.getElementById("edit-notes").value = job.notes

    document.getElementById("edit-modal").classList.remove("hidden")
  }
}

// Close Edit Modal
function closeEditModal() {
  document.getElementById("edit-modal").classList.add("hidden")
  currentEditId = null
}

// Save Job Edit
function saveJobEdit() {
  const jobIndex = jobs.findIndex((j) => j.id === currentEditId)

  if (jobIndex !== -1) {
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      company: document.getElementById("edit-company").value,
      position: document.getElementById("edit-position").value,
      appliedDate: document.getElementById("edit-applied-date").value,
      status: document.getElementById("edit-status").value,
      notes: document.getElementById("edit-notes").value,
    }

    saveJobsToLocalStorage()
    updateJobStats()
    renderJobsTable()
    closeEditModal()
  }
}

// Render Jobs Table
function renderJobsTable() {
  const tbody = document.getElementById("jobs-tbody")
  const emptyState = document.getElementById("jobs-empty")
  const tableWrapper = document.getElementById("jobs-table-wrapper")

  tbody.innerHTML = ""

  if (jobs.length === 0) {
    emptyState.classList.remove("hidden")
    tableWrapper.classList.add("hidden")
    return
  }

  emptyState.classList.add("hidden")
  tableWrapper.classList.remove("hidden")

  jobs.forEach((job) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td><strong>${escapeHtml(job.company)}</strong></td>
      <td>${escapeHtml(job.position)}</td>
      <td>${formatDate(job.appliedDate)}</td>
      <td>
        <span class="status-badge status-${job.status.toLowerCase()}">
          ${escapeHtml(job.status)}
        </span>
      </td>
      <td>${escapeHtml(job.notes.substring(0, 30))}${job.notes.length > 30 ? "..." : ""}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-edit" onclick="openEditModal(${job.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteJob(${job.id})">Delete</button>
        </div>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Update Job Stats
function updateJobStats() {
  const total = jobs.length
  const interviews = jobs.filter((j) => j.status === "Interview").length
  const offers = jobs.filter((j) => j.status === "Offer").length
  const rejected = jobs.filter((j) => j.status === "Rejected").length

  document.getElementById("total-apps").textContent = total
  document.getElementById("interview-apps").textContent = interviews
  document.getElementById("offer-apps").textContent = offers
  document.getElementById("rejected-apps").textContent = rejected
}

// LocalStorage Management
function saveJobsToLocalStorage() {
  localStorage.setItem("careerHubJobs", JSON.stringify(jobs))
}

function loadJobsFromLocalStorage() {
  const stored = localStorage.getItem("careerHubJobs")
  jobs = stored ? JSON.parse(stored) : []
}

// Utilities
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}
