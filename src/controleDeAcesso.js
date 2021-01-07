const AccessControl = require('accesscontrol')
const controle = new AccessControl()

controle
  .grant('leitor')
  .readAny('post', [
    'id',
    'title',
    'metadescription',
    'body',
    'categoria',
    'subcategoria',
    'autor',
  ])
  .readAny('usuario', ['nome'])
  
controle.grant('assinante').extend('leitor')

controle.grant('editor').extend('assinante').createOwn('post').deleteOwn('post')

controle
  .grant('admin')
  .readAny('post')
  .createAny('post')
  .deleteAny('post')
  .readAny('usuario')
  .deleteAny('usuario')

module.exports = controle
