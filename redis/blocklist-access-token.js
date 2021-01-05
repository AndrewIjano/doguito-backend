const Keyv = require('keyv')

const blocklist = new Keyv({ namespace: 'blocklist-access-token' })
blocklist.on('error', (err) =>
  console.log('Erro de conexão na blocklist de access tokens', err),
)

const manipulaLista = require('./manipula-lista')
const manipulaBlocklist = manipulaLista(blocklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp
    const tokenHash = geraTokenHash(token)
    await manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao)
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token)
    return manipulaBlocklist.contemChave(tokenHash)
  },
}
