  import './App.css'
  import { useState, useEffect } from 'react';
  import SingleCard from './components/SingleCard';

  /*const cardImages = [
    { "src": "/img/apple.png", matched: false},
    { "src": "/img/pear.png", matched: false},
    { "src": "/img/banana.png", matched: false},
    { "src": "/img/grapes.png", matched: false},
    { "src": "/img/watermelon.png", matched: false},
    { "src": "/img/orange.png", matched: false}
  ];*/

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

    const gameOver = cards.length > 0 && cards.every(card => card.matched);

    const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random()}));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    }

    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    useEffect(() => {
      if(choiceOne && choiceTwo)
      {
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

    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1);
    }

    return (
      <div className="App">
        <h1>Fruit Flip Frenzy</h1>
        <button 
          className="about-button"
          onClick={() => 
            alert("Flip two cards at a time. Match all pairs to win!")}>
          About
        </button>
        <button onClick={shuffleCards}>New Game</button>
        
        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched} //true or false
            />
          ))}
        </div>
        {gameOver && <h2>🎉 Game Over! Congratulations! 🎉</h2>}
        <p>Turns: {turns}</p>
      </div>
    );
  }

  export default App;