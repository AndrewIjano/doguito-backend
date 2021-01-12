const { promisify } = require('util')

module.exports = (lista) => {
  return {
    async adiciona(chave, valor, dataExpiracao) {
      await lista.set(chave, valor, Date.now() - dataExpiracao)
    },

    async buscaValor(chave) {
      const id = await lista.get(chave)
      return await id
    },

    async contemChave(chave) {
      const resultado = await lista.get(chave)
      if (!resultado) {
        return false
      }
      return true
    },

    async deleta(chave) {
      await lista.delete(chave)
    },
  }
}
