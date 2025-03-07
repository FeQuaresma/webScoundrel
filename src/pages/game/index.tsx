import { useState } from "react";
import "../../App.css";
import Card from "../../components/card";
import { deck, deckObj } from "../../constants/deck";

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
  const [weapon, setWeapon] = useState<string>("");
  const [monster, setMonster] = useState<string>("");
  const [pile, setPile] = useState<string>("");
  const [healthPoints, setHealthPoints] = useState<number>(20);

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
    setWeapon("");
    setMonster("");
    setPile("");
    setHealthPoints(20);
  }

  function playCard(cardName: string) {
    const tempCards = [...cardsInPlay];
    const playedCard = deckObj[cardName] ? deckObj[cardName] : undefined;
    const weaponEquiped = deckObj[weapon] ? deckObj[weapon][0] : 0;
    tempCards.splice(tempCards.indexOf(cardName), 1);
    console.log(playedCard);
    if (playedCard) {
      let tempHp = healthPoints + playedCard[0];
      const damegeDealt = playedCard[0] - weaponEquiped;
      switch (playedCard[1]) {
        case "O":
          setWeapon(cardName);
          break;
        case "C":
          if (tempHp > 20) {
            tempHp = 20;
          }
          setHealthPoints(tempHp);
          break;
        default:
          if (damegeDealt > 0) {
            setHealthPoints(healthPoints - damegeDealt);
          }
          setMonster(cardName);
          break;
      }
    }
    setPile(cardName);
    setCardsInPlay(tempCards);
  }

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <button onClick={drawHand}>Draw</button>
      <button onClick={() => resetGame()}>Restart</button>
      <div>
        <span>HP: {healthPoints}</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Card CName={"Deck: " + runningDeck.length} />
        <Card
          CName={cardsInPlay[0] ? cardsInPlay[0] : ""}
          onClick={() => playCard(cardsInPlay[0])}
        />
        <Card
          CName={cardsInPlay[1] ? cardsInPlay[1] : ""}
          onClick={() => playCard(cardsInPlay[1])}
        />
        <Card
          CName={cardsInPlay[2] ? cardsInPlay[2] : ""}
          onClick={() => playCard(cardsInPlay[2])}
        />
        <Card
          CName={cardsInPlay[3] ? cardsInPlay[3] : ""}
          onClick={() => playCard(cardsInPlay[3])}
        />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Card CName={weapon !== "" ? weapon : "Weapon"} />
        <Card CName={monster !== "" ? monster : "Last Monster"} />
        <Card CName={pile !== "" ? pile : "Pile"} />
      </div>
    </div>
  );
}

export default App;
