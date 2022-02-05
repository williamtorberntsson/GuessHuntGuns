import './App.css';
import { useState } from 'react'
import Guns from ".//Guns"

function App() {
  const path = "https://raw.githubusercontent.com/williamtorberntsson/GuessHuntGuns/master/public/assets/"
  const pistolsounds = [path + "pistols/BornheimNo3.mp3", path + "pistols/CaldwellConversionPistol.mp3", path + "pistols/LeMatMarkII.mp3", path + "pistols/NagantM1895.mp3", path + "pistols/CaldwellPax.mp3", path + "pistols/ScottfieldModel3.mp3"]
  const riflesounds = [path + "rifles/BerthierMle1892.mp3", path + "rifles/Lebel1886.mp3", path + "rifles/MartiniHenryIC1.mp3", path + "rifles/Mosin-NagantM1891.mp3", path + "rifles/Mosin-NagantM1891Avtomat.mp3", path + "rifles/SparksLRR.mp3", path + "rifles/Springfield1866.mp3", path + "rifles/Vetterli71Karabiner.mp3", path + "rifles/WinfieldM1873.mp3"]
  const shotgunsounds = [path + "shotguns/CaldwellRival78.mp3", path + "shotguns/Crown&KingAuto-5.mp3", path + "shotguns/Romero77.mp3", path + "shotguns/Specter1882.mp3", path + "shotguns/Winfield1887Terminus.mp3"]
  const specialsounds = [path + "specials/BombLance.mp3", path + "specials/Crossbow.mp3", path + "specials/HandCrossbow.mp3", path + "specials/HuntingBow.mp3", path + "specials/NitroExpressRifle.mp3"]

  const allgunsounds = { "pistols": pistolsounds, "rifles": riflesounds, "shotguns": shotgunsounds, "specials": specialsounds }

  const [results, setResults] = useState("You haven't guessed yet!")
  const [selectedGuns, setSelectedGuns] = useState("")
  const [currentgun, setCurrentgun] = useState("")

  const handleChangeCheckbox = (evt) => {
    const checked = evt.target.checked;
    setSelectedGuns({
      ...selectedGuns, [evt.target.name]: checked
    });
  }

  function playSound() {
    const gunscategoriesinguess = []
    if (selectedGuns.pistols) gunscategoriesinguess.push("pistols")
    if (selectedGuns.rifles) gunscategoriesinguess.push("rifles")
    if (selectedGuns.shotguns) gunscategoriesinguess.push("shotguns")
    if (selectedGuns.specials) gunscategoriesinguess.push("specials")

    if (gunscategoriesinguess.length == 0) {
      setResults("You need to select a category!")
      return 0
    } else {
      const randomcategory = gunscategoriesinguess[getRandomInt(gunscategoriesinguess.length)]

      const randomgunsoundfromcategory = allgunsounds[randomcategory][getRandomInt(allgunsounds[randomcategory].length)]
      const currentgun = randomgunsoundfromcategory.split(path).pop().split("/").pop().split(".")[0]

      setCurrentgun(currentgun)

      let audio = new Audio(randomgunsoundfromcategory)
      audio.play()
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  }

  const checkguess = (guess) => {
    if (guess == currentgun) {
      setResults(`You guesed right! It was ${currentgun}`)
    }
    else {
      setResults(`You guessed wrong! Right answer was ${currentgun}!`)
    }
  }


  return (
    <div className="App">
      <div className="main-container">
        <div className="categories">
          <div className="selectcategories">
            <p>Select gun categories to guess from:</p>
            <span>Pistols<input type="checkbox" name="pistols" checked={selectedGuns.pistols} value={selectedGuns.pistols} onChange={handleChangeCheckbox} /></span>
            <span>Rifles<input type="checkbox" name="rifles" checked={selectedGuns.rifles} value={selectedGuns.rifles} onChange={handleChangeCheckbox} /></span>
            <span>Shotguns<input type="checkbox" name="shotguns" checked={selectedGuns.shotguns} value={selectedGuns.shotguns} onChange={handleChangeCheckbox} /></span>
            <span>Specials<input type="checkbox" name="specials" checked={selectedGuns.specials} value={selectedGuns.specials} onChange={handleChangeCheckbox} /></span>
          </div>
          <div className="guessguns">
            <div className="playsound">
              <p>Random gun sound</p>
              <button onClick={() => playSound()}>Play sound</button>
            </div>
            <div className="selectgun">
              <p>Guess gun</p>
              <Guns enable={selectedGuns.pistols} func={checkguess} gunslistsounds={pistolsounds}></Guns>
              <Guns enable={selectedGuns.rifles} func={checkguess} gunslistsounds={riflesounds}></Guns>
              <Guns enable={selectedGuns.shotguns} func={checkguess} gunslistsounds={shotgunsounds}></Guns>
              <Guns enable={selectedGuns.specials} func={checkguess} gunslistsounds={specialsounds}></Guns>
            </div>
          </div>
        </div>
      </div>
      <p>{results}</p>
    </div>
  );
}

export default App;
