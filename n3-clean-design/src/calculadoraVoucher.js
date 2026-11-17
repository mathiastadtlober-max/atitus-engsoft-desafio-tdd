// Regras de negócio como dados: novo cupom = nova linha, sem novo if.
const PERCENTUAL_POR_CUPOM = Object.freeze({
  DEZ: 0.1,
  TRINTA: 0.3,
});

const SEM_DESCONTO = 0;

function percentualDo(codigo) {
  return PERCENTUAL_POR_CUPOM[codigo] ?? SEM_DESCONTO;
}

function validarValor(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor < 0) {
    throw new Error('Valor da compra inválido');
  }
}

function arredondarParaCentavos(valor) {
  return Math.round(valor * 100) / 100;
}

export function calcularDesconto(codigo, valor) {
  validarValor(valor);
  return arredondarParaCentavos(valor * percentualDo(codigo));
}
