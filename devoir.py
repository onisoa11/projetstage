import cv2
import numpy as np
import time
import sys
from ultralytics import YOLO

# Paramètres
CONFIDENCE = 0.5
font_scale = 1
thickness = 1

# Charger les étiquettes (labels) et les couleurs pour chaque classe
labels = open("data/coco.names").read().strip().split("\n")
colors = np.random.randint(0, 255, size=(len(labels), 3), dtype="uint8")

# Charger le modèle YOLO
model = YOLO("yolov8n.pt")

# Initialisation de la capture vidéo
cap = cv2.VideoCapture(0)  # 0 pour la webcam par défaut
_, image = cap.read()
h, w = image.shape[:2]

# Boucle principale
while True:
    _, image = cap.read()

    # Lancer l'inférence sur l'image
    start = time.perf_counter()
    results = model.predict(image, conf=CONFIDENCE)[0]
    time_took = time.perf_counter() - start

    # Boucle sur les détections
    for data in results.boxes.data.tolist():
        # Extraire les coordonnées de la boîte englobante et la confiance
        xmin, ymin, xmax, ymax, confidence, class_id = data
        xmin, ymin, xmax, ymax = int(xmin), int(ymin), int(xmax), int(ymax)
        class_id = int(class_id)

        # Si l'objet détecté est un téléphone (class_id selon coco.names)
        if labels[class_id] == "cell phone":
            # Dessiner la boîte englobante et le label
            color = [int(c) for c in colors[class_id]]
            cv2.rectangle(image, (xmin, ymin), (xmax, ymax), color=color, thickness=thickness)
            text = f"{labels[class_id]}: {confidence:.2f}"
            cv2.putText(image, text, (xmin, ymin - 5), cv2.FONT_HERSHEY_SIMPLEX, font_scale, color, thickness)

            # Déterminer la position du téléphone par rapport à l'image
            center_x = (xmin + xmax) // 2
            center_y = (ymin + ymax) // 2

            left = 1 if center_x < w // 2 else 0
            right = 1 if center_x > w // 2 else 0
            top = 1 if center_y < h // 2 else 0
            bottom = 1 if center_y > h // 2 else 0

            # Indicateurs de position
            gauche = 1 if left == 1 else 0
            droite = 1 if right == 1 else 0
            haut = 1 if top == 1 else 0
            bas = 1 if bottom == 1 else 0

            # Afficher les résultats
            print(f"Gauche: {gauche}, Droite: {droite}, Haut: {haut}, Bas: {bas}")

    # Afficher l'image avec les détections
    cv2.imshow("image", image)

    # Arrêter si on appuie sur 'q'
    if ord("q") == cv2.waitKey(1):
        break

# Libération des ressources
cap.release()
cv2.destroyAllWindows()
