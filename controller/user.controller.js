const fs = require("fs");

const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    console.log(ctx);
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.用户的头像是哪一个文件呢?
    const { name } = ctx.params;
    console.log(name);
    const userInfo = await fileService.getAvatarByUserId(name);
    if (userInfo) {
      ctx.body = {
        status: 200,
        avatarUrl: userInfo.avatar_url,
      };
    } else {
      ctx.body = "NOT_FOUND";
    }
  }
}
module.exports = new UserController();
