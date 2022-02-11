const fs = require("fs");
const COS = require("cos-nodejs-sdk-v5");
const dotenv = require("dotenv");

dotenv.config();

const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

const tengxun_cos = {
  Bucket: process.env.Bucket,
  Region: process.env.Region,
};

class txCOSController {
  async txCOSSave(ctx, next) {
    console.log("txCOSController.");
    // 文件类型
    const temp = ctx.req.file.originalname.split(".").pop();
    console.log(ctx.req.file);
    // 构建图片名
    const fileName = ctx.req.file.path + "." + temp;
    console.log("fileName:", fileName);
    // 文件路径
    const filePath = "./" + ctx.req.file.path;
    console.log("filePath:", filePath);
    //文件重命名 修改文件名称，可更改文件的存放路径。
    const resInfo = await new Promise((resolve, reject) => {
      fs.rename(filePath, fileName, async (err) => {
        if (err) {
          console.log("文件写入失败");
        } else {
          // let pathName = 'file-' + parseInt(1000000 * (Math.random() + 1)) + '/' + fileName // 随机文件夹名以避免同名文件覆盖
          const localFile = "./" + fileName;
          // 腾讯云 文件上传
          const params = {
            Bucket: tengxun_cos.Bucket,
            /* 必须 */
            Region: tengxun_cos.Region,
            /* 必须 */
            Key: fileName,
            /* 必须 */
            FilePath: localFile,
          };
          const resBodyDate = await new Promise((resolve, reject) => {
            cos.sliceUploadFile(params, async (err, data) => {
              if (err) {
                ctx.body = {
                  status: "0",
                  msg: "上传失败",
                  error: JSON.stringify(err),
                };
              } else {
                // https://cloud.ilikestudy.cn/myChat/f24224e07d10f766d7c6a44cd53a1bee.jpg
                const imageSrc = `https://cloud.ilikestudy.cn/${data.Key}`;
                var saveAvatarInfo = {
                  status: "1",
                  msg: "上传成功",
                  imageUrl: imageSrc,
                };
                console.log("上传成功");
                resolve(saveAvatarInfo);
                // next();
              }
            });
          });
          // ctx.info = resBodyDate;
          resolve(resBodyDate);
        }
      });
    });
    ctx.body = resInfo;
  }
}

module.exports = new txCOSController();
