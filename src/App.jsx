import { useState } from "react";
import { images } from "./images";
import { names } from "./names";
import "./App.css";

function App() {
  const [flipped, setFlipped] = useState(false);
  const [currIndex, setIndex] = useState(0);
  const [availableIndices, setAvailableIndices] = useState([...Array(images.length).keys()]);

  function nextCard(e) {
    e.stopPropagation();
    const randomIndex = getRandomIndex();
    if (randomIndex !== null) {
      setIndex(randomIndex);
    } else {
      alert("All cards have been shown!");
      resetCards(); 
    }
  }

  function getRandomIndex() {
    if (availableIndices.length === 0) {
      return null; 
    }

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const chosenIndex = availableIndices[randomIndex];

    const newAvailableIndices = availableIndices.filter((index) => index !== chosenIndex);
    setAvailableIndices(newAvailableIndices);

    return chosenIndex;
  }

  function resetCards() {
    setAvailableIndices([...Array(images.length).keys()]);
  }

  function prevCard(e) {
    e.stopPropagation();
    const randomIndex = getRandomIndex();
    if (randomIndex !== null) {
      setIndex(randomIndex);
    }
  }

  function handleFlip() {
    setFlipped(!flipped);
  }

  return (
    <>
      <div className="container">
        <h2>Guess the Simpsons character!</h2>
        <h3>
          Are you a fan of the Simpsons? You can test how much you know right
          here!
        </h3>
        <p>Number of cards: {names.length}</p>

        <div className="flip-card" onClick={handleFlip}>
          {flipped ? (
            <div className="flip-card-back">
              <h1>{names[currIndex]}</h1>
            </div>
          ) : (
            <div className="flip-card-front">
              <img src={images[currIndex]} alt="Avatar" />
            </div>
          )}

          <div>
            <button onClick={prevCard}>Back</button>
            <button onClick={nextCard}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
