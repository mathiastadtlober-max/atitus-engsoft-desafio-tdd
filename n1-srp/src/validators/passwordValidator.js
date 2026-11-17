// Responsabilidade única: dizer se uma senha atende à política de tamanho.
export const TAMANHO_MINIMO_SENHA = 8;

export const PasswordValidator = {
  validar(senha) {
    return typeof senha === 'string' && senha.length >= TAMANHO_MINIMO_SENHA;
  },
};
