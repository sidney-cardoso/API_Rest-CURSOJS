"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _User = require('../controllers/User'); var _User2 = _interopRequireDefault(_User);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _User2.default.store);
router.get('/', _User2.default.index);
router.put('/', _loginRequired2.default, _User2.default.update);
router.delete('/:id', _User2.default.delete);

exports. default = router;

/** Padrão de métodos para ter dentro de um controller
 * index -> exibe todos os usuários = GET
 * store/create -> cria um usuário = POST
 * delete -> apaga um usuário = DELETE
 * show -> Mostra um usuário = GET
 * update -> atualiza um usuário = PUT/PATCH
*/
