import { Flashcard, Deck } from "@/app/ez-components/types";

function createDeck(): Deck {
  let cards: Flashcard[] = [];

  return {
    get cards(): Flashcard[] {
      return [...cards];
    },
    addCard(card: Flashcard): void {
      cards.push(card);
    },
    removeCard(card: Flashcard): void {
      cards = cards.filter(c => c !== card);
    },
  };
}

export default createDeck;
