const Router = require('koa-router');
const { create, avatarInfo, updateBan, userList } = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
const { verifyAuth } = require('../middleware/auth.middleware');

const userRouter = new Router({ prefix: '/users' });

userRouter.post('/register', verifyUser, handlePassword, create);
userRouter.get('/:name/avatar', avatarInfo);
userRouter.post('/ban', verifyAuth, updateBan);
userRouter.get('/userList', userList);

module.exports = userRouter;
