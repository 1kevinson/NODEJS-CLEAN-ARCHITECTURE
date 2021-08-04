import { Dollar } from "./Dollar";

describe('my TDD learning', () => {
    test('test money multiplication', () => {
        const money: Dollar = new Dollar(5);

        money.multiplyByRate(3);
        expect(money.getAmount()).toBe(15);
    })
});