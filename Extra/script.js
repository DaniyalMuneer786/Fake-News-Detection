// Mobile Navigation
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Hide mobile menu if open
            if (window.innerWidth <= 768) {
                hideMenu();
            }
        }
    });
});

// Fake News Detection Logic
document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const source = document.getElementById('news-source').value;
    
    // Analyze the news
    const result = analyzeNews(title, content, source);
    
    // Display the result
    displayResult(result);
});

function analyzeNews(title, content, source) {
    // This is a simplified algorithm for demonstration purposes
    // In a real application, this would use machine learning or more sophisticated analysis
    
    let credibilityScore = 100;
    const redFlags = [];
    const suggestions = [];
    
    // Check for clickbait title patterns
    if (title.includes('!') || title.includes('?') || title.toUpperCase() === title) {
        credibilityScore -= 15;
        redFlags.push('Sensationalist headline (excessive punctuation or all caps)');
    }
    
    if (title.includes('SHOCKING') || title.includes('YOU WON\'T BELIEVE') || 
        title.includes('MIND-BLOWING') || title.includes('INCREDIBLE')) {
        credibilityScore -= 20;
        redFlags.push('Clickbait language in headline');
    }
    
    // Check content length
    if (content.length < 100) {
        credibilityScore -= 15;
        redFlags.push('Very short content (credible news articles typically provide more detail)');
    }
    
    // Check for emotional language
    const emotionalWords = ['outrageous', 'shocking', 'horrific', 'terrible', 'amazing', 'unbelievable'];
    let emotionalCount = 0;
    
    emotionalWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        const matches = content.match(regex);
        if (matches) emotionalCount += matches.length;
    });
    
    if (emotionalCount > 2) {
        credibilityScore -= 10;
        redFlags.push('Excessive emotional language');
    }
    
    // Check for source credibility
    if (!source || source.trim() === '') {
        credibilityScore -= 15;
        redFlags.push('No source provided');
        suggestions.push('Always check the source of news articles');
    } else if (source.includes('blog') || source.includes('forum')) {
        credibilityScore -= 10;
        redFlags.push('Source appears to be a blog or forum (potentially less reliable)');
    }
    
    // Add general suggestions
    suggestions.push('Cross-check information with multiple reputable sources');
    suggestions.push('Look for articles that present multiple perspectives');
    suggestions.push('Check the publication date to ensure the information is current');
    
    // Determine risk level
    let riskLevel;
    if (credibilityScore < 50) {
        riskLevel = 'high';
    } else if (credibilityScore < 75) {
        riskLevel = 'medium';
    } else {
        riskLevel = 'low';
    }
    
    return {
        score: credibilityScore,
        riskLevel: riskLevel,
        redFlags: redFlags,
        suggestions: suggestions
    };
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    
    // Create result content
    let resultHTML = `
        <div class="result-content fade-in">
            <h3>Credibility Analysis</h3>
            <p>Credibility Score: <strong>${result.score}%</strong></p>
            <div class="credibility-meter">
                <div class="credibility-fill ${result.riskLevel}-risk" style="width: ${result.score}%"></div>
            </div>
            <p class="risk-level">Risk Level: <strong>${result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}</strong></p>
            
            <div class="result-details">
    `;
    
    // Add red flags if any
    if (result.redFlags.length > 0) {
        resultHTML += `
            <h4>Potential Issues Detected:</h4>
            <ul>
        `;
        
        result.redFlags.forEach(flag => {
            resultHTML += `<li>${flag}</li>`;
        });
        
        resultHTML += `</ul>`;
    }
    
    // Add suggestions
    resultHTML += `
            <h4>Recommendations:</h4>
            <ul>
    `;
    
    result.suggestions.forEach(suggestion => {
        resultHTML += `<li>${suggestion}</li>`;
    });
    
    resultHTML += `
            </ul>
        </div>
    </div>
    `;
    
    // Update the result div
    resultDiv.innerHTML = resultHTML;
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.card, .step, .stat-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('fade-in');
        }
    });
});