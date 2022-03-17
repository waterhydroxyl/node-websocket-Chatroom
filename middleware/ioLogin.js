const userService = require("../service/user.service");
const errorTypes = require("../constants/error-types");
const md5password = require("../utils/password-handle");

const verifyUser = async (socket, next) => {
  // 1.获取用户名和密码
  const { name, password } = socket.handshake.query;
  // console.log(name, password + "io.middleware,verifyUser");

  // 2.判断用户名和密码是否为空 前端来判断
  // if (!name || !password) {
  //   const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
  //   console.log(error);
  //   // return ctx.app.emit("error", error, ctx);
  // }

  // 3.判断用户是否存在的
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    // socket.emit("error", errorTypes.USER_DOES_NOT_EXISTS);
    console.log("用户不存在");
    return next(error);
  }
  // console.log("不会来到这里吧？");
  // 4.判断密码是否和数据库中的密码是一致(加密)
  // console.log(password, "user.password");
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return next(error);
  }

  await next();
};

module.exports = {
  verifyUser,
};
