import { ServicoNotificacao, MENSAGEM_BOAS_VINDAS } from '../src/servicoNotificacao.js';
import { jest } from '@jest/globals';

describe('ServicoNotificacao', () => {
  const usuario = { nome: 'Mathias', email: 'mathias@atitus.edu.br' };

  // MOCK: verificamos COMO o serviço interage com a dependência.
  test('deve chamar o gateway de email com os dados corretos', async () => {
    const mockGateway = { enviar: jest.fn().mockResolvedValue(true) };
    const servico = new ServicoNotificacao(mockGateway);

    await servico.enviarBoasVindas(usuario);

    expect(mockGateway.enviar).toHaveBeenCalledTimes(1);
    expect(mockGateway.enviar).toHaveBeenCalledWith('mathias@atitus.edu.br', MENSAGEM_BOAS_VINDAS);
  });

  test('a mensagem de boas-vindas deve ser "Bem-vindo!"', () => {
    expect(MENSAGEM_BOAS_VINDAS).toBe('Bem-vindo!');
  });

  // STUBS: controlamos O QUE a dependência devolve, para testar cada cenário.
  test('deve retornar true quando o gateway confirma o envio', async () => {
    const stubGateway = { enviar: async () => true };
    const servico = new ServicoNotificacao(stubGateway);

    await expect(servico.enviarBoasVindas(usuario)).resolves.toBe(true);
  });

  test('deve retornar false quando o gateway não consegue enviar', async () => {
    const stubGateway = { enviar: async () => false };
    const servico = new ServicoNotificacao(stubGateway);

    await expect(servico.enviarBoasVindas(usuario)).resolves.toBe(false);
  });

  test('deve propagar o erro quando o gateway falha', async () => {
    const stubGateway = { enviar: async () => { throw new Error('SMTP indisponível'); } };
    const servico = new ServicoNotificacao(stubGateway);

    await expect(servico.enviarBoasVindas(usuario)).rejects.toThrow('SMTP indisponível');
  });

  // Contrato da injeção de dependência.
  test.each([undefined, null, {}, { enviar: 'não é função' }])(
    'deve exigir um gateway com o método enviar (recebido: %p)',
    (gatewayInvalido) => {
      expect(() => new ServicoNotificacao(gatewayInvalido)).toThrow(
        'ServicoNotificacao precisa de um gateway com o método enviar(email, mensagem)'
      );
    }
  );

  test('não deve chamar o gateway se o usuário não tiver e-mail', async () => {
    const mockGateway = { enviar: jest.fn() };
    const servico = new ServicoNotificacao(mockGateway);

    await expect(servico.enviarBoasVindas({ nome: 'Sem email' })).rejects.toThrow(
      'Usuário sem e-mail'
    );
    expect(mockGateway.enviar).not.toHaveBeenCalled();
  });
});
