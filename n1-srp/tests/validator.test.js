import { validadorUsuario, criarValidadorUsuario } from '../src/validador.js';

const usuarioValido = { email: 'test@atitus.edu.br', password: 'password123', age: 20 };

describe('validadorUsuario (coordenador)', () => {
  test('deve validar um usuário correto', () => {
    expect(validadorUsuario(usuarioValido)).toBe(true);
  });

  test('deve rejeitar usuário com e-mail inválido', () => {
    expect(validadorUsuario({ ...usuarioValido, email: 'invalido' })).toBe(false);
  });

  test('deve rejeitar usuário com senha curta', () => {
    expect(validadorUsuario({ ...usuarioValido, password: '123' })).toBe(false);
  });

  test('deve rejeitar usuário menor de idade', () => {
    expect(validadorUsuario({ ...usuarioValido, age: 17 })).toBe(false);
  });

  test('deve rejeitar usuário sem campos sem lançar erro', () => {
    expect(validadorUsuario({})).toBe(false);
  });

  test.each([undefined, null])('deve rejeitar usuário %p sem lançar erro', (usuario) => {
    expect(validadorUsuario(usuario)).toBe(false);
  });
});

describe('criarValidadorUsuario (apenas coordena, não conhece as regras)', () => {
  const sempre = (resultado) => ({ validar: () => resultado });

  test('deve retornar true quando todos os validadores aprovam', () => {
    const validar = criarValidadorUsuario({
      email: sempre(true),
      password: sempre(true),
      age: sempre(true),
    });
    expect(validar(usuarioValido)).toBe(true);
  });

  test('deve retornar false quando qualquer validador reprova', () => {
    const validar = criarValidadorUsuario({
      email: sempre(true),
      password: sempre(false),
      age: sempre(true),
    });
    expect(validar(usuarioValido)).toBe(false);
  });

  test('deve repassar a cada validador apenas o seu campo', () => {
    const recebidos = {};
    const espiao = (campo) => ({
      validar: (valor) => {
        recebidos[campo] = valor;
        return true;
      },
    });

    criarValidadorUsuario({
      email: espiao('email'),
      password: espiao('password'),
      age: espiao('age'),
    })(usuarioValido);

    expect(recebidos).toEqual(usuarioValido);
  });
});
