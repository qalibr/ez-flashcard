import { Flashcard } from "@/app/ez-components/types";

function createFlashcard(question: string, answer: string): Flashcard {
  let score = 0;

  return {
    question,
    answer,
    get score(): number {
      return score;
    },
    updateScore(newScore: number): void {
      score = newScore;
    },
  };
}

export default createFlashcard;