// import { runExercice } from '../../util.ts';
import { input } from './input.ts';

export const HAND_RANK = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_OF_A_KIND: 5,
  FIVE_OF_A_KIND: 6,
}

const CARD_VALUE: Record<string, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
};

export const getHandData = (hand: string) => {
  let [cards, bidAsString] = hand.split(' ');
  const bid = Number(bidAsString);
  const cardsOccurence: Map<string, number> = new Map();

  for (const card of cards) {
    if (!cardsOccurence.has(card)) {
      cardsOccurence.set(card, 0);
    }
    cardsOccurence.set(card, (cardsOccurence.get(card)!) + 1);
  }

  const handStructure = Array.from(cardsOccurence.values()).sort().join('');

  if (handStructure.length === 5) {

    return { rank: HAND_RANK.HIGH_CARD, cards, bid  }

  } else if (handStructure.length === 4) {

    return { rank: HAND_RANK.ONE_PAIR, cards, bid};

  } else if (handStructure.length === 3) {

    if (handStructure === '122') {
      return { rank: HAND_RANK.TWO_PAIR, cards, bid};
    }
    return { rank: HAND_RANK.THREE_OF_A_KIND, cards, bid};

  } else if (handStructure.length === 2) {

    if (handStructure === '23') {
      return { rank: HAND_RANK.FULL_HOUSE, cards, bid};
    }
    return { rank: HAND_RANK.FOUR_OF_A_KIND, cards, bid};

  }

  return { rank: HAND_RANK.FIVE_OF_A_KIND, cards, bid};
}

export const sortHands = (hands: { bid: number, cards: string, rank: number}[]) => {
    return hands.sort((a, b) => {

      if (a.rank !== b.rank) {
        return a.rank - b.rank;
      }

      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] !== b.cards[i]) {
          return CARD_VALUE[a.cards[i]] - CARD_VALUE[b.cards[i]]
        }
      }

      return 0;
    })
}

export const step01 = (input: string) => {
  const hands = [];
  const handsData = input.split('\n');

  for (let handData of handsData) {
    hands.push(getHandData(handData));
  }

  const sortedHands = sortHands(hands);

  let sum = 0;

  for (let i = 1; i <= sortedHands.length;i++) {
    const actualHand = sortedHands[i - 1];
    sum += (i * actualHand.bid);
    console.log(actualHand);
  }

  return sum;
}

console.log(step01(input));