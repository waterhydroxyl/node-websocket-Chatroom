const Router = require('koa-router');
const { wordList, addWord } = require('../controller/others.controller');
// const { verifyUser, handlePassword } = require('../middleware/user.middleware');
// const { verifyAuth } = require('../middleware/auth.middleware');

const othersRouter = new Router({ prefix: '/others' });

othersRouter.get('/words', wordList);
othersRouter.post('/words', addWord);
// userRouter.post('/register', verifyUser, handlePassword, create);
// userRouter.get('/:name/avatar', avatarInfo);
// userRouter.post('/ban', verifyAuth, updateBan);
// userRouter.get('/userList', userList);
// userRouter.patch('/:id', updateUser);

module.exports = othersRouter;
