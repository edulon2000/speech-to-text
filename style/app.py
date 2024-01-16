from flask import Flask, render_template, request
import speech_recognition as sr

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/processar_fala', methods=['POST'])
def processar_fala():
    if request.method == 'POST':
        reconhecedor = sr.Recognizer()
        try:
            # Recebe o áudio do frontend
            audio_data = request.files['audio'].read()

            # Converte o áudio em texto
            texto = reconhecedor.recognize_google(audio_data, language='pt-BR')

            return render_template('index.html', resultado=texto)
        except sr.UnknownValueError:
            return render_template('index.html', resultado="Não foi possível entender a fala")
        except sr.RequestError as e:
            return render_template('index.html', resultado=f"Erro na requisição do serviço de reconhecimento de fala: {e}")

if __name__ == '__main__':
    app.run(debug=True)