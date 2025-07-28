document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, content: content })
    })
    .then(response => response.json())
    .then(data => {
        displayPrediction(data.prediction, data.confidence);
    })
    .catch(error => {
        console.error("Prediction error:", error);
        alert("Something went wrong. Try again.");
    });
});

function displayPrediction(prediction, confidence) {
    const resultDiv = document.getElementById('result');
    const label = prediction === 0 ? "Real News" : "Fake News";
    const riskClass = prediction === 0 ? "low-risk" : "high-risk";

    let resultHTML = `
        <div class="result-content fade-in">
            <h3>Prediction Result</h3>
            <p>Detected: <strong>${label}</strong></p>
            <div class="credibility-meter">
                <div class="credibility-fill ${riskClass}" style="width: ${confidence}%"></div>
            </div>
            <p class="risk-level">Confidence: <strong>${confidence}%</strong></p>
        </div>
    `;
    resultDiv.innerHTML = resultHTML;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
