const connection = require('../app/database');

class FriendService {
  async create(name, picUrl, content, fileType, Type) {
    const statement = `INSERT INTO friendCircle (name, picUrl, content, likes,fileType, Type) VALUES (?, ?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      name,
      picUrl,
      content,
      { person: [] },
      fileType,
      Type
    ]);
    return result;
  }

  async updateLike(position, name, id) {
    console.log(position, name, id);
    const statement = `UPDATE friendCircle SET likes = JSON_INSERT(likes, '$.person[${position}]', ?) WHERE id = ?;`;
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }

  async getFriendCircleListById(id) {
    const statement = `SELECT * FROM friendCircle WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getFriendCircleList() {
    console.log('getFriendCircleList');
    const statement = `SELECT *, friendCircle.id AS id, friendCircle.createAt AS createAt FROM friendCircle Left JOIN user ON user.name = friendCircle.name ORDER BY friendCircle.createAt DESC;`;

    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new FriendService();
