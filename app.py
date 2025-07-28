from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

# Load model and vectorizer
model = joblib.load("Logistic Regression_model.pkl")  # or XGBoost_model.pkl
vectorizer = joblib.load("tfidf_vectorizer.pkl")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    title = data.get('title', '')
    content = data.get('content', '')

    # Combine title and content
    full_text = title + " " + content
    vectorized_text = vectorizer.transform([full_text])
    prediction = model.predict(vectorized_text)[0]
    prob = model.predict_proba(vectorized_text)[0].tolist() if hasattr(model, "predict_proba") else [0, 0]

    result = {
        'prediction': int(prediction),  # 0 = real, 1 = fake
        'confidence': round(max(prob) * 100, 2)
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
