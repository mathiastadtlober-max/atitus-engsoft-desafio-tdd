import { AgeValidator, IDADE_MINIMA } from '../src/validators/ageValidator.js';

describe('AgeValidator', () => {
  test('a idade mínima deve ser 18', () => {
    expect(IDADE_MINIMA).toBe(18);
  });

  test('deve aceitar idade igual a 18 (limite)', () => {
    expect(AgeValidator.validar(18)).toBe(true);
  });

  test('deve aceitar idade maior que 18', () => {
    expect(AgeValidator.validar(20)).toBe(true);
  });

  test('deve rejeitar idade 17 (limite - 1)', () => {
    expect(AgeValidator.validar(17)).toBe(false);
  });

  test.each([undefined, null, '20', NaN])('deve rejeitar valor inválido: %p', (valor) => {
    expect(AgeValidator.validar(valor)).toBe(false);
  });
});
