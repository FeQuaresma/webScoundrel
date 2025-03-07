import { useState } from "react";
import "./App.css";
import Card from "./components/card";
import { deck } from "./constants/deck";

function App() {
  function shuffleArray() {
    const matriz = [...deck];
    for (let i = matriz.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matriz[i], matriz[j]] = [matriz[j], matriz[i]];
    }
    return matriz;
  }

  const [runningDeck, setRunningDeck] = useState<string[]>(shuffleArray());
  const [cardsInPlay, setCardsInPlay] = useState<string[]>([]);

  function drawHand() {
    const deckTemp = runningDeck;
    const cardsTemp = [];
    for (let i = 0; i < 4; i++) {
      const firstCard = deckTemp.shift();
      if (firstCard) {
        console.log(firstCard);
        cardsTemp?.push(firstCard);
      }
    }
    setCardsInPlay(cardsTemp);
    setRunningDeck(deckTemp);
  }

  function resetGame() {
    setRunningDeck(shuffleArray());
    setCardsInPlay([]);
  }

  function playCard(cardName: string) {
    const tempCards = cardsInPlay;
    tempCards.splice(tempCards.indexOf(cardName), 1);
    console.log(tempCards)
    setCardsInPlay(tempCards);
  }

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <button onClick={drawHand}>Start</button>
      <button onClick={() => resetGame()}>Restart</button>
      <div>
        <span>HP: 20</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Card CName={"Deck: " + runningDeck.length} />
        <Card
          CName={cardsInPlay[0] ? cardsInPlay[0] : ""}
          onClick={() => playCard(cardsInPlay[0])}
        />
        <Card CName={cardsInPlay[1] ? cardsInPlay[1] : ""} />
        <Card CName={cardsInPlay[2] ? cardsInPlay[2] : ""} />
        <Card CName={cardsInPlay[3] ? cardsInPlay[3] : ""} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Card CName="Weapon" />
        <Card CName="Last Monster" />
        <Card CName="Pile" />
      </div>
    </div>
  );
}

export default App;
