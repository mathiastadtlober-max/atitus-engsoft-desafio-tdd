// Responsabilidade única: dizer se um e-mail tem formato válido.
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailValidator = {
  validar(email) {
    return typeof email === 'string' && FORMATO_EMAIL.test(email);
  },
};
