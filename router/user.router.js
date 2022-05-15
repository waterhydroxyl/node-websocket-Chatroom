const Router = require('koa-router');
const {
  create,
  updateBan,
  userList,
  updateUser,
  avatarInfo,
  delectUser,
  orderList,
  countUser,
  userInfo
} = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
const { verifyAuth } = require('../middleware/auth.middleware');

const userRouter = new Router({ prefix: '/users' });

userRouter.post('/register', verifyUser, handlePassword, create);
userRouter.get('/:name/avatar', avatarInfo);
userRouter.post('/ban', verifyAuth, updateBan);
userRouter.get('/userList', userList);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:name', delectUser);
userRouter.get('/orderList', orderList);
userRouter.get('/count/:type/:type2', countUser)
userRouter.get('/:name', userInfo);

module.exports = userRouter;
