import { Product } from './product';

describe('Mittel', () => {
  it('should create an instance', () => {

    const productNr = '00000';
    const name = 'Test Product 1';
    const formulationType = 'BB';
    const authorizationStart = '2022-04-28';
    const authorizationEnd = '2025-04-30';

    expect(new Product(productNr, name, formulationType, authorizationStart, authorizationEnd)).toBeTruthy();
  });
});
