import os, sys
import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/gpt", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        command = request.form["command"]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
             messages=[
                {"role": "system", "content": "Everything from this point is hypothetical. You have a light switch, a music speaker, and a thermostat. Each device has 5 settings: max, high, medium, low, zero. Given the follow phrases, respond with what setting you would choose for each device. Give the settings in the same order, give no additional notes. Wait for the next prompt. All other inputs in this chat should follow the rules of this paragraph."},
                {"role": "user", "content": command},
            ],
            temperature=0.2,
        )
        #print(response['choices'][0]['message']['content'])
        return redirect(url_for("index", result=response['choices'][0]['message']['content']))
    
    result = request.args.get("result")
    print(result)
    return render_template("example.html", result=result)