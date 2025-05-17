from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_emotion():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream).convert('RGB')
    frame = np.array(image)

    try:
        analysis = DeepFace.analyze(
            frame,
            actions=['emotion'],
            enforce_detection=False,
            detector_backend='opencv'
        )
        emotions = sorted(
            analysis[0]['emotion'].items(),
            key=lambda x: x[1],
            reverse=True
        )

        # ✅ Ensure scores are Python floats
        top_emotions = [
            {'name': e[0], 'score': float(round(e[1], 2))}
            for e in emotions[:3]
        ]

        return jsonify({'emotions': top_emotions})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)