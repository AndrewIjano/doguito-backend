const { middlewaresAutenticacao } = require('../usuarios')
module.exports = (requisicao, resposta, proximo) => {
  requisicao.estaAutenticado = false

  if (process.env.SEM_AUTH === 'true') {
    return middlewaresAutenticacao.bearer(requisicao, resposta, proximo)
  }

  if (requisicao.get('Authorization')) {
    return middlewaresAutenticacao.bearer(requisicao, resposta, proximo)
  }

  proximo()
}
