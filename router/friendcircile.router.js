const Router = require('koa-router');
const { create, updateLike, list } = require('../controller/friendcircle.controller.js');
// const { verifyUser, handlePassword } = require('../middleware/user.middleware');
const { verifyAuth } = require('../middleware/auth.middleware');

const friendRouter = new Router();

friendRouter.post('/friendcircle', create);
friendRouter.patch('/friendcircle/:id', updateLike);
friendRouter.get('/friendcircle', list);

module.exports = friendRouter;
