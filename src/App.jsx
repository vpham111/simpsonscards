import { useState } from "react";
import { images } from "./images";
import { names } from "./names";
import "./App.css";

function App() {
  const [flipped, setFlipped] = useState(false);
  const [currIndex, setIndex] = useState(0);
  const [availableIndices, setAvailableIndices] = useState([
    ...Array(images.length).keys(),
  ]);
  const [history, setHistory] = useState([]);
  const [guess, setGuess] = useState("");
  const [correctGuess, setCorrect] = useState(null);

  function nextCard(e) {
    e.stopPropagation();
    const randomIndex = getRandomIndex();
    if (randomIndex !== null) {
      setHistory([...history, currIndex]);
      setIndex(randomIndex);
      setGuess("");
      setCorrect(null);
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

    const newAvailableIndices = availableIndices.filter(
      (index) => index !== chosenIndex
    );
    setAvailableIndices(newAvailableIndices);

    return chosenIndex;
  }

  function resetCards() {
    setAvailableIndices([...Array(images.length).keys()]);
    setHistory([]);
  }

  function prevCard(e) {
    e.stopPropagation();
    if (history.length > 0) {
      const lastIndex = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setIndex(lastIndex);
      setGuess("");
      setCorrect(null);
    } else {
      alert("No previous cards to show!");
    }
  }

  function checkGuess(name) {
    if (guess.toLowerCase() === name.toLowerCase()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }

  function handleFlip() {
    setFlipped(!flipped);
  }

  function shuffleCards(e) {
    e.stopPropagation();
    const shuffledIndices = [...Array(images.length).keys()];
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[randomIndex]] = [
        shuffledIndices[randomIndex],
        shuffledIndices[i],
      ];
    }
    setAvailableIndices(shuffledIndices);
    setHistory([]);
    setIndex(shuffledIndices[0]);
    setGuess("");
    setCorrect(null);
    setFlipped(false); 
  }

  return (
    <>
      <div className="container">
        <h2>Guess the Simpsons character!</h2>
        <h3>
          Are you a fan of the Simpsons? You can test how much you know right
          here! <br /> You will be given a photo of the character and your job
          is to guess who that character is!
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
          <div className="guess-section" onClick={(e) => e.stopPropagation()}>
            <h2>Guess the answer here:</h2>
            <input 
              type="text" 
              value={guess} 
              onChange={(e) => setGuess(e.target.value)} 
            />
            <button onClick={() => checkGuess(names[currIndex])}>Submit Guess</button>
          </div>
          {correctGuess === true && <p style={{ color: "green" }}>Correct!</p>}
          {correctGuess === false && (
            <p style={{ color: "red" }}>Wrong guess!</p>
          )}

          <div>
            <button onClick={prevCard} disabled={history.length === 0}>
              Back
            </button>
            <button onClick={nextCard}>Next</button>
            <button onClick={shuffleCards}>Shuffle Cards</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
