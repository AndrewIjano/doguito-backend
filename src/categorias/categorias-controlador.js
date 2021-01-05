const Categoria = require('./categorias-modelo')

module.exports = {
  async lista(req, res) {
    try {
      const categorias = await Categoria.listarTodos()
      res.status(200).json(categorias)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async buscaCategoria(req, res) {
    try {
      const { categoriaNome } = req.params
      const categoria = await Categoria.buscaPorNome(categoriaNome)
      const subcategorias = await categoria.listaSubcategorias()
      res.status(200).json({ ...categoria, subcategorias })
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },
}
