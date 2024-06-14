'use client'

import React, { useState } from "react";

import createDeckBox from "@/app/ez-components/box";
import createDeck from "@/app/ez-components/deck";
import createFlashcard from "@/app/ez-components/flashcard";
import { DeckBox, Deck, Flashcard } from "@/app/ez-components/types";

export default function DeckManager() {
  const [deckBox, setDeckBox] = useState(createDeckBox);

  const addDeckToBox = () => {
    const newDeck = createDeck();
    deckBox.addDeck(newDeck);
    setDeckBox({...deckBox});
  };

  const addFlashcardToDeck = (deck: Deck) => {
    const newCard = createFlashcard('Sample Question', 'Sample Answer');
    deck.addCard(newCard);
    setDeckBox({...deckBox});
  };

  return (
      <div>
        <h1>Deck Manager</h1>
        <button onClick={addDeckToBox}>Add Deck</button>
        {deckBox.decks.map((deck, deckIndex) => (
            <div key={deckIndex}>
              <h2>Deck {deckIndex + 1}</h2>
              <button onClick={() => addFlashcardToDeck(deck)}>Add Flashcard</button>
              <ul>
                {deck.cards.map((card, cardIndex) => (
                    <li key={cardIndex}>
                      Q: {card.question}, A: {card.answer}, Score: {card.score}
                    </li>
                ))}
              </ul>
            </div>
        ))}
      </div>
  );
}