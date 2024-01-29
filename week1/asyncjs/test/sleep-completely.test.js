const calculateTime = require('../sleep-completely');
describe("calculateTime function", () => {
    // try{
    test("calculates time 1", async () => {
      const difference = await calculateTime(1000);
      expect(difference).toBeGreaterThanOrEqual(1000);
      expect(difference).toBeLessThan(2000);
    }, 2000);
    test("calculates time 2", async () => {
        const difference = await calculateTime(2000);
        expect(difference).toBeGreaterThanOrEqual(2000);
        expect(difference).toBeLessThan(3000);
      }, 3000);
      test("calculates time 3", async () => {
        const difference = await calculateTime(3000);
        expect(difference).toBeGreaterThanOrEqual(3000);
        expect(difference).toBeLessThan(4000);
      }, 4000);
      test("calculates time 4", async () => {
        const difference = await calculateTime(4000);
        expect(difference).toBeGreaterThanOrEqual(4000);
        expect(difference).toBeLessThan(5000);
      }, 5000);
});