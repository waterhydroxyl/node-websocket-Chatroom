// 引入模块  https://blog.csdn.net/weixin_43900193/article/details/107559234
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const Multer = require("koa-multer");

const { MYCHAT_PATH } = require("../constants/file-path");
// 创建实例
const txCOSUpload = Multer({ dest: MYCHAT_PATH });

const txCOSHandle = txCOSUpload.single("avatar");

// const avatarResize = async (ctx, next) => {
//   const temp = ctx.req.file.originalname.split(".").pop();

//   // 构建图片名
//   const fileName = ctx.req.file.path + "." + temp;
//   // 文件路径
//   // console.log(fileName);
//   const filePath = "./" + ctx.req.file.path;
//   console.log(filePath + "000" + fileName);

//   fs.rename(filePath, fileName, async (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     try {
//       console.log("开始缩放");
//       await Jimp.read(filePath + "." + temp).then((image) => {
//         image.resize(128, 128).write(filePath + "." + temp);
//       });
//       await next();
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

module.exports = { txCOSHandle };
