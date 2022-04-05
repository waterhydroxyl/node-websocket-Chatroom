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
    const result = await service.updateLike(id);
    ctx.body = result;
  }

  async list(ctx, next) {
    const result = await service.getFriendCircleList();
    ctx.body = result;
  }
}

module.exports = new CommentController();
