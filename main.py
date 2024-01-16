import speech_recognition as sr 

def ouvir_microfone():
    
    reconhecedor = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Diga algo:") 
        reconhecedor.adjust_for_ambient_noise(source)
        audio = reconhecedor.listen(source)
        
    try:
        texto = reconhecedor.recognize_google(audio, language='pt-BR')
        print(f"Você disse: {texto}")
    except sr.UnknownValueError:
        print(" Não foi possível entender sua fala")
    except sr.RequestError as e:
        print(f"Erro ao fazer a requisição para o serviço de reconhecimento de fala; {e}")
    
if __name__ == "__main__":
        ouvir_microfone()



    