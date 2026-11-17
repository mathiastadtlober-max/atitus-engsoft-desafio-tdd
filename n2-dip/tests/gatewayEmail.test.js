import { GatewayEmailConsole } from '../src/gatewayEmail.js';
import { ServicoNotificacao } from '../src/servicoNotificacao.js';
import { jest } from '@jest/globals';

describe('GatewayEmailConsole (implementação concreta)', () => {
  test('deve registrar o envio no logger injetado e retornar true', async () => {
    const logger = { log: jest.fn() };
    const gateway = new GatewayEmailConsole(logger);

    const resultado = await gateway.enviar('a@b.com', 'Olá');

    expect(resultado).toBe(true);
    expect(logger.log).toHaveBeenCalledWith('[REAL] Enviando e-mail para a@b.com: Olá');
  });

  test('deve ser compatível com o ServicoNotificacao (mesmo contrato)', async () => {
    const logger = { log: jest.fn() };
    const servico = new ServicoNotificacao(new GatewayEmailConsole(logger));

    await expect(servico.enviarBoasVindas({ email: 'a@b.com' })).resolves.toBe(true);
  });
});
