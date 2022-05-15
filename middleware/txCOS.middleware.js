// 引入模块  https://blog.csdn.net/weixin_43900193/article/details/107559234

const Multer = require("koa-multer");

const { MYCHAT_PATH } = require("../constants/file-path");
// 创建实例
const txCOSUpload = Multer({ dest: MYCHAT_PATH });

const txCOSHandle = txCOSUpload.single("avatar");


module.exports = { txCOSHandle };
