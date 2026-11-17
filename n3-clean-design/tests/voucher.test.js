import { calcularDesconto } from '../src/calculadoraVoucher.js';

describe('CalculadoraVoucher', () => {
  describe('cupons válidos (regras do README)', () => {
    test('deve aplicar 10% para o voucher DEZ', () => {
      expect(calcularDesconto('DEZ', 100)).toBe(10);
    });

    test('deve aplicar 30% para o voucher TRINTA', () => {
      expect(calcularDesconto('TRINTA', 100)).toBe(30);
    });

    test('deve calcular o percentual sobre qualquer valor', () => {
      expect(calcularDesconto('DEZ', 250)).toBe(25);
      expect(calcularDesconto('TRINTA', 50)).toBe(15);
    });

    test('deve arredondar o desconto para centavos', () => {
      expect(calcularDesconto('DEZ', 33.33)).toBe(3.33);
      expect(calcularDesconto('TRINTA', 19.99)).toBe(6);
    });
  });

  describe('outros cupons: sem desconto', () => {
    test.each(['NATAL10', 'CINQUENTA', '', undefined, null])(
      'não deve aplicar desconto para o cupom %p',
      (codigo) => {
        expect(calcularDesconto(codigo, 100)).toBe(0);
      }
    );
  });

  describe('valor da compra', () => {
    test('deve retornar 0 para compra de valor 0', () => {
      expect(calcularDesconto('DEZ', 0)).toBe(0);
    });

    test.each([-1, NaN, '100', undefined, Infinity])(
      'deve lançar erro para valor inválido: %p',
      (valor) => {
        expect(() => calcularDesconto('DEZ', valor)).toThrow('Valor da compra inválido');
      }
    );
  });
});
