const form = document.getElementById("search-form");
const command = document.getElementsByName("command")[0]
const result = document.getElementById("result");

form.addEventListener("submit", getGPTResponse);
function getGPTResponse(event){
    event.preventDefault()
    console.log(command.value)

    const url = "http://127.0.0.1:5000/gpt";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: command.value,
    }
    fetch(url, options).then(response => {
        return response.text();
    }).then(function (response){
        console.log(response)
        result.innerHTML = response;
        text_to_speech(response);
    })
}

// text_to_speech("You are so very");

function text_to_speech(response){
    // Microsoft David - English (United States) (en-US) — DEFAULT
    const synth = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(response);

    let voices = [];
    let s = setVoices(synth);
    s.then((vcs) => {
        voices = vcs;
        // Microsoft David - English (United States)
        var i = 0;
        for(; i<voices.length; i++){
            if(voices[i].name === "Microsoft Ryan Online (Natural) - English (United Kingdom)") {
                break;
            }
        }
        speech.voice = voices[i];

        speech.pitch = 120;
        speech.rate = 1;
        synth.speak(speech);
    }); 
}

function setVoices(synth){
    return new Promise(
        function (resolve, reject) {

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);

        }
    )
}