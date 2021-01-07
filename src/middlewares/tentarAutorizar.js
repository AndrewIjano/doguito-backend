const autorizacao = require('./autorizacao')

module.exports = (entidade, acao) => (requisicao, resposta, proximo) => {
  if (
    requisicao.estaAutenticado === true ||
    requisicao.user.cargo === 'leitor'
  ) {
    return autorizacao(entidade, acao)(requisicao, resposta, proximo)
  }

  proximo()
}
