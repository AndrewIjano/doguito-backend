const Categoria = require('./categorias-modelo')

module.exports = {
  async lista(req, res) {
    try {
      const Categoria2 = require('./categorias-modelo')
       
      console.log(`Categoria:`) 
      console.log(Categoria)
      console.log(Categoria2)
      console.log(`-----`)
      console.log()

      const categorias = await Categoria.listarTodos()
      res.status(200).json(categorias)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async buscaCategoria(req, res) {
    try {
      const { categoriaNome } = req.params
      const c = await Categoria.buscaPorNome(categoriaNome)
      const subcategorias = await c.listaSubcategorias()
      res.status(200).json({ ...c, subcategorias })
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },
}
