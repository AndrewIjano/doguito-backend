const { promisify } = require('util')

module.exports = (lista) => {
  return {
    async adiciona(chave, valor, dataExpiracao) {
      await lista.set(chave, valor, dataExpiracao - Date.now()) 
    },

    async buscaValor(chave) {
      return lista.get(chave)
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
