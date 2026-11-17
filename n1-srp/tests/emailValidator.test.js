import { EmailValidator } from '../src/validators/emailValidator.js';

describe('EmailValidator', () => {
  test('deve aceitar um e-mail válido', () => {
    expect(EmailValidator.validar('test@atitus.edu.br')).toBe(true);
  });

  test('deve rejeitar e-mail sem @', () => {
    expect(EmailValidator.validar('test.atitus.edu.br')).toBe(false);
  });

  test('deve rejeitar e-mail sem domínio', () => {
    expect(EmailValidator.validar('test@')).toBe(false);
  });

  test('deve rejeitar e-mail sem usuário', () => {
    expect(EmailValidator.validar('@atitus.edu.br')).toBe(false);
  });

  test('deve rejeitar e-mail com espaços', () => {
    expect(EmailValidator.validar('te st@atitus.edu.br')).toBe(false);
  });

  test.each([undefined, null, '', 123])('deve rejeitar valor inválido: %p', (valor) => {
    expect(EmailValidator.validar(valor)).toBe(false);
  });
});
