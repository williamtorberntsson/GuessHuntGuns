import './App.css';
import { useState } from 'react'

function App() {
  const path = "https://raw.githubusercontent.com/williamtorberntsson/GuessHuntGuns/master/assets/"
  const soundfiles = [path + "bornheim.mp3", path + "conversion.mp3", path + "lemat.mp3", path + "nagant.mp3", path + "pax.mp3", path + "scottfield.mp3"]
  var gunguess = ""
  var currentgun = ""

  const [correctgun, setCorrectgun] = useState("no sound played")
  const [result, setResult] = useState(false)

  /*
  function playSound() {
    const randomsound = soundfiles[getRandomInt(soundfiles.length)]
    currentgun = randomsound//.split("/sound/").pop().split(".")[0]
    console.log(currentgun)
    let audio = new Audio(randomsound)
    audio.play()

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  }
  */
  
  function playSound() {
    const randomsound = soundfiles[getRandomInt(soundfiles.length)]
    currentgun = randomsound.split(path).pop().split(".")[0]
    console.log(randomsound)
    console.log(currentgun)
    
    let audio = new Audio(randomsound)
    audio.play()

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  }

  function checkGuess(correct, guess) {
    console.log("rätt: " + correct + " gissning: " + guess)
    if (correct === guess) {
      setResult(true)
    }
    else setResult(false)
    setCorrectgun(currentgun)
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="playsound">
          <p>Guess</p>
          <button onClick={() => playSound()}>Spela ljud</button>
        </div>
        <div className="selectgun">
          <p>Select gun</p>
          <ul>
            <li><button onClick={() => { gunguess = "conversion"; checkGuess(currentgun, gunguess) }}>Cadwell conversion</button></li>
            <li><button onClick={() => { gunguess = "bornheim"; checkGuess(currentgun, gunguess) }}>Bornheim</button></li>
            <li><button onClick={() => { gunguess = "lemat"; checkGuess(currentgun, gunguess) }}>LeMat</button></li>
            <li><button onClick={() => { gunguess = "nagant"; checkGuess(currentgun, gunguess) }}>Nagant</button></li>
            <li><button onClick={() => { gunguess = "pax"; checkGuess(currentgun, gunguess) }}>Pax</button></li>
            <li><button onClick={() => { gunguess = "scottfield"; checkGuess(currentgun, gunguess) }}>Scottfield</button></li>
          </ul>
        </div>
      </div>
      <p>You guessed {result ? `right, ${correctgun}!` : `wrong! Right answer: ${correctgun}!`}</p>
    </div>
  );
}

export default App;
