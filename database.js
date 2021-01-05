const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.sqlite')

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    emailVerificado INTEGER,
    cargo VARCHAR(15) CHECK (cargo in ('admin', 'editor', 'assinante')) NOT NULL
  )
  `

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    metadescription VARCHAR(255) NOT NULL,
    body TEXT,
    categoriaId INTEGER NOT NULL,
    subcategoriaId INTEGER NOT NULL,
    autor INTEGER NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id),
    FOREIGN KEY (subcategoriaId) REFERENCES subcategorias(id),
    FOREIGN KEY (autor) REFERENCES usuarios(id)
  )
  `

const CATEGORIAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL
  )
  `
const SUBCATEGORIAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS subcategorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoriaId INTEGER NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id)
  )
  `

const INSERT_CATEGORIA = `
  INSERT INTO categorias(nome) 
  SELECT ?
  WHERE NOT EXISTS (SELECT * FROM categorias WHERE nome=?)
`

const INSERT_SUBCATEGORIA = `
  INSERT INTO subcategorias(nome, categoriaId) 
  SELECT ?, (SELECT id from categorias WHERE nome=?)
  WHERE NOT EXISTS (SELECT * FROM subcategorias WHERE nome=?)
`

const categorias = [
  {
    nome: 'bem-estar',
    subcategorias: ['higiene', 'saude'],
  },
  {
    nome: 'comportamento',
    subcategorias: ['treinamento', 'educacao'],
  },
]

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON')
  db.run(USUARIOS_SCHEMA)
  db.run(POSTS_SCHEMA)
  db.run(CATEGORIAS_SCHEMA)
  db.run(SUBCATEGORIAS_SCHEMA)

  categorias.forEach((categoria) =>
    db.run(INSERT_CATEGORIA, [categoria.nome, categoria.nome]),
  )

  categorias.forEach((categoria) =>
    categoria.subcategorias.forEach((subcategoria) =>
      db.run(INSERT_SUBCATEGORIA, [subcategoria, categoria.nome, subcategoria]),
    ),
  )
})

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0)
  }),
)

module.exports = db
