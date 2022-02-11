const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require("../middleware/file.middleware");
const {
  saveAvatarInfo,
  savePictureInfo,
} = require("../controller/file.controller");

const { txCOSHandle } = require("../middleware/txcos.middleware");
const { txCOSSave } = require("../controller/txcos.controller");

const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", avatarHandler, saveAvatarInfo);
fileRouter.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
);
fileRouter.post(
  "/txcos",
  async (ctx, next) => {
    console.log("进入路由", ctx.req.file);
    await next();
  },
  txCOSHandle,
  txCOSSave
);

module.exports = fileRouter;
