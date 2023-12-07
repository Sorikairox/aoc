import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { HAND_RANK, getHandData, sortHands, step01 } from "./step01.ts";

Deno.test("Card recognition", async (ctx) => {

    await ctx.step('Recognize high card', async () => {
        const hand = `32TQK 765`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.HIGH_CARD, cards: '32TQK', bid: 765 });
    })

    await ctx.step('Recognize one pair', async () => {
        const hand = `32T3K 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.ONE_PAIR, cards: '32T3K', bid: 555 });
    })

    await ctx.step('Recognize two pairs', async () => {
        const hand = `KTJJT 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.TWO_PAIR, cards: 'KTJJT', bid: 555 });
    })

    await ctx.step('Recognize two pairs', async () => {
        const hand = `TKJJT 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.TWO_PAIR, cards: 'TKJJT', bid: 555 });
    })

    await ctx.step('Recognize three of a kind', async () => {
        const hand = `T55J5 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.THREE_OF_A_KIND, cards: 'T55J5', bid: 555 });
    })

    await ctx.step('Recognize full house', async () => {
        const hand = `33T3T 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.FULL_HOUSE, cards: '33T3T', bid: 555 });
    })

    await ctx.step('Recognize four of a kind', async () => {
        const hand = `3333T 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.FOUR_OF_A_KIND, cards: '3333T', bid: 555 });
    })

    await ctx.step('Recognize five of a kind', async () => {
        const hand = `33333 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.FIVE_OF_A_KIND, cards: '33333', bid: 555 });
    })

});

Deno.test('Hand ranking', () => {
    const hands = [
        { rank: HAND_RANK.FULL_HOUSE, cards: '33T3T', bid: 555 },
        { rank: HAND_RANK.THREE_OF_A_KIND, cards: '33A3T', bid: 555 },
        { rank: HAND_RANK.THREE_OF_A_KIND, cards: 'A444T', bid: 555 },
    { rank: HAND_RANK.ONE_PAIR, cards: '33T2K', bid: 555 },
    { rank: HAND_RANK.HIGH_CARD, cards: 'K4T23', bid: 555 },
    { rank: HAND_RANK.HIGH_CARD, cards: '34T2K', bid: 555 },
    { rank: HAND_RANK.HIGH_CARD, cards: 'K5J43', bid: 555 },
    { rank: HAND_RANK.HIGH_CARD, cards: 'K5T63', bid: 555 },
    { rank: HAND_RANK.ONE_PAIR, cards: '32T3K', bid: 555 },
    { rank: HAND_RANK.FIVE_OF_A_KIND, cards: '44444', bid: 555 },
    { rank: HAND_RANK.FIVE_OF_A_KIND, cards: '33333', bid: 555 }];

    assertEquals(sortHands(hands), [
        { rank: HAND_RANK.HIGH_CARD, cards: '34T2K', bid: 555 },
        { rank: HAND_RANK.HIGH_CARD, cards: 'K4T23', bid: 555 },
        { rank: HAND_RANK.HIGH_CARD, cards: 'K5T63', bid: 555 },
        { rank: HAND_RANK.HIGH_CARD, cards: 'K5J43', bid: 555 },
        { rank: HAND_RANK.ONE_PAIR, cards: '32T3K', bid: 555 },
        { rank: HAND_RANK.ONE_PAIR, cards: '33T2K', bid: 555 },
        { rank: HAND_RANK.THREE_OF_A_KIND, cards: '33A3T', bid: 555 },
        { rank: HAND_RANK.THREE_OF_A_KIND, cards: 'A444T', bid: 555 },
        { rank: HAND_RANK.FULL_HOUSE, cards: '33T3T', bid: 555 },
        { rank: HAND_RANK.FIVE_OF_A_KIND, cards: '33333', bid: 555 },
        { rank: HAND_RANK.FIVE_OF_A_KIND, cards: '44444', bid: 555 }]);

})

Deno.test('Step 01', () => {
    assertEquals(step01(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`), 6440);

assertEquals(step01(`JJJJJ 2
22222 3
AAAAK 5
22223 7
AAAKK 11
22233 13
AAAKQ 17
22234 19
AAKKQ 23
22334 29
AAKQJ 31
22345 37
AKQJT 41
23456 43`), 1343);

assertEquals(step01(`AAAAA 2
22222 3
AAAAK 5
22223 7
AAAKK 11
22233 13
AAAKQ 17
22234 19
AAKKQ 23
22334 29
AAKQJ 31
22345 37
AKQJT 41
23456 43`), 1343);


assertEquals(step01(`2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`), 6592)
})