const db = require('../../database')
const { InternalServerError } = require('../erros')

const { promisify } = require('util')
const dbRun = promisify(db.run).bind(db)
const dbGet = promisify(db.get).bind(db)
const dbAll = promisify(db.all).bind(db)

module.exports = {
  async adiciona(post) {
    try {
      await dbRun(
        `INSERT INTO posts (
          title, 
          metadescription, 
          body, 
          categoriaId, 
          subcategoriaId, 
          autor
        ) VALUES (
          ?, 
          ?, 
          ?, 
          (SELECT id from categorias WHERE nome=?), 
          (SELECT id from subcategorias WHERE nome=?), 
          ?
        )`,
        [
          post.title,
          post.metadescription,
          post.body,
          post.categoria,
          post.subcategoria,
          post.autor,
        ],
      )
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o post!')
    }
  },

  async listarPorAutor(idAutor) {
    try {
      return await dbAll('SELECT * FROM posts WHERE autor = ?', [
        idAutor,
      ])
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!')
    }
  },

  async listarTodos() {
    try {
      return await dbAll(`
        SELECT p.id, p.title, p.metadescription, p.body, c.nome AS categoria, s.nome AS subcategoria, autor 
        FROM posts p
        INNER JOIN categorias c
        ON p.categoriaId = c.id
        INNER JOIN subcategorias s
        ON p.subcategoriaId = s.id`
      )
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!')
    }
  },

  async buscaPorId(id, idAutor) {
    try {
      let instrucoes = 'SELECT * FROM posts WHERE id = ?'
      const parametros = [id]

      idAutor = Number(idAutor)
      if (isNaN(idAutor) === false) {
        instrucoes = `${instrucoes} AND autor = ?`
        parametros.push(idAutor)
      }

      return await dbGet(instrucoes, parametros)
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o post!')
    }
  },

  async remover({ id, autor }) {
    try {
      return await dbRun('DELETE FROM posts WHERE id = ? AND autor = ?', [
        id,
        autor,
      ])
    } catch (erro) {
      throw new InternalServerError('Erro ao tentar remover o post!')
    }
  },
}
