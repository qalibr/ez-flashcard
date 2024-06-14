import { Deck, DeckBox } from "@/app/ez-components/types";

function createDeckBox(): DeckBox {
  let decks: Deck[] = [];

  return {
    get decks(): Deck[] {
      return [...decks];
    },
    addDeck(deck: Deck): void {
      decks.push(deck);
    },
    removeDeck(deck: Deck): void {
      decks = decks.filter(d => d !== deck);
    },
  };
}

export default createDeckBox;
