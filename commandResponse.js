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
        result.innerHTML = "Response: " + response;
    })
}