import demo from './demo';

describe('demo', () => {
  test('demo', () => {
    expect(demo()).toEqual([
      2,
      3,
      5
    ]);
  });
});