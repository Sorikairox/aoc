import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { HAND_RANK, getHandData, sortHands, step02 } from "./step02.ts";

Deno.test("Card recognition", async (ctx) => {

    await ctx.step('Recognize high card', async () => {
        const hand = `32TQK 765`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.HIGH_CARD, cards: '32TQK', bid: 765 });
    })

    await ctx.step('Recognize one pair', async () => {
        const hand = `32T3K 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.ONE_PAIR, cards: '32T3K', bid: 555 });
    })

    await ctx.step('Recognize one pair with joker', async () => {
        const hand = `32TJK 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.ONE_PAIR, cards: '32TJK', bid: 555 });
    })

    await ctx.step('Recognize two pairs', async () => {
        const hand = `KT88T 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.TWO_PAIR, cards: 'KT88T', bid: 555 });
    })

    await ctx.step('Recognize two pairs', async () => {
        const hand = `TK88T 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.TWO_PAIR, cards: 'TK88T', bid: 555 });
    })

    await ctx.step('Recognize three of a kind', async () => {
        const hand = `T5585 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.THREE_OF_A_KIND, cards: 'T5585', bid: 555 });
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

    await ctx.step('Recognize five of a kind', async () => {
        const hand = `JJJJJ 555`;
        assertEquals(getHandData(hand), { rank: HAND_RANK.FIVE_OF_A_KIND, cards: 'JJJJJ', bid: 555 });
    })

});
