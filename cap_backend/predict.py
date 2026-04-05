#!/usr/bin/env python3
"""
Python ML Bridge Script for Crop Recommendation System
Called by Node.js backend to make predictions using pickled ML model.
Usage: python predict.py <N> <P> <K> <temperature> <humidity> <ph> <rainfall>

Source of truth: Crop_recommendation dataset.csv
- 2200 rows, 8 columns: N, P, K, temperature, humidity, ph, rainfall, label
- 22 unique crop labels (100 samples each)
- Predictions come STRICTLY from the trained model (.pkl files), not from the CSV at runtime.
  The CSV was used only to TRAIN the model. The pkl files encode the trained model.

Crops in dataset (from label column):
  rice, maize, jute, cotton, coconut, papaya, orange, apple, muskmelon,
  watermelon, grapes, mango, banana, pomegranate, lentil, blackgram,
  mungbean, mothbeans, pigeonpeas, kidneybeans, chickpea, coffee
"""

import sys
import json
import os
import pickle
import numpy as np

# ─── Crop label mapping ───────────────────────────────────────────────────────
# Source: df_dict from original app.py / label column of Crop_recommendation dataset.csv
# Maps numeric prediction output → crop name string
CROP_LABELS = {
    1: "rice",        2: "maize",       3: "jute",        4: "cotton",
    5: "coconut",     6: "papaya",      7: "orange",      8: "apple",
    9: "muskmelon",  10: "watermelon", 11: "grapes",     12: "mango",
    13: "banana",    14: "pomegranate",15: "lentil",     16: "blackgram",
    17: "mungbean",  18: "mothbeans",  19: "pigeonpeas", 20: "kidneybeans",
    21: "chickpea",  22: "coffee"
}

# ─── Crop icon mapping ───────────────────────────────────────────────────────
# Maps crop name → PNG filename served from /crop-icons/ in the frontend public dir.
# Only these 22 crops exist in the dataset.
CROP_ICONS = {
    "rice":        "rice.png",
    "maize":       "maize.png",
    "jute":        "jute.png",
    "cotton":      "cotton.png",
    "coconut":     "coconut.png",
    "papaya":      "papaya.png",
    "orange":      "orange.png",
    "apple":       "apple.png",
    "muskmelon":   "muskmelon.png",
    "watermelon":  "watermelon.png",
    "grapes":      "grapes.png",
    "mango":       "mango.png",
    "banana":      "banana.png",
    "pomegranate": "pomegranate.png",
    "lentil":      "lentils.png",
    "blackgram":   "blackgram.png",
    "mungbean":    "mungbeans.png",
    "mothbeans":   "mothbeans.png",
    "pigeonpeas":  "pigeonpea.png",
    "kidneybeans": "kidneybeans.png",
    "chickpea":    "chickpea.png",
    "coffee":      "coffee.png"
}


def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    """
    Load the trained ML model pkl files and return a prediction.
    All 22 possible output crops come strictly from the dataset label column.
    """
    # Path to the original pkl model files (not the CSV — CSV is training-time only)
    # Determine model directory.
    # Prefer an explicit environment variable; otherwise fall back to the local `model_files` folder.
    model_dir = os.environ.get(
    "MODEL_DIR",
    os.path.normpath(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "model_files"
        )
    )
)

    try:
        with open(os.path.join(model_dir, "model.pkl"), "rb") as f:
            model = pickle.load(f)
        with open(os.path.join(model_dir, "minmaxscaler.pkl"), "rb") as f:
            minmax = pickle.load(f)
        with open(os.path.join(model_dir, "standscaler.pkl"), "rb") as f:
            stand = pickle.load(f)
    except FileNotFoundError as e:
        return {"error": f"Model file not found: {str(e)}. Check MODEL_DIR in .env"}

    # Preprocess exactly as done in original app.py: MinMax then Standard scale
    features = np.array([[N, P, K, temperature, humidity, ph, rainfall]], dtype=float)
    scaled = minmax.transform(features)
    scaled = stand.transform(scaled)

    # Predict — result is a numeric code (1–22) mapped back to crop name
    prediction_code = int(model.predict(scaled)[0])
    crop_name = CROP_LABELS.get(prediction_code, "unknown")
    icon = CROP_ICONS.get(crop_name, "rice.png")

    return {
        "crop": crop_name,
        "icon": icon,
        "prediction_code": prediction_code
    }


if __name__ == "__main__":
    if len(sys.argv) != 8:
        print(json.dumps({"error": "Usage: python3 predict.py N P K temperature humidity ph rainfall"}))
        sys.exit(1)

    try:
        args = [float(sys.argv[i]) for i in range(1, 8)]
    except ValueError as e:
        print(json.dumps({"error": f"Invalid numeric input: {str(e)}"}))
        sys.exit(1)

    result = predict_crop(*args)
    print(json.dumps(result))
