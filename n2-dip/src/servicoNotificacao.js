export const MENSAGEM_BOAS_VINDAS = 'Bem-vindo!';

export class ServicoNotificacao {
  // ✅ DIP: o serviço depende de uma abstração (qualquer objeto com
  // enviar(email, mensagem)) recebida pelo construtor, e não de uma
  // implementação concreta criada internamente.
  constructor(gatewayEmail) {
    if (typeof gatewayEmail?.enviar !== 'function') {
      throw new Error(
        'ServicoNotificacao precisa de um gateway com o método enviar(email, mensagem)'
      );
    }
    this.gatewayEmail = gatewayEmail;
  }

  async enviarBoasVindas(usuario) {
    if (!usuario?.email) {
      throw new Error('Usuário sem e-mail');
    }
    return this.gatewayEmail.enviar(usuario.email, MENSAGEM_BOAS_VINDAS);
  }
}
