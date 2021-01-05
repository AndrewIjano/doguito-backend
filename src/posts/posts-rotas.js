const postsControlador = require('./posts-controlador')
const { middlewaresAutenticacao } = require('../usuarios')
const autorizacao = require('../middlewares/autorizacao')
const tentarAutenticar = require('../middlewares/tentarAutenticar')
const tentarAutorizar = require('../middlewares/tentarAutorizar')

module.exports = (app) => {
  app
    .route('/posts')
    .get(
      [tentarAutenticar, tentarAutorizar('post', 'ler')],
      postsControlador.lista,
    )
    .post(
      [middlewaresAutenticacao.bearer, autorizacao('post', 'criar')],
      postsControlador.adiciona,
    )

  app
    .route('/posts/:id')
    .get(
      [middlewaresAutenticacao.bearer, autorizacao('post', 'ler')],
      postsControlador.obterDetalhes,
    )
    .delete(
      [
        middlewaresAutenticacao.bearer,
        autorizacao('post', 'remover'),
      ],
      postsControlador.remover,
    )
}
