import './App.css'
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

// card data
const cardImages = [
  { src: process.env.PUBLIC_URL + "/img/apple.png", matched: false},
  { src: process.env.PUBLIC_URL + "/img/pear.png", matched: false},
  { src: process.env.PUBLIC_URL + "/img/banana.png", matched: false},
  { src: process.env.PUBLIC_URL + "/img/grapes.png", matched: false},
  { src: process.env.PUBLIC_URL + "/img/watermelon.png", matched: false},
  { src: process.env.PUBLIC_URL + "/img/orange.png", matched: false}
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  // check if all cards are matched
  const gameOver = cards.length > 0 && cards.every(card => card.matched);

  // shuffle and reset game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // start game after name validation
  const startGame = (e) => {
    e.preventDefault(); //prevents page from refreshing 

    if (!playerName.trim()) {
      alert("⚠️ Please enter your name");
      return;
    }

    setIsGameStarted(true);
    shuffleCards();
  }

  // handle card selection
  const handleChoice = (card) => {
    if (disabled) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo)
    {
      setDisabled(true);

      if(choiceOne.src === choiceTwo.src)
      {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src)
            {
              return {...card, matched: true}
            }
            else
            {
              return card;
            }
          })
        });
        resetTurn();
      } 
      else 
      {
        setTimeout(() => resetTurn(), 650);
      }
    }
  },[choiceOne, choiceTwo]);

  // resets choices, increment turns & un-disables cards
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start screen
  if (!isGameStarted) {
    return (
      <div className="App">
        <h1>Fruit Flip Frenzy</h1>

        <form onSubmit={startGame}>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
          />
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }

  // game screen if game has started (else condition)
  //either shows start screen or game screen, never both at the same time
  return (
    <div className="App">
      <h1>Fruit Flip Frenzy</h1>
      <h2>Welcome, {playerName}!</h2>

      <button 
        className="about-button"
        onClick={() => 
          alert("Flip two cards at a time. Match all pairs to win!")}>
        About
      </button>

      <button onClick={() => setIsGameStarted(false)}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} //bool
            disabled={disabled} //bool
          />
        ))}
      </div>

      {gameOver && <h2>🎉 Game Over! Congratulations! 🎉</h2>}   
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;