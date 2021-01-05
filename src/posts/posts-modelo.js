const postsDao = require('./posts-dao')
const validacoes = require('../validacoes-comuns')

class Post {
  constructor(post) {
    this.id = post.id
    this.title = post.title
    this.metadescription = post.metadescription
    this.body = post.body
    this.categoria = post.categoria
    this.subcategoria = post.subcategoria
    this.autor = post.autor
    this.valida()
  }

  adiciona() {
    return postsDao.adiciona(this)
  }

  static async buscaPorId(id) {
    const post = await postsDao.buscaPorId(id)
    if (!post) {
      return null
    }

    return new Post(post)
  }

  static async buscaPorIdAutor(id, idAutor) {
    const post = await postsDao.buscaPorId(id, idAutor)

    if (!post) {
      return null
    }

    return new Post(post)
  }

  valida() {
    validacoes.campoStringNaoNulo(this.title, 'title')
    validacoes.campoTamanhoMinimo(this.title, 'title', 5)

    validacoes.campoStringNaoNulo(this.body, 'body')
    validacoes.campoTamanhoMaximo(this.body, 'body', 4000)
  }

  remover() {
    return postsDao.remover(this)
  }

  static listarPorAutor(idAutor) {
    return postsDao.listarPorAutor(idAutor)
  }

  static listarTodos() {
    return postsDao.listarTodos()
  }
}

module.exports = Post
