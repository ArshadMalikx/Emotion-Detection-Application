import cv2
from deepface import DeepFace

# Start webcam
cap = cv2.VideoCapture(0)
print("Press 'q' to quit.")

frame_count = 0
analysis_result = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_count += 1

    if frame_count % 5 == 0:
        try:
            analysis_result = DeepFace.analyze(
                frame,
                actions=['emotion'],
                enforce_detection=False,
                detector_backend='opencv'
            )
        except Exception as e:
            print("Error:", e)
            analysis_result = None

    if analysis_result:
        for face in analysis_result:
            region = face.get('region', {})
            emotions = face.get('emotion', {})
            if region and emotions:
                x, y, w, h = region['x'], region['y'], region['w'], region['h']

                # Draw bounding box
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

                # Get top 3 emotions
                top_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)[:3]
                for i, (emo, score) in enumerate(top_emotions):
                    text = f"{emo}: {int(score)}%"
                    cv2.putText(frame, text, (x, y - 10 - i * 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    # Show video
    cv2.imshow('Face & Emotion Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
