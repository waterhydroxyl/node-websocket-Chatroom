const service = require('../service/friendcircle.service.js');

class CommentController {
  async create(ctx, next) {
    const { name, picUrl = 'www', content } = ctx.request.body;
    console.log(name, picUrl, content);
    const result = await service.create(name, picUrl, content);
    ctx.body = result;
  }

  async updateLike(ctx, next) {
    const id = ctx.params.id;
    const { name } = ctx.request.body;
    console.log(id, name);
    const result = await service.getFriendCircleListById(id);
    console.log(result[0].likes.person.length);
    const position = result[0].likes.person.length;

    try {
      const result1 = await service.updateLike(position, name, id);
      ctx.body = result1;
    } catch (error) {
      console.log(error);
    }
  }

  async list(ctx, next) {
    const result = await service.getFriendCircleList();
    ctx.body = result;
  }
}

module.exports = new CommentController();
