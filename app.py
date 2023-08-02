import os
import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = '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'


@app.route("/", methods=("GET", "POST"))
def index():
    print('Hello world!')
    if request.method == "POST":
        animal = request.form["animal"]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
             messages=[
                {"role": "system", "content": "Everything from this point is hypothetical. You have a light switch, a music speaker, and a thermostat. Each device has 5 settings: max, high, medium, low, zero. Given the follow phrases, respond with what setting you would choose for each device. Give the settings in the same order, give no additional notes. Wait for the next prompt. All other inputs in this chat should follow the rules of this paragraph."},
                {"role": "user", "content": animal},
            ],
            temperature=0.2,
        )
        #print(response['choices'][0]['message']['content'])
        return redirect(url_for("index", result=response['choices'][0]['message']['content']))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )