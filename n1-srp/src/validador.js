import { EmailValidator } from './validators/emailValidator.js';
import { PasswordValidator } from './validators/passwordValidator.js';
import { AgeValidator } from './validators/ageValidator.js';

// O coordenador não conhece nenhuma regra: só sabe qual validador
// cuida de qual campo. Mudar uma regra não muda este arquivo.
export function criarValidadorUsuario(validadoresPorCampo) {
  const campos = Object.entries(validadoresPorCampo);

  return function validar(usuario) {
    if (!usuario) return false;
    return campos.every(([campo, validador]) => validador.validar(usuario[campo]));
  };
}

export const validadorUsuario = criarValidadorUsuario({
  email: EmailValidator,
  password: PasswordValidator,
  age: AgeValidator,
});
