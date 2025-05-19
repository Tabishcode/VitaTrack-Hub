from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import mediapipe as mp
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

selected_exercise = {"type": "push_up"}

@app.post("/set-exercise/")
def set_exercise(exercise: str = Form(...)):
    selected_exercise["type"] = exercise
    return {"message": f"Exercise set to {exercise}"}

@app.get("/video-feed/")
def video_feed():
    return StreamingResponse(generate_frames(selected_exercise["type"]),
                              media_type="multipart/x-mixed-replace; boundary=frame")

# ---------- Helpers ----------
def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    return 360 - angle if angle > 180 else angle

def get_landmark_xy(landmarks, index):
    return [landmarks[index].x, landmarks[index].y]

# ---------- Exercise Logic ----------
def get_exercise_logic(exercise, landmarks, w, h, stage, counter):
    display_angle, coords, validation = 0, (0, 0), "False"

    if exercise == "push_up":
        shoulder = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value)
        elbow = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value)
        wrist = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value)
        angle = calculate_angle(shoulder, elbow, wrist)
        coords = tuple(np.multiply(elbow, [w, h]).astype(int))

        if angle > 160:
            if stage == "down":
                counter += 1
                stage = "up"
        elif angle < 70:
            stage = "down"

        validation = "True" if stage in ["down", "up"] else "False"
        display_angle = angle

    elif exercise == "squat":
        hip = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_HIP.value)
        knee = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value)
        ankle = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value)
        angle = calculate_angle(hip, knee, ankle)
        coords = tuple(np.multiply(knee, [w, h]).astype(int))

        if angle > 160:
            if stage == "down":
                counter += 1
                stage = "up"
        elif angle < 90:
            stage = "down"

        validation = "True" if stage in ["down", "up"] else "False"
        display_angle = angle

    elif exercise == "bicep_curl":
        shoulder = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value)
        elbow = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value)
        wrist = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_WRIST.value)
        angle = calculate_angle(shoulder, elbow, wrist)
        coords = tuple(np.multiply(elbow, [w, h]).astype(int))

        if angle > 160:
            if stage == "up":
                counter += 1
                stage = "down"
        elif angle < 40:
            stage = "up"

        validation = "True" if stage in ["down", "up"] else "False"
        display_angle = angle

    elif exercise == "deadlift":
        shoulder = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value)
        hip = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_HIP.value)
        knee = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.LEFT_KNEE.value)
        angle = calculate_angle(shoulder, hip, knee)
        coords = tuple(np.multiply(hip, [w, h]).astype(int))

        if angle > 160:
            if stage == "down":
                counter += 1
                stage = "up"
        elif angle < 90:
            stage = "down"

        validation = "True" if stage in ["down", "up"] else "False"
        display_angle = angle

    elif exercise == "pull_up":
        shoulder = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value)
        elbow = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value)
        wrist = get_landmark_xy(landmarks, mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value)
        angle = calculate_angle(shoulder, elbow, wrist)
        coords = tuple(np.multiply(shoulder, [w, h]).astype(int))

        if angle > 160:
            if stage == "up":
                counter += 1
                stage = "down"
        elif angle < 60:
            stage = "up"

        validation = "True" if stage in ["down", "up"] else "False"
        display_angle = angle

    return display_angle, coords, validation, stage, counter

# ---------- Video Stream ----------
def generate_frames(exercise_type):
    counter, stage = 0, None
    cap = cv2.VideoCapture(0)

    with mp.solutions.pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.resize(frame, (960, 540))
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                h, w, _ = image.shape
                angle, coords, validation, stage, counter = get_exercise_logic(
                    exercise_type, landmarks, w, h, stage, counter
                )

                # Display data
                cv2.putText(image, f'{int(angle)}°', coords, cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
                cv2.putText(image, f'Exercise: {exercise_type}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(image, f'Counter: {counter}', (10, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(image, f'Status: {validation}', (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                            (0, 255, 0) if validation == "True" else (0, 0, 255), 2)

                mp.solutions.drawing_utils.draw_landmarks(
                    image, results.pose_landmarks, mp.solutions.pose.POSE_CONNECTIONS
                )

            _, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()