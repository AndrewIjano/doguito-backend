const categoriasDao = require('./categorias-dao')
const validacoes = require('../validacoes-comuns')

class Categoria {
  constructor(categoria) {
    this.id = categoria.id
    this.nome = categoria.nome
    this.valida()
  }

  valida() {}

  async listaSubcategorias() {
    const subcategorias = await categoriasDao.listaSubcategorias(this.nome)
    return subcategorias.map((s) => s.nome)
  }

  static listarTodos() {
    return categoriasDao.listarTodos()
  }

  static async buscaPorNome(categoriaNome) {
    const categoria = await categoriasDao.buscaPorNome(categoriaNome)

    if (!categoria) {
      return null
    }

    return new Categoria(categoria)
  }
}

module.exports = Categoria
