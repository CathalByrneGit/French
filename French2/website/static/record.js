let mediaRecorder;
let chunks = [];

function startRecording() {

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
                chunks.push(event.data);
            };
            showRecordingStatus(true);

            mediaRecorder.onstop = function () {
                const audioBlob = new Blob(chunks, { type: 'audio/wav' });


                // Display the audio player and set the recorded audio as its source
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = URL.createObjectURL(audioBlob);
                audioPlayer.style.display = 'block';

                // Display the "Remove Audio" button
                const removeBtn = document.getElementById('removeBtn');
                removeBtn.style.display = 'inline';

                const transBtn = document.getElementById('transBtn');
                transBtn.style.display = 'inline';



                // Send the audio file to the server using the 'multipart/form-data' content type

            };


            mediaRecorder.start();
        })
        .catch(function (error) {
            console.log('Error accessing microphone:', error);
        });
}
//function startRecording() {
//    navigator.mediaDevices.getUserMedia({ audio: true })
//        .then(function (stream) {
//            mediaRecorder = new MediaRecorder(stream);
//
//            mediaRecorder.ondataavailable = function (event) {
//                chunks.push(event.data);
//            };
//
//            mediaRecorder.onstop = function () {
//                const audioBlob = new Blob(chunks, { type: 'audio/wav' });
//                const audioUrl = URL.createObjectURL(audioBlob);
//
//                // Pass the audio URL to the server and receive API response
//                fetch('/process_audio', {
//                    method: 'POST',
//                    body: JSON.stringify({ audio_url: audioUrl }),
//                    headers: {
//                        'Content-Type': 'application/json'
//                    }
//                }).then(response => response.json())
//                    .then(data => {
//                        document.getElementById('output1').value = data.result1;
//                        document.getElementById('output2').value = data.result2;
//
//                        // Set the audio source to the received audio URL
//                        const audioPlayer = document.getElementById('audioOutput');
//                        audioPlayer.src = data.audio_url;
//                    });
//            };
//
//            mediaRecorder.start();
//        })
//        .catch(function (error) {
//            console.log('Error accessing microphone:', error);
//        });
//}
function resetAudio() {
    chunks = [];
    audioBlob = null;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.style.display = 'none';
    audioPlayer.src = '';

    const removeBtn = document.getElementById('removeBtn');
    removeBtn.style.display = 'none';

    const transBtn = document.getElementById('transBtn');
    transBtn.style.display = 'none';



}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        showRecordingStatus(false);
    }
}


function showRecordingStatus(isRecording) {
    const recordingStatus = document.getElementById('recordingStatus');
    if (isRecording) {
        recordingStatus.style.display = 'block';
    } else {
        recordingStatus.style.display = 'none';
    }
}

function transAudio() {
const spinner = document.getElementById('spinner');
spinner.style.display = '';

const audioBlob = new Blob(chunks, { type: 'audio/wav' });
const formData = new FormData();
formData.append('audio_file', audioBlob);
fetch('/process_audio', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('output1').value = data.result1;
                    document.getElementById('output2').value = data.result2;
                    spinner.style.display = 'none';
                    playAudioStream();
                    const clearBtn = document.getElementById('clearBtn');
                    clearBtn.style.display = 'inline';
                });



}

function clearText(){
document.getElementById('output1').value = '';
document.getElementById('output2').value = '';
const clearBtn = document.getElementById('clearBtn');
clearBtn.style.display = 'none';
}

function playAudioStream() {
    const audioPlayer1 = document.getElementById('audioOutput');
    audioPlayer1.src = '/get_audio';
    audioPlayer1.style.display = 'block';
    audioPlayer1.play();
}