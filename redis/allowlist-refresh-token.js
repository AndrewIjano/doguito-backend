const Keyv = require('keyv')

const allowlist = new Keyv({ namespace: 'allowlist-refresh-token' })
allowlist.on('error', (err) =>
  console.log('Erro de conexão na allowlist de refresh tokens', err),
)

const manipulaLista = require('./manipula-lista')
module.exports = manipulaLista(allowlist)
