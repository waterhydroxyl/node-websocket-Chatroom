const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async countUser(ctx, next) {
    // const type = 'text';
    console.log(ctx.params);

    const { type, type2 } = ctx.params;

    // console.log(ctx.request.body);
    const result = await userService.countUser(type, type2);
    ctx.body = result;
  }

  async orderList(ctx, next) {
    const { limit } = ctx.request.body;
    // console.log(limit, offset);
    const result = await userService.orderList(limit);
    ctx.body = result;
  }

  async updateBan(ctx, next) {
    const user = ctx.user;
    const { ban } = ctx.request.body;
    const result = await userService.updateBan(ban, user.id);
    ctx.body = result;
  }

  async delectUser(ctx, next) {
    const name = ctx.params.name;
    const result = await userService.delectUser(name);
    ctx.body = result;
  }

  async updateUser(ctx, next) {
    const userId = ctx.params.id;
    const { name, cellphone, password, status = 1 } = ctx.request.body;
    const result = await userService.updateUserInfoById(name, cellphone, password, userId, status);
    ctx.body = result;
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    console.log(ctx);
    ctx.body = result;
  }

  async userList(ctx, next) {
    const { name, cellphone, status, createAtB, createAtE } = ctx.request.query;
    // console.log(name, cellphone, status);
    const result = await userService.getUserList(name, cellphone, status, createAtB, createAtE);
    // console.log('userList', result);
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
      ctx.body = 'NOT_FOUND';
    }
  }
}
module.exports = new UserController();
