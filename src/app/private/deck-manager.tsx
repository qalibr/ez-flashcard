'use client'

import React, { useState } from "react";

import createDeckBox from "@/app/ez-components/box";
import createDeck from "@/app/ez-components/deck";
import createFlashcard from "@/app/ez-components/flashcard";
import { DeckBox, Deck, Flashcard } from "@/app/ez-components/types";

export default function DeckManager() {
  const [boxes, setBoxes] = useState<DeckBox[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [selectedDeckIndex, setSelectedDeckIndex] = useState<number | null>(null);
  const [deckName, setDeckName] = useState('');
  const [flashcardQuestion, setFlashcardQuestion] = useState('');
  const [flashcardAnswer, setFlashcardAnswer] = useState('');

  const addBox = () => {
    const newBox = createDeckBox();
    setBoxes([...boxes, newBox]);
  };

  // Testing

  const addDeckToBox = () => {
    if (selectedBoxIndex !== null) {
      const newDeck = createDeck();
      boxes[selectedBoxIndex].addDeck(newDeck);
      setBoxes([...boxes]);
      setDeckName('');
    }
  };

  const addFlashcardToDeck = () => {
    if (selectedBoxIndex !== null && selectedDeckIndex !== null) {
      const newCard = createFlashcard(flashcardQuestion, flashcardAnswer);
      boxes[selectedBoxIndex].decks[selectedDeckIndex].addCard(newCard);
      setBoxes([...boxes]);
      setFlashcardQuestion('');
      setFlashcardAnswer('');
    }
  };

  return (
      <div>
        <h1 className="text-sky-400/100">Deck Manager</h1>

        {selectedBoxIndex === null ? (
            <>
              <h2 className="text-sky-200/100">Create a New Box</h2>
              <button onClick={addBox} className="m-2 outline outline-emerald-700">
                Add Box
              </button>

              <h2>Boxes</h2>
              <ul>
                {boxes.map((box, boxIndex) => (
                    <li key={boxIndex}>
                      <button onClick={() => setSelectedBoxIndex(boxIndex)} className="m-2 outline outline-emerald-700">
                        Select Box {boxIndex + 1}
                      </button>
                    </li>
                ))}
              </ul>
            </>
        ) : selectedDeckIndex === null ? (
            <>
              <h2>Create a New Deck</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                addDeckToBox();
              }}>
                <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Deck Name"
                    required
                />
                <button type="submit">Add Deck</button>
              </form>

              <h2>Decks in Box {selectedBoxIndex + 1}</h2>
              <ul>
                {boxes[selectedBoxIndex]?.decks.map((deck, deckIndex) => (
                    <li key={deckIndex}>
                      <button onClick={() => setSelectedDeckIndex(deckIndex)}
                              className="m-2 outline outline-emerald-700">
                        Select Deck {deckIndex + 1}
                      </button>
                    </li>
                ))}
              </ul>
              <button onClick={() => setSelectedBoxIndex(null)} className="m-2 outline outline-emerald-700">
                Back to Box Overview
              </button>
            </>
        ) : (
            <>
              <h2>Add Flashcard to Deck {selectedDeckIndex + 1} in Box {selectedBoxIndex + 1}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                addFlashcardToDeck();
              }}>
                <input
                    type="text"
                    value={flashcardQuestion}
                    onChange={(e) => setFlashcardQuestion(e.target.value)}
                    placeholder="Flashcard Question"
                    required
                />
                <input
                    type="text"
                    value={flashcardAnswer}
                    onChange={(e) => setFlashcardAnswer(e.target.value)}
                    placeholder="Flashcard Answer"
                    required
                />
                <button type="submit">Add Flashcard</button>
              </form>
              <div>
                <ul>
                  <li>
                    <button onClick={() => setSelectedDeckIndex(null)} className="m-2 outline outline-emerald-700">
                      Back to Deck Overview
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setSelectedBoxIndex(null)} className="m-2 outline outline-emerald-700">
                      Back to Box Overview
                    </button>
                  </li>
                </ul>
              </div>
              <h2>Flashcards in Deck {selectedDeckIndex + 1}</h2>
              <ul>
                {boxes[selectedBoxIndex]?.decks[selectedDeckIndex]?.cards.map((card, cardIndex) => (
                    <li key={cardIndex}>
                      Q: {card.question}, A: {card.answer}, Score: {card.score}
                    </li>
                ))}
              </ul>
            </>
        )}
      </div>
  );
}