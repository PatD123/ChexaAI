const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector("input");
const voiceRecogBtn = document.querySelector("button");

// Mozilla Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Voice Recognition Button OnClick
voiceRecogBtn.addEventListener("click", voiceRecogBtnClick);
function voiceRecogBtnClick(){
    var btn = document.getElementById("VoiceRecogBtn").children[0];
    if(btn.innerHTML === "Record command!"){
        recognition.start();
    }
    else {
        recognition.stop();
    }
}

recognition.addEventListener("start", function startVoiceRecog() {
    var btn = document.getElementById("VoiceRecogBtn").children[0];
    btn.innerHTML = "Recording . . . ";
    searchFormInput.focus();
    console.log("Recording now . . .");
})

recognition.addEventListener("end", function endVoiceRecog() {
    var btn = document.getElementById("VoiceRecogBtn").children[0];
    btn.innerHTML = "Record command!"
    searchFormInput.focus();
    console.log("Stopped recording . . .");
})

recognition.addEventListener("result", transcriptize);
function transcriptize(event){
    var command = event.results[0][0].transcript;
    console.log(command);
    searchFormInput.value = command;
    searchForm.submit();

}