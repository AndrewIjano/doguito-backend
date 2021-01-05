const categoriasControlador = require('./categorias-controlador')

module.exports = (app) => {
  app.route('/categorias').get(categoriasControlador.lista)
  app
    .route('/categorias/:categoriaNome')
    .get(categoriasControlador.buscaCategoria)
}
