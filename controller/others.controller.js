

const othersService = require('../service/others.service');


class OthersController {



  async wordList(ctx, next) {
    // const { name, cellphone, status, createAtB, createAtE } = ctx.request.query;
    // console.log(name, cellphone, status);
    const result = await othersService.getUserList();
    // console.log('userList', result);
    ctx.body = result;
  }

  async addWord(ctx, next) {
    // 获取用户请求传递的参数
    const { word } = ctx.request.body;
    // 查询数据
    const result = await othersService.addWord(word);
    // 返回数据
    // console.log(ctx);
    ctx.body = '添加成功';
  }

}
module.exports = new OthersController();
