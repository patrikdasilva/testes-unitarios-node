import { expect, test } from "vitest";
import { getFeatureDate } from "./get-feature-date";


test("increases date with one year", () => {
    const year = new Date().getFullYear();
    
    expect(getFeatureDate(`${year}-08-10`).getFullYear()).toEqual(2023);
})