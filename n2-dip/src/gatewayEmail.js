// Implementação concreta (detalhe de infraestrutura) do contrato
// enviar(email, mensagem). Fica FORA do serviço e é injetada nele.
export class GatewayEmailConsole {
  constructor(logger = console) {
    this.logger = logger;
  }

  async enviar(email, mensagem) {
    this.logger.log(`[REAL] Enviando e-mail para ${email}: ${mensagem}`);
    return true;
  }
}

// Uso em produção (composição na borda da aplicação):
//   const servico = new ServicoNotificacao(new GatewayEmailConsole());
