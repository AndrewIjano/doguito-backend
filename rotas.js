const posts = require('./src/posts')
const usuarios = require('./src/usuarios')
const categorias = require('./src/categorias')

module.exports = (app) => {
  posts.rotas(app)
  usuarios.rotas(app)
  categorias.rotas(app)
}
