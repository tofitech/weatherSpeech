"use strict";

const btnLocate = document.querySelector("#btnLocate");
const content = document.querySelector("#content");

class Weather {
  constructor(city) {
    this.city = city;
  }

  getCity() {
    const apiKey = "9a6be976c81afac3eb00f6ab4a9e26c4";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        content.innerHTML = json.main.temp;
        console.log(json);
        const results = `The city of ${json.name} is having a temperature of ${json.main.temp} with a minimum temperature of ${json.main.temp_min} and a maximum temperature of ${json.main.temp_max}. Also an enjoyable wind speed of ${json.wind.speed}. that's great!`;
        readOutLoud(results);
        content.textContent = results;
      });
  }
} // end of main class block

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

// trigger to start speech api
recognition.onstart = function () {
  console.log("Voice is activated, you can speak to microphone");
};

// start the event
btnLocate.addEventListener("click", () => {
  recognition.start();
});

// output for speechApi
recognition.onresult = function (event) {
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;

  const city1 = new Weather(transcript);
  city1.getCity();
};

// speech synthesis
function readOutLoud(message) {
  // access the speech synthesis
  const speech = new SpeechSynthesisUtterance();

  //speech.text = 'Sorry words are not yet registered into my system!';

  speech.text = message;

  //speech.text = message;
  speech.volume = 1.5;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
