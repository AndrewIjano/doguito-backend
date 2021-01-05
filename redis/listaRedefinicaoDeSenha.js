const Keyv = require('keyv')

const conexao = new Keyv({ namespace: 'redefinicao-de-senha' })
conexao.on('error', (err) =>
  console.log('Erro de conexão na lista de redefinição de senha', err),
)

const manipulaLista = require('./manipula-lista')
module.exports = manipulaLista(conexao)