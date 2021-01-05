const db = require('../../database')

const { InternalServerError } = require('../erros')

const { promisify } = require('util')

const dbAll = promisify(db.all).bind(db)
const dbGet = promisify(db.get).bind(db)

module.exports = {
  async buscaPorNome(categoriaNome) {
    try {
      return await dbGet(`
        SELECT id, nome
        FROM categorias
        WHERE nome = ?
      `, [categoriaNome])
    } catch (erro) {
      throw new InternalServerError('Erro ao buscar a categoria!')
    }
  },

  async listarTodos() {
    try {
      return await dbAll(`
        SELECT id, nome  
        FROM categorias`)
    } catch (erro) {
      throw new InternalServerError('Erro ao listar as categorias!')
    }
  },
  
  async listaSubcategorias(categoriaNome) {
    try {
      return await dbAll(`
        SELECT s.id, s.nome  
        FROM subcategorias s
        INNER JOIN categorias c
        ON s.categoriaId = c.id
        WHERE c.nome = ?
        `, [categoriaNome])
    } catch (erro) {
      throw new InternalServerError('Erro ao listar as subcategorias!')
    }
  },
}
