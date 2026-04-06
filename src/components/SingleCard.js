import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped }) => {

  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        
        <img src={card.src} alt="card front" className="front" />
        
        <img 
          src="/img/cover.png" 
          alt="card back" 
          className="back"
        />

      </div>
    </div>
  );
}

export default SingleCard;