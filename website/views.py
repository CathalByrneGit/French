from flask import Blueprint,render_template,request,flash,send_file,jsonify
# import jsonify
import os
from gttsapp import Translator2
from gradio_client import Client
views = Blueprint('views',__name__)




@views.route('/')
def index():
    return render_template('index.html')

@views.route('/process_audio', methods=['POST'])
def process_audio():
    audio_file = request.files['audio_file']
    audio_file.save('website/static/audio/temp_audio.wav')
    client = Client("https://cathaltwo-speechtotext.hf.space/")
    result = client.predict(
        "website/static/audio/temp_audio.wav",
        # str (filepath or URL to file) in 'audio' Audio component
        api_name="/predict"
    )



    # Make API call here using the 'audio_url' and obtain 'result1', 'result2', and 'audio_response'
    # Replace the following lines with your actual API call and audio processing
    result1 = result[0]
    result2 = result[1]

    s=Translator2('fr','fr',False)
    s.predict(result2)
    s.save('website/static/audio/temp_res.mp3')
    s.to_wav()

    # result1 = "Text response 1"
    # result2 = "Text response 2"

    # Dummy audio_response for demonstration (replace this with your actual audio file)
    # audio_response = os.path.join(app.root_path, 'static', 'audio', 'dummy_audio.mp3')
    return jsonify({'result1': result1, 'result2': result2})

@views.route('/audio/<path:filename>', methods=['GET'])
def serve_audio(filename):
    audio_path = os.path.join(app.root_path, 'static', 'audio', filename)
    return send_file(audio_path, as_attachment=True)

@views.route('/get_audio', methods=['GET'])
def get_audio():
    # Specify the path to the audio file on the server
    audio_file_path = 'static/audio/temp_res.wav'

    # Send the audio file to the client
    return send_file(audio_file_path,mimetype='audio/wav', as_attachment=False)

