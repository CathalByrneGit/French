from gtts import gTTS
from pydub import AudioSegment
  
# assign files

  
# convert mp3 file to wav file

class Translator2:
    def __init__(self,language,accent,speed=True):
        self.lang=language
        self.speed=speed
        self.accent=accent
         

    def predict(self,text):
        self.speech=gTTS(text=text,lang=self.lang,slow=self.speed,tld=self.accent)
    

    def save(self,filename='speech.mp3'):
        self.file=filename
        self.speech.save(filename)


    def to_wav(self):
        sound = AudioSegment.from_mp3(self.file)
        sound.export(self.file[:-3]+'wav', format="wav")

