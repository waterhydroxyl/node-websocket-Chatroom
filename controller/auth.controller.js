

class OthersController {
  async login(ctx, next) {
    const { id, name, status, ban } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    });

    ctx.body = { id, name, status, token, ban };
  }

  async success(ctx, next) {
    ctx.body = '授权成功~';
  }
}

module.exports = new OthersController();
