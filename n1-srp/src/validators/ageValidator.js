// Responsabilidade única: dizer se a idade atende à idade mínima.
export const IDADE_MINIMA = 18;

export const AgeValidator = {
  validar(idade) {
    return Number.isFinite(idade) && idade >= IDADE_MINIMA;
  },
};
