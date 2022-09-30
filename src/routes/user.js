import { Router } from 'express';
import userController from '../controllers/User';

const router = new Router();

router.post('/', userController.store);

export default router;

/** Padrão de métodos para ter dentro de um controller
 * index -> exibe todos os usuários = GET
 * store/create -> cria um usuário = POST
 * delete -> apaga um usuário = DELETE
 * show -> Mostra um usuário = GET
 * update -> atualiza um usuário = PUT/PATCH
*/
