export type DeckBox = {
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  removeDeck: (deck: Deck) => void;
};

export type Deck = {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
  removeCard: (card: Flashcard) => void;
};

export type Flashcard = {
  question: string;
  answer: string;
  score: number;
  updateScore: (newScore: number) => void;
};