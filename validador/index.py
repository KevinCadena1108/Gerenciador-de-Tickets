import cv2
import numpy as np
import shutil
import os
from dotenv import load_dotenv
import requests
from PIL import Image

load_dotenv()

class Usuario:
  def __init__(self, cpf, imagem, nome):
    self.cpf = cpf
    self.imagem = imagem
    self.nome = nome

face_cascade = cv2.CascadeClassifier('./src/cascades/data/haarcascade_frontalface_alt2.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Checa se a pasta 'imagens' existe
path_imagens = './src/imagens'
if not os.path.exists(path_imagens):
  os.makedirs(path_imagens)
else:
  shutil.rmtree(path_imagens)
  os.makedirs(path_imagens)

# Baixa os dados de todos os usuarios
download_api_key = os.getenv('API_KEY')
users_info_url = f'http://localhost:3001/cliente/api?api-key={download_api_key}'
users_response = requests.get(users_info_url)
users_data = users_response.json()
users = []

# Baixa as imagens de todos os usuarios
for user in users_data:
  cpf = user['cpf']
  nome = user['nome']
  contem_imagem = user['imagem'] != None
  if not contem_imagem:
    print(f'O usuário {nome} não possui imagem!')
    continue
  
  url_imagem = f'http://localhost:3001/imagem/download/{cpf}?api-key={download_api_key}'
  imagem_response = requests.get(url_imagem)
  if imagem_response.status_code != 200:
    print(f'Erro ao baixar a imagem do usuário {nome}: {imagem_response.status_code}!')
    continue
  
  imagem = imagem_response.content
  path_imagem = f'{path_imagens}/{cpf}.png'
  with open(path_imagem, 'wb') as file:
    file.write(imagem)
    cliente = Usuario(cpf, path_imagem, nome)
    users.append(cliente)

# Treina o reconhecedor de faces
x_train = []
y_labels = []
current_id = 0
for user in users:
  pil_image = Image.open(user.imagem).convert('L')
  size = (550, 550)
  final_image = pil_image.resize(size, Image.ANTIALIAS)
  image_array = np.array(final_image, 'uint8')
  faces = face_cascade.detectMultiScale(image_array, scaleFactor=1.5, minNeighbors=5)

  for (x, y, w, h) in faces:
    roi = image_array[y:y+h, x:x+w]
    x_train.append(roi)
    y_labels.append(current_id)
    current_id += 1

print('Treinando imagens!')
recognizer.train(x_train, np.array(y_labels))
recognizer.save('./src/data/training_data.yml')
print('Treinamento concluído!')

# Reconhece as faces
cap = cv2.VideoCapture(0)

while (True):
  ret, frame = cap.read()
  gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
  faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)
  for (x, y, w, h) in faces:
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = frame[y:y+h, x:x+w]

    id, conf = recognizer.predict(roi_gray)

    if conf >= 70:
      usuario = users[id]
      font = cv2.FONT_HERSHEY_SIMPLEX
      name = usuario.nome
      color = (255, 255, 255)
      stroke = 2
      cv2.putText(frame, name, (x, y), font, 1, color, stroke, cv2.LINE_AA)
  

    img_item = "my-image.png"
    cv2.imwrite(img_item, roi_gray)

    color = (255, 0, 0)
    stroke = 2
    end_cord_x = x + w
    end_cord_y = y + h
    cv2.rectangle(frame, (x, y), (end_cord_x, end_cord_y), color, stroke)

  cv2.imshow('frame', frame)
  if cv2.waitKey(20) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()
