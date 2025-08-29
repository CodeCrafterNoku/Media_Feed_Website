import { isDueWithin24h } from "./time";

test("isDueWithin24h detects upcoming deadlines", () => {
  const in23h = new Date(Date.now() + 23 * 3600 * 1000).toISOString();
  const in26h = new Date(Date.now() + 26 * 3600 * 1000).toISOString();
  const past = new Date(Date.now() - 3600 * 1000).toISOString();

  expect(isDueWithin24h(in23h)).toBe(true);
  expect(isDueWithin24h(in26h)).toBe(false);
  expect(isDueWithin24h(past)).toBe(false);
  expect(isDueWithin24h(undefined)).toBe(false);
});
