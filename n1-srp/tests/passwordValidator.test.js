import { PasswordValidator, TAMANHO_MINIMO_SENHA } from '../src/validators/passwordValidator.js';

describe('PasswordValidator', () => {
  test('o tamanho mínimo da senha deve ser 8', () => {
    expect(TAMANHO_MINIMO_SENHA).toBe(8);
  });

  test('deve aceitar senha com exatamente 8 caracteres (limite)', () => {
    expect(PasswordValidator.validar('12345678')).toBe(true);
  });

  test('deve aceitar senha com mais de 8 caracteres', () => {
    expect(PasswordValidator.validar('password123')).toBe(true);
  });

  test('deve rejeitar senha com 7 caracteres (limite - 1)', () => {
    expect(PasswordValidator.validar('1234567')).toBe(false);
  });

  test.each([undefined, null, '', 12345678])('deve rejeitar valor inválido: %p', (valor) => {
    expect(PasswordValidator.validar(valor)).toBe(false);
  });
});
