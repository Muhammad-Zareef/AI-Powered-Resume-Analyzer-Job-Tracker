// Resume Analyzer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const analyzeBtn = document.getElementById('analyze-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const resumeText = document.getElementById('resume-text');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const resultsContent = document.getElementById('results-content');
    const suggestionsList = document.getElementById('suggestions-list');
    const grammarFixesText = document.getElementById('grammar-fixes-text');
    const overallScoreText = document.getElementById('overall-score-text');
    const overallScoreCircle = document.getElementById('overall-score-circle');
    const atsScoreText = document.getElementById('ats-score-text');
    const atsScoreCircle = document.getElementById('ats-score-circle');
    
    // Sample analysis data
    const sampleAnalysis = {
        score: 82,
        suggestions: [
            "Add measurable achievements with specific metrics",
            "Rewrite summary to be more professional and concise",
            "Improve grammar in job experience section",
            "Include more relevant keywords for target roles",
            "Add certifications and relevant training",
            "Quantify accomplishments with percentages and numbers"
        ],
        grammarFixes: `"Senior Software Engineer with <span class="line-through">5+ years</span> <span class="font-bold text-accent">more than 5 years</span> of experience in full-stack development. Skilled in JavaScript, Python, and cloud technologies. <span class="line-through">Led a team of 4 developers to deliver</span> <span class="font-bold text-accent">Managed a team of four developers to successfully implement</span> a customer portal that increased user engagement by 30%. Seeking to leverage technical expertise in a challenging role at a forward-thinking company."`,
        atsScore: 75
    };
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
        const text = resumeText.value.trim();
        
        if (!text) {
            alert('Please enter or paste your resume text first.');
            return;
        }
        
        // Simulate API call delay
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Analyzing...';
        analyzeBtn.disabled = true;
        
        setTimeout(() => {
            showAnalysisResults();
            analyzeBtn.innerHTML = '<i class="fas fa-chart-line mr-2"></i> Analyze Resume';
            analyzeBtn.disabled = false;
        }, 1500);
    });
    
    // Upload button click handler
    uploadBtn.addEventListener('click', function() {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt,.doc,.docx,.pdf';
        
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Check file type
            const fileType = file.type;
            const validTypes = ['text/plain', 'application/pdf', 'application/msword', 
                               'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!validTypes.includes(fileType) && !file.name.match(/\.(txt|doc|docx|pdf)$/i)) {
                alert('Please upload a text, PDF, or Word document.');
                return;
            }
            
            // Simulate file reading
            uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Uploading...';
            
            setTimeout(() => {
                // For demo purposes, we'll just add sample text
                if (resumeText.value.trim() === '') {
                    resumeText.value = `SENIOR SOFTWARE ENGINEER

SUMMARY
Experienced software engineer with over 5 years in full-stack development. Proficient in JavaScript, Python, and cloud technologies. Seeking to leverage technical skills in a challenging role.

EXPERIENCE
Software Developer at TechCorp Inc. (2019-Present)
- Led team of 4 developers
- Built customer portal
- Worked on various projects

EDUCATION
BS Computer Science, State University (2018)`;
                }
                
                uploadBtn.innerHTML = '<i class="fas fa-upload mr-2"></i> Upload Text File';
                alert('File uploaded successfully! You can now analyze your resume.');
            }, 1000);
        };
        
        fileInput.click();
    });
    
    // Function to display analysis results
    function showAnalysisResults() {
        // Hide placeholder, show results
        resultsPlaceholder.classList.add('hidden');
        resultsContent.classList.remove('hidden');
        
        // Update scores
        updateScoreCircle(overallScoreCircle, sampleAnalysis.score, overallScoreText);
        updateScoreCircle(atsScoreCircle, sampleAnalysis.atsScore, atsScoreText);
        
        // Update suggestions
        suggestionsList.innerHTML = '';
        sampleAnalysis.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `<i class="fas fa-check-circle text-accent mt-1 mr-3"></i><span>${suggestion}</span>`;
            suggestionsList.appendChild(li);
        });
        
        // Update grammar fixes
        grammarFixesText.innerHTML = sampleAnalysis.grammarFixes;
    }
    
    // Function to animate progress circle
    function updateScoreCircle(circleElement, score, textElement) {
        const radius = circleElement.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        // Set initial state
        circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
        circleElement.style.strokeDashoffset = circumference;
        
        // Update text
        textElement.textContent = score;
        
        // Animate to final state
        const offset = circumference - (score / 100 * circumference);
        
        setTimeout(() => {
            circleElement.style.strokeDashoffset = offset;
        }, 300);
    }
    
    // Textarea auto-resize
    resumeText.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});