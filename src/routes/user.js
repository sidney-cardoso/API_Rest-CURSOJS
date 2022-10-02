import { Router } from 'express';
import userController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, userController.store);
router.get('/', userController.index);
// router.get('/:id', userController.show);
router.put('/', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

export default router;

/** Padrão de métodos para ter dentro de um controller
 * index -> exibe todos os usuários = GET
 * store/create -> cria um usuário = POST
 * delete -> apaga um usuário = DELETE
 * show -> Mostra um usuário = GET
 * update -> atualiza um usuário = PUT/PATCH
*/
