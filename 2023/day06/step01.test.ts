import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { step01 } from "./step01.ts";

Deno.test("Step 01", () => {
    const input = `
    Time:      7  15   30
    Distance:  9  40  200
    `;
    assertEquals(step01(input), 288);
});