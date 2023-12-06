import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { step02 } from "./step02.ts";

Deno.test("Step 02", () => {
    const input = `
    Time:      7  15   30
    Distance:  9  40  200
    `;
    assertEquals(step02(input), 71503);
});