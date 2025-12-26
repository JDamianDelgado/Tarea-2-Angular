import { CurrencyArgToUsdPipe } from './currency-pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyArgToUsdPipe();
    expect(pipe).toBeTruthy();
  });
});
