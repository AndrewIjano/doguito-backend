const Post = require('./posts-modelo')
const { InvalidArgumentError } = require('../erros')
const { ConversorPost } = require('../conversores')

module.exports = {
  async adiciona(req, res) {
    try {
      if (process.env.SEM_AUTH === 'true') {
        req.user = { id: 1 }
      }

      const adicionaPost = async (conteudoPost) => {
        conteudoPost.autor = req.user.id // adiciona o autor do post
        const post = new Post(conteudoPost)
        await post.adiciona()
        return post
      }

      const adicionaPosts = (listaDePosts) => {
        return Promise.all(listaDePosts.map(adicionaPost))
      }

      const postAdicionado =
        req.body instanceof Array
          ? await adicionaPosts(req.body) // adiciona uma lista de posts
          : await adicionaPost(req.body) // adiciona apenas um post

      res.status(201).json(postAdicionado)
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message })
      }
      res.status(500).json({ erro: erro.message })
    }
  },

  async lista(req, res) {
    try {
      let posts = await Post.listarTodos()
      const conversor = new ConversorPost(
        'json',
        req.acesso.todos.permitido
          ? req.acesso.todos.atributos
          : req.acesso.apenasSeu.atributos,
      )

      if (!req.estaAutenticado) {
        posts = posts.map((post) => {
          post.conteudo =
            post.conteudo.substr(0, 10) +
            '... Você precisa assinar o blog para ler o restante do post'
          return post
        })
      }

      if (isNaN(Number(req.query.autor)) === false) {
        const id = req.query.autor
        posts = posts.filter((post) => post.id === id)
      }

      if (req.query.categoria) {
        posts = posts.filter((post) => post.categoria === req.query.categoria)
      }

      if (req.query.subcategoria) {
        posts = posts.filter(
          (post) => post.subcategoria === req.query.subcategoria,
        )
      }

      res.send(conversor.converter(posts))
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async obterDetalhes(req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id, req.user.id)
      res.json(post)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async remover(req, res) {
    try {
      let post
      if (req.acesso.todos.permitido === true) {
        post = await Post.buscaPorId(req.params.id)
      } else if (req.acesso.apenasSeu.permitido === true) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },
}
