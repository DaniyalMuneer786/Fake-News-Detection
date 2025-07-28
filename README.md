# 📰 Fake News Detection System

A machine learning-powered web application that predicts whether a news article is **Real** or **Fake**, helping users combat misinformation and make informed decisions.

---

## 🎯 Project Objective

To build a web-based system using machine learning that analyzes news headlines and content to determine their authenticity — Real or Fake — in real time.

---

## 🛠️ Technologies Used

### 🔧 Backend
- Python
- Flask – for backend server and API
- scikit-learn, XGBoost, joblib – for ML models and serialization

### 🎨 Frontend
- HTML, CSS – for layout and styling
- JavaScript – for form handling and displaying prediction results

---

## 📁 Dataset

- **Source:** Kaggle – [Fake and Real News Dataset](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset)
- **Files Used:** `True.csv` (real news), `Fake.csv` (fake news)
- **Preprocessing:**
  - Merged and labeled both datasets
  - Removed duplicates
  - Cleaned text
  - Vectorized with **TF-IDF** (`max_df=0.7`, `max_features=5000`)

---

## 🧠 Models Applied

| Model                  | Accuracy | Real F1 | Fake F1 |
|------------------------|----------|---------|---------|
| Naive Bayes            | 93%      | 93%     | 94%     |
| Support Vector Machine | 99%      | 99%     | 100%    |
| Logistic Regression    | 98%      | 98%     | 98%     |
| Random Forest          | 98%      | 98%     | 98%     |
| ✅ XGBoost              | 100%     | 100%    | 100%    |

> 🔝 **Best Model:** XGBoost with 100% accuracy

---

## 🔁 Training & Evaluation

- **Split:** 75% Training / 25% Testing (Stratified)
- **Vectorization:** `TfidfVectorizer`
- **Metrics:** Accuracy, Precision, Recall, F1-score, Confusion Matrix
- **Model Export:** Saved using `joblib`

---

## 🚀 How It Works

1. User enters **news headline** and **article content**
2. JavaScript sends data to Flask server via POST
3. Flask vectorizes input and runs it through the trained model
4. Prediction result (Real or Fake) is returned
5. JavaScript updates the interface with the result and visual indicators (risk level)

---

## 📁 Project Structure

Fake_News_Detection_project/
│
├── static/
│ ├── css/styles.css
│ └── js/script.js
│
├── templates/
│ └── index.html
│
├── app.py # Flask backend
├── Logistic_Regression_model.pkl
├── tfidf_vectorizer.pkl

yaml
Copy
Edit

---

## ✅ Conclusion

This project showcases how machine learning and web development can be combined to tackle digital misinformation. With a clean user interface and accurate predictions, the Fake News Detection System is a practical tool for verifying news credibility in real-time.

---

Would you like help generating:

requirements.txt file?

A GitHub-friendly screenshot preview?

Instructions on how to deploy this to GitHub Pages (or locally via Flask)?

Let me know and I’ll guide you through it!
